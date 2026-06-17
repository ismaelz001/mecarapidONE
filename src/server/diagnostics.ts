'use server';

import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/session';
import { revalidatePath } from 'next/cache';

export interface DiagnosticSuggestion {
  summary: string;
  likelyCauses: Array<{
    cause: string;
    probability: 'alta' | 'media' | 'baja';
    reason: string;
  }>;
  verificationSteps: Array<{
    step: string;
    objective: string;
    expectedResult: string;
    nextIfFails: string;
  }>;
  missingData: string[];
  externalLookups: Array<{
    source: 'Google' | 'YouTube' | 'Autodata' | 'ALLDATA' | 'HaynesPro' | 'Identifix' | 'iATN' | 'Diagnostic Network';
    query: string;
    purpose: string;
  }>;
  safetyWarnings: string[];
  customerExplanation: string;
}

export interface DiagnosticCaseView {
  id: string;
  query: string;
  symptoms: string | null;
  dtcCodes: string | null;
  testsDone: string | null;
  response: DiagnosticSuggestion;
  model: string;
  createdAt: string;
  createdByName: string | null;
}

interface GenerateDiagnosticInput {
  workOrderId: string;
  query: string;
  symptoms?: string;
  dtcCodes?: string;
  testsDone?: string;
}

const diagnosticSchema = {
  type: 'object',
  additionalProperties: false,
  required: [
    'summary',
    'likelyCauses',
    'verificationSteps',
    'missingData',
    'externalLookups',
    'safetyWarnings',
    'customerExplanation',
  ],
  properties: {
    summary: { type: 'string' },
    likelyCauses: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['cause', 'probability', 'reason'],
        properties: {
          cause: { type: 'string' },
          probability: { type: 'string', enum: ['alta', 'media', 'baja'] },
          reason: { type: 'string' },
        },
      },
    },
    verificationSteps: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['step', 'objective', 'expectedResult', 'nextIfFails'],
        properties: {
          step: { type: 'string' },
          objective: { type: 'string' },
          expectedResult: { type: 'string' },
          nextIfFails: { type: 'string' },
        },
      },
    },
    missingData: {
      type: 'array',
      items: { type: 'string' },
    },
    externalLookups: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['source', 'query', 'purpose'],
        properties: {
          source: {
            type: 'string',
            enum: ['Google', 'YouTube', 'Autodata', 'ALLDATA', 'HaynesPro', 'Identifix', 'iATN', 'Diagnostic Network'],
          },
          query: { type: 'string' },
          purpose: { type: 'string' },
        },
      },
    },
    safetyWarnings: {
      type: 'array',
      items: { type: 'string' },
    },
    customerExplanation: { type: 'string' },
  },
};

function getWorkshopFilter(workshopId?: string | null) {
  return workshopId ? { workshopId } : {};
}

function extractResponseText(data: any) {
  if (typeof data.output_text === 'string') {
    return data.output_text;
  }

  const textParts = data.output
    ?.flatMap((item: any) => item.content ?? [])
    ?.filter((content: any) => content.type === 'output_text' && typeof content.text === 'string')
    ?.map((content: any) => content.text);

  return textParts?.join('\n') || '';
}

function mapDiagnosticCase(item: any): DiagnosticCaseView {
  return {
    id: item.id,
    query: item.query,
    symptoms: item.symptoms,
    dtcCodes: item.dtcCodes,
    testsDone: item.testsDone,
    response: item.response as DiagnosticSuggestion,
    model: item.model,
    createdAt: item.createdAt.toISOString(),
    createdByName: item.createdBy?.name ?? item.createdBy?.email ?? null,
  };
}

