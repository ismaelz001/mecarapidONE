'use client';

import { useMemo, useState } from 'react';
import {
  DiagnosticCaseView,
  DiagnosticSuggestion,
  generateDiagnosticCase,
} from '@/server/diagnostics';

interface DiagnosticAssistantProps {
  workOrderId: string;
  initialCases: DiagnosticCaseView[];
}

const sourceLabels: Record<string, string> = {
  Google: 'Google',
  YouTube: 'YouTube',
  Autodata: 'Autodata',
  ALLDATA: 'ALLDATA',
  HaynesPro: 'HaynesPro',
  Identifix: 'Identifix',
  iATN: 'iATN',
  'Diagnostic Network': 'Diagnostic Network',
};

function buildLookupUrl(source: string, query: string) {
  const encoded = encodeURIComponent(query);

  if (source === 'YouTube') {
    return `https://www.youtube.com/results?search_query=${encoded}`;
  }

  if (source === 'iATN') {
    return `https://www.google.com/search?q=${encodeURIComponent(`site:iatn.net ${query}`)}`;
  }

  if (source === 'Diagnostic Network') {
    return `https://www.google.com/search?q=${encodeURIComponent(`site:diag.net ${query}`)}`;
  }

  if (['Autodata', 'ALLDATA', 'HaynesPro', 'Identifix'].includes(source)) {
    return `https://www.google.com/search?q=${encodeURIComponent(`${source} ${query}`)}`;
  }

  return `https://www.google.com/search?q=${encoded}`;
}

