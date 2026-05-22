'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { createReserva } from '@/server/reservas';

// ── SVG icons ────────────────────────────────────────────
const IconPhone = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
);

const IconWhatsApp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const IconCheck = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export default function ReservaPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [whatsapp, setWhatsapp] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    const ownerPhone = formData.get('ownerPhone') as string;

    const data = {
      ownerName: formData.get('ownerName') as string,
      ownerPhone,
      ownerEmail: (formData.get('ownerEmail') as string) || undefined,
      marca: formData.get('marca') as string,
      modelo: formData.get('modelo') as string,
      matricula: formData.get('matricula') as string,
      año: formData.get('año') ? parseInt(formData.get('año') as string) : undefined,
      problema: formData.get('problema') as string,
      prioridad: formData.get('prioridad') as string,
      fechaSugerida: (formData.get('fechaSugerida') as string) || undefined,
      slug,
    };

    // Guardar teléfono para el botón WhatsApp en el estado éxito
    const cleaned = ownerPhone.replace(/\D/g, '');
    setWhatsapp(cleaned.startsWith('34') ? cleaned : `34${cleaned}`);

    try {
      const result = await createReserva(data);
      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.error || 'Error desconocido');
      }
    } catch {
      setError('Error al enviar la reserva. Inténtalo de nuevo o llámanos directamente.');
    } finally {
      setIsSubmitting(false);
    }
  }

  // ── ESTADO ÉXITO ──────────────────────────────────────
  if (success) {
    return (
      <div className="min-h-[100dvh] bg-site-bg flex flex-col items-center justify-center px-5 py-20">
        <div className="max-w-md w-full text-center">
          {/* icono */}
          <div className="w-16 h-16 bg-site-accent mx-auto mb-8 flex items-center justify-center text-white">
            <IconCheck />
          </div>
          <h1 className="font-bold text-site-text leading-tight mb-4"
              style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            Solicitud recibida.
          </h1>
          <p className="text-site-muted leading-relaxed mb-10">
            Nos pondremos en contacto contigo lo antes posible para confirmar la cita.
            Si lo necesitas urgente, escríbenos por WhatsApp.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href={`/website/${slug}`}
              className="inline-flex items-center justify-center bg-site-text text-site-bg font-semibold px-6 py-4 hover:bg-site-accent transition-colors"
            >
              Volver al inicio
            </Link>
            <a
              href={`https://wa.me/${whatsapp || '34612345678'}?text=Hola%2C+acabo+de+enviar+una+reserva+online+y+quiero+confirmarla`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-site-border text-site-text font-semibold px-6 py-4 hover:border-site-text hover:bg-site-surface transition-colors"
            >
              <IconWhatsApp />
              Confirmar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ── INPUT y LABEL helpers ─────────────────────────────
  const inputCls =
    'w-full bg-site-white border border-site-border text-site-text px-4 py-3 text-sm placeholder-site-border focus:outline-none focus:border-site-text transition-colors';
  const selectCls =
    'w-full bg-site-white border border-site-border text-site-text px-4 py-3 text-sm focus:outline-none focus:border-site-text transition-colors appearance-none cursor-pointer';
  const labelCls = 'block text-xs font-semibold text-site-muted uppercase tracking-widest mb-2';

  return (
    <div className="min-h-[100dvh] bg-site-bg text-site-text">

      {/* ── HEADER ────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-site-bg/95 backdrop-blur-sm border-b border-site-border">
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-4 flex items-center justify-between">
          <Link href={`/website/${slug}`} className="flex items-center gap-3">
            <div className="w-9 h-9 bg-site-accent flex items-center justify-center">
              <span className="text-white font-bold text-base leading-none">N</span>
            </div>
            <span className="font-bold text-site-text text-base tracking-tight">Talleres Nogueira</span>
          </Link>
          <Link
            href={`/website/${slug}`}
            className="text-xs text-site-muted hover:text-site-text transition-colors flex items-center gap-1"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            Volver
          </Link>
        </div>
      </header>

      {/* ── INTRO ─────────────────────────────────────────── */}
      <section className="py-14 md:py-20 border-b border-site-border">
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          <p className="text-xs font-semibold text-site-accent uppercase tracking-[0.18em] mb-4">Reserva de cita</p>
          <h1 className="font-bold text-site-text leading-tight mb-4"
              style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            Cuéntanos qué le pasa<br />a tu vehículo.
          </h1>
          <p className="text-site-muted leading-relaxed max-w-[50ch]">
            Rellena el formulario y te contactamos para confirmar fecha y hora.
            Sin compromiso — primero te damos el presupuesto.
          </p>
        </div>
      </section>

      {/* ── FORMULARIO ────────────────────────────────────── */}
      <main className="py-14 px-5 md:px-8">
        <div className="max-w-3xl mx-auto">

          {error && (
            <div className="border border-red-300 bg-red-50 text-red-700 px-5 py-4 text-sm mb-8">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-0">

            {/* ── BLOQUE 1: Tus datos ─────────────────────── */}
            <fieldset className="border-t border-site-border pt-10 pb-10">
              <legend className="text-xs font-semibold text-site-accent uppercase tracking-[0.18em] mb-8">
                01 — Tus datos
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="ownerName" className={labelCls}>Nombre <span className="text-site-accent">*</span></label>
                  <input id="ownerName" type="text" name="ownerName" required placeholder="Tu nombre completo" className={inputCls} />
                </div>
                <div>
                  <label htmlFor="ownerPhone" className={labelCls}>Teléfono <span className="text-site-accent">*</span></label>
                  <input id="ownerPhone" type="tel" name="ownerPhone" required placeholder="+34 612 345 678" className={inputCls} />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="ownerEmail" className={labelCls}>Email <span className="text-site-muted font-normal normal-case tracking-normal">(opcional)</span></label>
                  <input id="ownerEmail" type="email" name="ownerEmail" placeholder="tu@email.com" className={inputCls} />
                </div>
              </div>
            </fieldset>

            {/* ── BLOQUE 2: Vehículo ─────────────────────── */}
            <fieldset className="border-t border-site-border pt-10 pb-10">
              <legend className="text-xs font-semibold text-site-accent uppercase tracking-[0.18em] mb-8">
                02 — Tu vehículo
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="matricula" className={labelCls}>Matrícula <span className="text-site-accent">*</span></label>
                  <input id="matricula" type="text" name="matricula" required placeholder="1234 ABC" className={`${inputCls} uppercase`} />
                </div>
                <div>
                  <label htmlFor="año" className={labelCls}>Año <span className="text-site-muted font-normal normal-case tracking-normal">(opcional)</span></label>
                  <input id="año" type="number" name="año" min="1960" max="2100" placeholder="2020" className={inputCls} />
                </div>
                <div>
                  <label htmlFor="marca" className={labelCls}>Marca <span className="text-site-accent">*</span></label>
                  <input id="marca" type="text" name="marca" required placeholder="Volkswagen" className={inputCls} />
                </div>
                <div>
                  <label htmlFor="modelo" className={labelCls}>Modelo <span className="text-site-accent">*</span></label>
                  <input id="modelo" type="text" name="modelo" required placeholder="Golf" className={inputCls} />
                </div>
              </div>
            </fieldset>

            {/* ── BLOQUE 3: El problema ──────────────────── */}
            <fieldset className="border-t border-site-border pt-10 pb-10">
              <legend className="text-xs font-semibold text-site-accent uppercase tracking-[0.18em] mb-8">
                03 — El problema
              </legend>
              <div className="space-y-5">
                <div>
                  <label htmlFor="problema" className={labelCls}>¿Qué le pasa? <span className="text-site-accent">*</span></label>
                  <textarea
                    id="problema"
                    name="problema"
                    required
                    rows={4}
                    placeholder="Describe el problema o el servicio que necesitas con el máximo detalle posible…"
                    className={`${inputCls} resize-none`}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="prioridad" className={labelCls}>Urgencia <span className="text-site-accent">*</span></label>
                    <div className="relative">
                      <select id="prioridad" name="prioridad" required className={selectCls}>
                        <option value="normal">Normal — cuando haya hueco</option>
                        <option value="urgente">Urgente — lo antes posible</option>
                      </select>
                      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-site-muted">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="fechaSugerida" className={labelCls}>Fecha preferida <span className="text-site-muted font-normal normal-case tracking-normal">(opcional)</span></label>
                    <input
                      id="fechaSugerida"
                      type="date"
                      name="fechaSugerida"
                      className={inputCls}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>
              </div>
            </fieldset>

            {/* ── SUBMIT ────────────────────────────────── */}
            <div className="border-t border-site-border pt-10">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-site-text text-site-bg font-semibold py-5 text-base hover:bg-site-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando solicitud…' : 'Enviar solicitud de cita'}
              </button>
              <p className="text-xs text-site-muted text-center mt-4 leading-relaxed">
                Al enviar este formulario nos das permiso para contactarte por teléfono o WhatsApp
                para confirmar la cita. No compartimos tus datos con terceros.
              </p>

              {/* Alternativa directa */}
              <div className="mt-8 pt-8 border-t border-site-border flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:+34612345678"
                  className="flex-1 inline-flex items-center justify-center gap-2 border border-site-border text-site-text font-medium px-5 py-4 text-sm hover:border-site-text hover:bg-site-surface transition-colors"
                >
                  <IconPhone />
                  Llamar directamente
                </a>
                <a
                  href="https://wa.me/34612345678?text=Hola%2C+quiero+pedir+cita"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 border border-site-border text-site-text font-medium px-5 py-4 text-sm hover:border-site-text hover:bg-site-surface transition-colors"
                >
                  <IconWhatsApp />
                  WhatsApp
                </a>
              </div>
            </div>

          </form>
        </div>
      </main>

    </div>
  );
}
