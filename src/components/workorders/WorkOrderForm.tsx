'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createWorkOrder } from '@/server/workorders';

export default function WorkOrderForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    
    const data = {
      plate: formData.get('plate') as string,
      brand: formData.get('brand') as string,
      model: formData.get('model') as string,
      year: formData.get('year') ? parseInt(formData.get('year') as string) : undefined,
      km: formData.get('km') ? parseInt(formData.get('km') as string) : undefined,
      ownerName: formData.get('ownerName') as string,
      ownerPhone: formData.get('ownerPhone') as string,
      ownerEmail: formData.get('ownerEmail') as string || undefined,
      description: formData.get('description') as string,
      priority: formData.get('priority') as string,
    };

    try {
      const result = await createWorkOrder(data);
      
      if (result.success) {
        router.push('/work-orders');
        router.refresh();
      } else {
        setError(result.error || 'Error desconocido');
      }
    } catch (err) {
      setError('Error al crear la orden de trabajo');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3">
          {error}
        </div>
      )}

      {/* Vehicle Section */}
      <div className="card-industrial">
        <h3 className="text-lg font-bold uppercase tracking-wider text-mr-accent mb-4">
          Datos del Vehículo
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-mr-text/60 uppercase tracking-wide mb-2">
              Patente *
            </label>
            <input
              type="text"
              name="plate"
              required
              placeholder="ABC123"
              className="input-industrial w-full uppercase"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-mr-text/60 uppercase tracking-wide mb-2">
              Marca *
            </label>
            <input
              type="text"
              name="brand"
              required
              placeholder="Toyota"
              className="input-industrial w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-mr-text/60 uppercase tracking-wide mb-2">
              Modelo *
            </label>
            <input
              type="text"
              name="model"
              required
              placeholder="Hilux"
              className="input-industrial w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-mr-text/60 uppercase tracking-wide mb-2">
              Año
            </label>
            <input
              type="number"
              name="year"
              min="1900"
              max="2100"
              placeholder="2024"
              className="input-industrial w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-mr-text/60 uppercase tracking-wide mb-2">
              Kilometraje
            </label>
            <input
              type="number"
              name="km"
              min="0"
              placeholder="50000"
              className="input-industrial w-full"
            />
          </div>
        </div>
      </div>

      {/* Owner Section */}
      <div className="card-industrial">
        <h3 className="text-lg font-bold uppercase tracking-wider text-mr-accent mb-4">
          Datos del Propietario
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-mr-text/60 uppercase tracking-wide mb-2">
              Nombre *
            </label>
            <input
              type="text"
              name="ownerName"
              required
              placeholder="Juan Pérez"
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
              placeholder="+54 9 11 1234-5678"
              className="input-industrial w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-mr-text/60 uppercase tracking-wide mb-2">
              Email
            </label>
            <input
              type="email"
              name="ownerEmail"
              placeholder="cliente@email.com"
              className="input-industrial w-full"
            />
          </div>
        </div>
      </div>

      {/* Work Order Details */}
      <div className="card-industrial">
        <h3 className="text-lg font-bold uppercase tracking-wider text-mr-accent mb-4">
          Detalles de la Orden
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-mr-text/60 uppercase tracking-wide mb-2">
              Descripción del Trabajo *
            </label>
            <textarea
              name="description"
              required
              rows={4}
              placeholder="Describe el trabajo a realizar, síntomas reportados, observaciones..."
              className="input-industrial w-full resize-none"
            />
          </div>
          <div className="max-w-xs">
            <label className="block text-sm font-medium text-mr-text/60 uppercase tracking-wide mb-2">
              Prioridad *
            </label>
            <select name="priority" required className="input-industrial w-full">
              <option value="normal">Normal</option>
              <option value="urgente">Urgente</option>
            </select>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="btn-primary"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-accent disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Creando...' : 'Crear Orden de Trabajo'}
        </button>
      </div>
    </form>
  );
}
