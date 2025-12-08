'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { createReserva } from '@/server/reservas';

export default function ReservaPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    
    const data = {
      ownerName: formData.get('ownerName') as string,
      ownerPhone: formData.get('ownerPhone') as string,
      ownerEmail: formData.get('ownerEmail') as string || undefined,
      marca: formData.get('marca') as string,
      modelo: formData.get('modelo') as string,
      matricula: formData.get('matricula') as string,
      año: formData.get('año') ? parseInt(formData.get('año') as string) : undefined,
      problema: formData.get('problema') as string,
      prioridad: formData.get('prioridad') as string,
      fechaSugerida: formData.get('fechaSugerida') as string || undefined,
      slug,
    };

    try {
      const result = await createReserva(data);
      
      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.error || 'Error desconocido');
      }
    } catch (err) {
      setError('Error al enviar la reserva');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-mr-bg flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-mr-accent mx-auto mb-6 flex items-center justify-center">
            <svg className="w-10 h-10 text-mr-bg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="square" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-mr-accent uppercase tracking-wider mb-4">
            ¡Reserva Confirmada!
          </h1>
          <p className="text-mr-text/70 mb-8">
            Hemos recibido tu solicitud. Nos pondremos en contacto contigo lo antes posible para confirmar la cita.
          </p>
          <div className="flex flex-col gap-4">
            <Link href={`/website/${slug}`} className="btn-accent">
              Volver al Inicio
            </Link>
            <a 
              href={`https://wa.me/34612345678?text=Hola, acabo de hacer una reserva online y me gustaría confirmar`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center justify-center gap-2"
            >
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mr-bg">
      {/* Header */}
      <header className="border-b border-mr-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={`/website/${slug}`} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-mr-accent flex items-center justify-center">
              <span className="text-mr-bg font-bold text-xl">M</span>
            </div>
            <span className="text-lg font-bold text-mr-accent tracking-wider">MecaRapid</span>
          </Link>
          <Link href={`/website/${slug}`} className="text-mr-text/60 hover:text-mr-accent transition-colors text-sm uppercase">
            ← Volver
          </Link>
        </div>
      </header>

      {/* Form */}
      <main className="py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-mr-accent uppercase tracking-wider mb-2 text-center">
            Reservar Cita
          </h1>
          <p className="text-mr-text/60 text-center mb-8">
            Completa el formulario y te contactaremos para confirmar
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Info */}
            <div className="card-industrial">
              <h3 className="text-lg font-bold uppercase tracking-wider text-mr-accent mb-4">
                Tus Datos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-mr-text/60 uppercase tracking-wide mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="ownerName"
                    required
                    placeholder="Tu nombre"
                    className="input-industrial w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-mr-text/60 uppercase tracking-wide mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="ownerPhone"
                    required
                    placeholder="+34 612 345 678"
                    className="input-industrial w-full"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-mr-text/60 uppercase tracking-wide mb-2">
                    Email (opcional)
                  </label>
                  <input
                    type="email"
                    name="ownerEmail"
                    placeholder="tu@email.com"
                    className="input-industrial w-full"
                  />
                </div>
              </div>
            </div>

            {/* Vehicle Info */}
            <div className="card-industrial">
              <h3 className="text-lg font-bold uppercase tracking-wider text-mr-accent mb-4">
                Datos del Vehículo
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-mr-text/60 uppercase tracking-wide mb-2">
                    Matrícula *
                  </label>
                  <input
                    type="text"
                    name="matricula"
                    required
                    placeholder="1234 ABC"
                    className="input-industrial w-full uppercase"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-mr-text/60 uppercase tracking-wide mb-2">
                    Año
                  </label>
                  <input
                    type="number"
                    name="año"
                    min="1900"
                    max="2100"
                    placeholder="2020"
                    className="input-industrial w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-mr-text/60 uppercase tracking-wide mb-2">
                    Marca *
                  </label>
                  <input
                    type="text"
                    name="marca"
                    required
                    placeholder="Volkswagen"
                    className="input-industrial w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-mr-text/60 uppercase tracking-wide mb-2">
                    Modelo *
                  </label>
                  <input
                    type="text"
                    name="modelo"
                    required
                    placeholder="Golf"
                    className="input-industrial w-full"
                  />
                </div>
              </div>
            </div>

            {/* Problem Description */}
            <div className="card-industrial">
              <h3 className="text-lg font-bold uppercase tracking-wider text-mr-accent mb-4">
                Descripción del Problema
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-mr-text/60 uppercase tracking-wide mb-2">
                    ¿Qué problema tiene tu vehículo? *
                  </label>
                  <textarea
                    name="problema"
                    required
                    rows={4}
                    placeholder="Describe el problema o servicio que necesitas..."
                    className="input-industrial w-full resize-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-mr-text/60 uppercase tracking-wide mb-2">
                      Prioridad *
                    </label>
                    <select name="prioridad" required className="input-industrial w-full">
                      <option value="normal">Normal</option>
                      <option value="urgente">Urgente (+ coste)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-mr-text/60 uppercase tracking-wide mb-2">
                      Fecha sugerida
                    </label>
                    <input
                      type="date"
                      name="fechaSugerida"
                      className="input-industrial w-full"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-accent w-full py-4 text-lg disabled:opacity-50"
            >
              {isSubmitting ? 'Enviando...' : 'Confirmar Reserva'}
            </button>

            <p className="text-xs text-mr-text/40 text-center">
              Al enviar este formulario, aceptas que nos pongamos en contacto contigo para confirmar la cita.
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
