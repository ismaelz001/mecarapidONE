'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createReserva } from '@/server/reservas';

export default function CebrianReservaPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    
    const data = {
      ownerName: formData.get('nombre_cliente') as string,
      ownerPhone: formData.get('telefono') as string,
      ownerEmail: undefined,
      marca: formData.get('marca') as string,
      modelo: formData.get('modelo') as string,
      matricula: formData.get('matricula') as string,
      año: undefined,
      problema: formData.get('problema') as string,
      prioridad: 'normal',
      fechaSugerida: undefined,
      slug: 'cebrian',
    };

    try {
      const result = await createReserva(data);
      
      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.error || 'Error al enviar la reserva');
      }
    } catch (err) {
      setError('Error al enviar la reserva. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center p-4" style={{ backgroundColor: '#0A0D0C' }}>
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 mx-auto mb-8 flex items-center justify-center" style={{ backgroundColor: '#009AD6' }}>
            <svg className="w-10 h-10" style={{ color: '#0A0D0C' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="square" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-bold uppercase tracking-wider mb-4" style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', color: '#F2F0EB' }}>
            Reserva enviada
          </h1>
          <p className="mb-10 leading-relaxed" style={{ color: '#555' }}>
            Hemos recibido tu solicitud. Te contactamos en menos de 24h para confirmar la cita.
          </p>
          <Link
            href="/website/cebrian"
            className="inline-flex items-center justify-center font-bold px-8 py-4 uppercase tracking-[0.1em]"
            style={{ backgroundColor: '#009AD6', color: '#0A0D0C' }}
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#0A0D0C', color: '#F2F0EB' }} className="min-h-[100dvh] antialiased">
      <style>{`
        .cb-input:focus { outline: none; border-color: #009AD6 !important; }
      `}</style>

      {/* HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur-sm border-b" style={{ backgroundColor: 'rgba(10,13,12,0.95)', borderColor: '#1A1F1E' }}>
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-4 flex items-center justify-between">
          <Link href="/website/cebrian" className="relative h-[36px] w-[160px] flex-shrink-0">
            <Image src="/cebrian/logo.png" alt="Cebrian Automoción" fill className="object-contain object-left" priority />
          </Link>
          <Link href="/website/cebrian" className="text-xs uppercase tracking-[0.12em]" style={{ color: '#444' }}>
            ← Volver
          </Link>
        </div>
      </header>

      {/* FORM */}
      <main className="py-16 px-5 md:px-10">
        <div className="max-w-2xl mx-auto">

          <div className="mb-12">
            <p className="text-xs uppercase tracking-[0.18em] font-semibold mb-4" style={{ color: '#009AD6' }}>Reserva</p>
            <h1 className="font-bold leading-[0.9] tracking-tight mb-4" style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', color: '#F2F0EB' }}>
              Pide tu cita.
            </h1>
            <p style={{ color: '#555' }}>Te llamamos en 24h para confirmar.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 border text-sm" style={{ borderColor: '#cc3333', backgroundColor: 'rgba(204,51,51,0.08)', color: '#ff6666' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-2">

            {/* 01 TUS DATOS */}
            <fieldset className="border p-8" style={{ borderColor: '#1A1F1E' }}>
              <p className="text-xs uppercase tracking-[0.18em] font-semibold mb-6" style={{ color: '#009AD6' }}>01 — Tus datos</p>
              <div className="space-y-5">
                <div>
                  <label className="block text-xs uppercase tracking-[0.12em] mb-2" style={{ color: '#444' }}>Nombre *</label>
                  <input type="text" name="nombre_cliente" required placeholder="Tu nombre"
                    className="cb-input w-full px-4 py-3 border bg-transparent text-sm"
                    style={{ borderColor: '#1A1F1E', color: '#F2F0EB' }} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.12em] mb-2" style={{ color: '#444' }}>Teléfono *</label>
                  <input type="tel" name="telefono" required placeholder="+34 612 345 678"
                    className="cb-input w-full px-4 py-3 border bg-transparent text-sm"
                    style={{ borderColor: '#1A1F1E', color: '#F2F0EB' }} />
                </div>
              </div>
            </fieldset>

            {/* 02 TU VEHÍCULO */}
            <fieldset className="border p-8" style={{ borderColor: '#1A1F1E' }}>
              <p className="text-xs uppercase tracking-[0.18em] font-semibold mb-6" style={{ color: '#009AD6' }}>02 — Tu vehículo</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-[0.12em] mb-2" style={{ color: '#444' }}>Marca *</label>
                  <input type="text" name="marca" required placeholder="Volkswagen"
                    className="cb-input w-full px-4 py-3 border bg-transparent text-sm"
                    style={{ borderColor: '#1A1F1E', color: '#F2F0EB' }} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.12em] mb-2" style={{ color: '#444' }}>Modelo *</label>
                  <input type="text" name="modelo" required placeholder="Golf"
                    className="cb-input w-full px-4 py-3 border bg-transparent text-sm"
                    style={{ borderColor: '#1A1F1E', color: '#F2F0EB' }} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-[0.12em] mb-2" style={{ color: '#444' }}>Matrícula *</label>
                  <input type="text" name="matricula" required placeholder="1234 ABC"
                    className="cb-input w-full px-4 py-3 border bg-transparent text-sm uppercase"
                    style={{ borderColor: '#1A1F1E', color: '#F2F0EB' }} />
                </div>
              </div>
            </fieldset>

            {/* 03 EL PROBLEMA */}
            <fieldset className="border p-8" style={{ borderColor: '#1A1F1E' }}>
              <p className="text-xs uppercase tracking-[0.18em] font-semibold mb-6" style={{ color: '#009AD6' }}>03 — El problema</p>
              <div>
                <label className="block text-xs uppercase tracking-[0.12em] mb-2" style={{ color: '#444' }}>Describe qué pasa *</label>
                <textarea name="problema" required rows={4} placeholder="Cuéntanos qué le pasa al coche..."
                  className="cb-input w-full px-4 py-3 border bg-transparent text-sm resize-none"
                  style={{ borderColor: '#1A1F1E', color: '#F2F0EB' }} />
              </div>
            </fieldset>

            <button type="submit" disabled={isSubmitting}
              className="w-full py-5 font-bold uppercase tracking-[0.12em] text-base transition-opacity disabled:opacity-50"
              style={{ backgroundColor: '#009AD6', color: '#0A0D0C' }}>
              {isSubmitting ? 'Enviando...' : 'Solicitar cita'}
            </button>

            <p className="text-xs text-center pt-2" style={{ color: '#2A2F2E' }}>
              Confirmamos por teléfono en menos de 24h
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
