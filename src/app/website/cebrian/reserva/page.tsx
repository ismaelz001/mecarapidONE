'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CebrianReservaPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Placeholder: simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSuccess(true);
    setIsSubmitting(false);
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#0A0D0C' }}>
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: '#009AD6' }}>
            <svg className="w-10 h-10" style={{ color: '#0A0D0C' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="square" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold uppercase tracking-wider mb-4" style={{ color: '#009AD6' }}>
            ¡Reserva Enviada!
          </h1>
          <p className="mb-8" style={{ color: '#D7DBDD' }}>
            Hemos recibido tu solicitud. Te contactaremos pronto para confirmar la cita.
          </p>
          <Link 
            href="/website/cebrian"
            className="inline-block px-6 py-3 font-bold uppercase tracking-wide transition-colors"
            style={{ backgroundColor: '#009AD6', color: '#0A0D0C' }}
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A0D0C' }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: '#009AD6' }}>
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/website/cebrian" className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center" style={{ backgroundColor: '#009AD6' }}>
              <svg className="w-6 h-6" style={{ color: '#0A0D0C' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
              </svg>
            </div>
            <span className="font-bold tracking-wider" style={{ color: '#F5F7F6' }}>CEBRIAN</span>
          </Link>
          <Link 
            href="/website/cebrian" 
            className="text-sm uppercase tracking-wide transition-colors"
            style={{ color: '#D7DBDD' }}
          >
            ← Volver
          </Link>
        </div>
      </header>

      {/* Form */}
      <main className="py-8 px-4">
        <div className="max-w-xl mx-auto">
          <h1 className="text-3xl font-bold uppercase tracking-wider mb-2 text-center" style={{ color: '#009AD6' }}>
            Reservar Cita
          </h1>
          <p className="text-center mb-8" style={{ color: '#D7DBDD' }}>
            Completa el formulario y te contactaremos
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Client Info */}
            <div className="p-6 border" style={{ borderColor: '#009AD6', backgroundColor: 'rgba(0, 154, 214, 0.05)' }}>
              <h3 className="text-lg font-bold uppercase tracking-wider mb-4" style={{ color: '#009AD6' }}>
                Tus Datos
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium uppercase tracking-wide mb-2" style={{ color: '#D7DBDD' }}>
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="nombre_cliente"
                    required
                    placeholder="Tu nombre"
                    className="w-full px-4 py-3 border outline-none transition-colors"
                    style={{ 
                      backgroundColor: '#0A0D0C', 
                      borderColor: '#009AD6', 
                      color: '#F5F7F6' 
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium uppercase tracking-wide mb-2" style={{ color: '#D7DBDD' }}>
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    required
                    placeholder="+34 612 345 678"
                    className="w-full px-4 py-3 border outline-none transition-colors"
                    style={{ 
                      backgroundColor: '#0A0D0C', 
                      borderColor: '#009AD6', 
                      color: '#F5F7F6' 
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Vehicle Info */}
            <div className="p-6 border" style={{ borderColor: '#009AD6', backgroundColor: 'rgba(0, 154, 214, 0.05)' }}>
              <h3 className="text-lg font-bold uppercase tracking-wider mb-4" style={{ color: '#009AD6' }}>
                Datos del Vehículo
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium uppercase tracking-wide mb-2" style={{ color: '#D7DBDD' }}>
                    Marca *
                  </label>
                  <input
                    type="text"
                    name="marca"
                    required
                    placeholder="Volkswagen"
                    className="w-full px-4 py-3 border outline-none"
                    style={{ 
                      backgroundColor: '#0A0D0C', 
                      borderColor: '#009AD6', 
                      color: '#F5F7F6' 
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium uppercase tracking-wide mb-2" style={{ color: '#D7DBDD' }}>
                    Modelo *
                  </label>
                  <input
                    type="text"
                    name="modelo"
                    required
                    placeholder="Golf"
                    className="w-full px-4 py-3 border outline-none"
                    style={{ 
                      backgroundColor: '#0A0D0C', 
                      borderColor: '#009AD6', 
                      color: '#F5F7F6' 
                    }}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium uppercase tracking-wide mb-2" style={{ color: '#D7DBDD' }}>
                    Matrícula *
                  </label>
                  <input
                    type="text"
                    name="matricula"
                    required
                    placeholder="1234 ABC"
                    className="w-full px-4 py-3 border outline-none uppercase"
                    style={{ 
                      backgroundColor: '#0A0D0C', 
                      borderColor: '#009AD6', 
                      color: '#F5F7F6' 
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Problem Description */}
            <div className="p-6 border" style={{ borderColor: '#009AD6', backgroundColor: 'rgba(0, 154, 214, 0.05)' }}>
              <h3 className="text-lg font-bold uppercase tracking-wider mb-4" style={{ color: '#009AD6' }}>
                Problema
              </h3>
              <div>
                <label className="block text-sm font-medium uppercase tracking-wide mb-2" style={{ color: '#D7DBDD' }}>
                  Describe el problema *
                </label>
                <textarea
                  name="problema"
                  required
                  rows={4}
                  placeholder="Describe el problema o servicio que necesitas..."
                  className="w-full px-4 py-3 border outline-none resize-none"
                  style={{ 
                    backgroundColor: '#0A0D0C', 
                    borderColor: '#009AD6', 
                    color: '#F5F7F6' 
                  }}
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 font-bold uppercase tracking-wide text-lg transition-colors disabled:opacity-50"
              style={{ backgroundColor: '#009AD6', color: '#0A0D0C' }}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Reserva'}
            </button>

            <p className="text-xs text-center" style={{ color: '#D7DBDD', opacity: 0.5 }}>
              Al enviar, aceptas que te contactemos para confirmar la cita
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