export async function getDiagnosticCases(workOrderId: string): Promise<DiagnosticCaseView[]> {
  try {
    const user = await getCurrentUser();
    const workshopId = user?.workshopId ?? null;

    const workOrder = await prisma.workOrder.findFirst({
      where: {
        id: workOrderId,
        ...getWorkshopFilter(workshopId),
      },
      select: { id: true },
    });

    if (!workOrder) {
      return [];
    }

    const cases = await prisma.diagnosticCase.findMany({
      where: {
        workOrderId,
        ...getWorkshopFilter(workshopId),
      },
      include: {
        createdBy: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return cases.map(mapDiagnosticCase);
  } catch (error) {
    console.error('Error fetching diagnostic cases:', error);
    return [];
  }
}

export async function generateDiagnosticCase(
  input: GenerateDiagnosticInput
): Promise<{ success: boolean; error?: string; case?: DiagnosticCaseView }> {
  try {
    const user = await getCurrentUser();
    const workshopId = user?.workshopId ?? null;

    if (!input.query.trim()) {
      return { success: false, error: 'Describe que necesitas diagnosticar.' };
    }

    const workOrder = await prisma.workOrder.findFirst({
      where: {
        id: input.workOrderId,
        ...getWorkshopFilter(workshopId),
      },
      include: {
        vehicle: {
          include: {
            owner: true,
          },
        },
      },
    });

    if (!workOrder) {
      return { success: false, error: 'Orden no encontrada para este taller.' };
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return { success: false, error: 'Falta configurar OPENAI_API_KEY en el entorno.' };
    }

    const model = process.env.OPENAI_DIAGNOSTIC_MODEL || 'gpt-5.4-mini';
    const vehicle = workOrder.vehicle;

    const prompt = [
      `Vehiculo: ${vehicle.brand} ${vehicle.model}${vehicle.year ? ` ${vehicle.year}` : ''}`,
      `Matricula: ${vehicle.plate}`,
      vehicle.km ? `Kilometraje: ${vehicle.km} km` : null,
      `Orden actual: ${workOrder.description}`,
      `Prioridad: ${workOrder.priority}`,
      input.dtcCodes?.trim() ? `Codigos DTC: ${input.dtcCodes.trim()}` : null,
      input.symptoms?.trim() ? `Sintomas observados: ${input.symptoms.trim()}` : null,
      input.testsDone?.trim() ? `Pruebas ya realizadas: ${input.testsDone.trim()}` : null,
      `Consulta del mecanico: ${input.query.trim()}`,
    ]
      .filter(Boolean)
      .join('\n');

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        input: [
          {
            role: 'system',
            content:
              'Eres un asistente tecnico para un taller mecanico profesional en Espana. Devuelve una guia de diagnosis prudente, verificable y orientada a pruebas. No inventes datos OEM exactos, pares de apriete ni procedimientos de seguridad si no estan en el contexto. Presenta hipotesis, no certezas. Prioriza seguridad, mediciones, comprobaciones simples antes de sustituciones y deriva a fuente OEM cuando haga falta.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        text: {
          format: {
            type: 'json_schema',
            name: 'diagnostic_suggestion',
            strict: true,
            schema: diagnosticSchema,
          },
        },
        max_output_tokens: 2400,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('OpenAI diagnostic error:', data);
      return { success: false, error: 'Error al generar el diagnostico con IA.' };
    }

    const outputText = extractResponseText(data);
    const parsed = JSON.parse(outputText) as DiagnosticSuggestion;

    const created = await prisma.diagnosticCase.create({
      data: {
        workshopId: workOrder.workshopId,
        workOrderId: workOrder.id,
        createdById: user?.id ?? null,
        query: input.query.trim(),
        symptoms: input.symptoms?.trim() || null,
        dtcCodes: input.dtcCodes?.trim() || null,
        testsDone: input.testsDone?.trim() || null,
        response: parsed as any,
        model,
      },
      include: {
        createdBy: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    revalidatePath(`/work-orders/${workOrder.id}`);

    return { success: true, case: mapDiagnosticCase(created) };
  } catch (error) {
    console.error('Error generating diagnostic case:', error);
    return { success: false, error: 'Error inesperado generando la guia de diagnostico.' };
  }
}
