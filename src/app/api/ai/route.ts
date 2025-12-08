import { NextRequest, NextResponse } from 'next/server';

interface AIRequest {
  message: string;
  context?: string;
}

interface AIResponse {
  answer: string;
  model: string;
  timestamp: string;
}

export async function POST(req: NextRequest): Promise<NextResponse<AIResponse>> {
  try {
    const body: AIRequest = await req.json();
    const { message, context } = body;

    // Placeholder AI response - integrate your AI service here
    const response: AIResponse = {
      answer: `Respuesta IA para: "${message}"${context ? ` (contexto: ${context})` : ''}`,
      model: 'placeholder-gpt',
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      {
        answer: 'Error procesando la solicitud',
        model: 'error',
        timestamp: new Date().toISOString(),
      },
      { status: 400 }
    );
  }
}
