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
      <style>{`
        .cebrian-btn:hover { background-color: #037FB4 !important; }
        .cebrian-input:focus { border-color: #037FB4 !important; }
      `}</style>

      {/* Header */}
      <header className="border-b" style={{ borderColor: '#009AD6' }}>
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/website/cebrian" className="flex items-center gap-3">
            <div className="relative h-[40px] md:h-[60px] w-[150px] md:w-[200px]">
              <Image 
                src="/cebrian/logo.png" 
                alt="Cebrian Automoción" 
                fill
                className="object-contain object-left"
                priority
              />
            </div>
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

          {error && (
            <div className="mb-6 p-4 border" style={{ borderColor: '#ff4444', backgroundColor: 'rgba(255, 68, 68, 0.1)', color: '#ff4444' }}>
              {error}
            </div>
          )}

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
                    className="cebrian-input w-full px-4 py-3 border outline-none transition-colors"
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
                    className="cebrian-input w-full px-4 py-3 border outline-none transition-colors"
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
                    className="cebrian-input w-full px-4 py-3 border outline-none"
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
                    className="cebrian-input w-full px-4 py-3 border outline-none"
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
                    className="cebrian-input w-full px-4 py-3 border outline-none uppercase"
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
                  className="cebrian-input w-full px-4 py-3 border outline-none resize-none"
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
              className="cebrian-btn w-full py-4 font-bold uppercase tracking-wide text-lg transition-colors disabled:opacity-50"
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