function formatDate(value: string) {
  return new Date(value).toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function ProbabilityBadge({ value }: { value: string }) {
  const className =
    value === 'alta'
      ? 'border-red-500/50 bg-red-500/15 text-red-300'
      : value === 'media'
        ? 'border-yellow-500/50 bg-yellow-500/15 text-yellow-300'
        : 'border-mr-border bg-mr-bg text-mr-text/70';

  return (
    <span className={`border px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${className}`}>
      {value}
    </span>
  );
}

function DiagnosticResult({ result }: { result: DiagnosticSuggestion }) {
  return (
    <div className="space-y-5">
      <div className="border border-mr-border bg-mr-bg/60 p-4">
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-mr-accent">Resumen tecnico</p>
        <p className="text-sm leading-6 text-mr-text/85">{result.summary}</p>
      </div>

      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-mr-accent">Causas probables</p>
        <div className="space-y-3">
          {result.likelyCauses.map((item, index) => (
            <div key={`${item.cause}-${index}`} className="border border-mr-border p-4">
              <div className="mb-2 flex items-start justify-between gap-3">
                <h4 className="font-bold text-mr-text">{item.cause}</h4>
                <ProbabilityBadge value={item.probability} />
              </div>
              <p className="text-sm leading-6 text-mr-text/70">{item.reason}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-mr-accent">Guia de verificacion</p>
        <div className="space-y-3">
          {result.verificationSteps.map((item, index) => (
            <div key={`${item.step}-${index}`} className="grid gap-3 border border-mr-border p-4 md:grid-cols-[3rem_1fr]">
              <div className="text-2xl font-black text-mr-accent">{String(index + 1).padStart(2, '0')}</div>
              <div className="space-y-2">
                <h4 className="font-bold text-mr-text">{item.step}</h4>
                <p className="text-sm text-mr-text/70"><span className="text-mr-text">Objetivo:</span> {item.objective}</p>
                <p className="text-sm text-mr-text/70"><span className="text-mr-text">Resultado esperado:</span> {item.expectedResult}</p>
                <p className="text-sm text-mr-text/70"><span className="text-mr-text">Si falla:</span> {item.nextIfFails}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {result.missingData.length > 0 && (
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-mr-accent">Datos que faltan</p>
          <ul className="space-y-2">
            {result.missingData.map((item) => (
              <li key={item} className="border-l-2 border-mr-accent bg-mr-bg/60 px-4 py-2 text-sm text-mr-text/75">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {result.externalLookups.length > 0 && (
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-mr-accent">Busquedas sugeridas</p>
          <div className="grid gap-3 md:grid-cols-2">
            {result.externalLookups.map((item, index) => (
              <a
                key={`${item.source}-${item.query}-${index}`}
                href={buildLookupUrl(item.source, item.query)}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-mr-border p-4 transition-colors hover:border-mr-accent"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-mr-accent">
                  {sourceLabels[item.source] ?? item.source}
                </span>
                <span className="mt-2 block text-sm font-bold text-mr-text">{item.query}</span>
                <span className="mt-2 block text-xs leading-5 text-mr-text/60">{item.purpose}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {result.safetyWarnings.length > 0 && (
        <div className="border border-yellow-500/40 bg-yellow-500/10 p-4">
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-yellow-300">Avisos de seguridad</p>
          <ul className="space-y-2 text-sm leading-6 text-yellow-100/85">
            {result.safetyWarnings.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="border border-mr-border bg-mr-primary/10 p-4">
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-mr-accent">Explicacion para cliente</p>
        <p className="text-sm leading-6 text-mr-text/80">{result.customerExplanation}</p>
      </div>
    </div>
  );
}

export default function DiagnosticAssistant({ workOrderId, initialCases }: DiagnosticAssistantProps) {
  const [activeTab, setActiveTab] = useState<'new' | 'history'>('new');
  const [cases, setCases] = useState(initialCases);
  const [selectedCaseId, setSelectedCaseId] = useState(initialCases[0]?.id ?? null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedCase = useMemo(
    () => cases.find((item) => item.id === selectedCaseId) ?? cases[0] ?? null,
    [cases, selectedCaseId]
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await generateDiagnosticCase({
      workOrderId,
      query: String(formData.get('query') || ''),
      symptoms: String(formData.get('symptoms') || ''),
      dtcCodes: String(formData.get('dtcCodes') || ''),
      testsDone: String(formData.get('testsDone') || ''),
    });

    if (result.success && result.case) {
      setCases((current) => [result.case!, ...current]);
      setSelectedCaseId(result.case.id);
      setActiveTab('history');
      event.currentTarget.reset();
    } else {
      setError(result.error || 'No se pudo generar la guia.');
    }

    setIsSubmitting(false);
  }

  const inputClass =
    'w-full border border-mr-border bg-mr-bg px-3 py-2 text-sm text-mr-text placeholder-mr-text/35 focus:border-mr-accent focus:outline-none';
  const labelClass = 'mb-2 block text-xs font-bold uppercase tracking-wider text-mr-text/55';

  return (
    <div className="card-industrial">
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h3 className="text-lg font-bold uppercase tracking-wider text-mr-accent">
            Diagnostico asistido
          </h3>
          <p className="mt-1 text-sm leading-6 text-mr-text/60">
            Genera una guia de comprobaciones y guarda el caso como conocimiento del taller.
          </p>
        </div>
        <div className="flex border border-mr-border">
          <button
            type="button"
            onClick={() => setActiveTab('new')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wide ${activeTab === 'new' ? 'bg-mr-accent text-mr-bg' : 'text-mr-text/60 hover:text-mr-text'}`}
          >
            Nueva guia
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wide ${activeTab === 'history' ? 'bg-mr-accent text-mr-bg' : 'text-mr-text/60 hover:text-mr-text'}`}
          >
            Casos ({cases.length})
          </button>
        </div>
      </div>

      {activeTab === 'new' ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="query" className={labelClass}>Que necesitas diagnosticar?</label>
            <textarea
              id="query"
              name="query"
              required
              rows={3}
              className={inputClass}
              placeholder="Ej: P0299 con falta de potencia, quiero una guia para descartar turbo, manguitos y electrovalvula."
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="dtcCodes" className={labelClass}>Codigos DTC</label>
              <input id="dtcCodes" name="dtcCodes" className={inputClass} placeholder="P0299, P0101..." />
            </div>
            <div>
              <label htmlFor="symptoms" className={labelClass}>Sintomas</label>
              <input id="symptoms" name="symptoms" className={inputClass} placeholder="Ruido, humo, tirones, no arranca..." />
            </div>
          </div>

          <div>
            <label htmlFor="testsDone" className={labelClass}>Pruebas ya realizadas</label>
            <textarea
              id="testsDone"
              name="testsDone"
              rows={3}
              className={inputClass}
              placeholder="Lectura diagnosis, prueba carretera, presion medida, piezas sustituidas..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-accent w-full py-3 uppercase tracking-wide disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
          >
            {isSubmitting ? 'Generando guia...' : 'Generar guia de diagnostico'}
          </button>
        </form>
      ) : (
        <div className="grid gap-5 xl:grid-cols-[18rem_1fr]">
          <div className="space-y-2">
            {cases.length === 0 ? (
              <div className="border border-mr-border p-4 text-sm text-mr-text/60">
                Todavia no hay casos guardados para esta orden.
              </div>
            ) : (
              cases.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedCaseId(item.id)}
                  className={`w-full border p-3 text-left transition-colors ${selectedCase?.id === item.id ? 'border-mr-accent bg-mr-primary/20' : 'border-mr-border hover:border-mr-secondary'}`}
                >
                  <span className="block text-xs font-bold uppercase tracking-wider text-mr-accent">
                    {formatDate(item.createdAt)}
                  </span>
                  <span className="mt-2 line-clamp-3 block text-sm font-semibold leading-5 text-mr-text">
                    {item.query}
                  </span>
                  <span className="mt-2 block text-xs text-mr-text/45">{item.model}</span>
                </button>
              ))
            )}
          </div>

          {selectedCase && (
            <div>
              <div className="mb-4 border border-mr-border bg-mr-bg/50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-mr-text/45">Consulta original</p>
                <p className="mt-2 text-sm leading-6 text-mr-text">{selectedCase.query}</p>
                {selectedCase.createdByName && (
                  <p className="mt-2 text-xs text-mr-text/45">Creado por {selectedCase.createdByName}</p>
                )}
              </div>
              <DiagnosticResult result={selectedCase.response} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
