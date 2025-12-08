'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { WorkOrderWithRelations, updateWorkOrderStatus } from '@/server/workorders';

interface WorkOrderListProps {
  workOrders: WorkOrderWithRelations[];
}

const statusLabels: Record<string, string> = {
  pendiente: 'Pendiente',
  diagnostico: 'Diagnóstico',
  reparando: 'Reparando',
  finalizada: 'Finalizada',
};

const statusColors: Record<string, string> = {
  pendiente: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
  diagnostico: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
  reparando: 'bg-orange-500/20 text-orange-400 border-orange-500/50',
  finalizada: 'bg-mr-accent/20 text-mr-accent border-mr-accent/50',
};

const priorityColors: Record<string, string> = {
  normal: 'text-mr-text/60',
  urgente: 'text-red-400 font-bold',
};

export default function WorkOrderList({ workOrders }: WorkOrderListProps) {
  const router = useRouter();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function handleStatusChange(id: string, newStatus: string) {
    setUpdatingId(id);
    try {
      await updateWorkOrderStatus(id, newStatus);
      router.refresh();
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setUpdatingId(null);
    }
  }

  function formatDate(date: Date) {
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  if (workOrders.length === 0) {
    return (
      <div className="card-industrial text-center py-12">
        <svg className="w-16 h-16 text-mr-border mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="square" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p className="text-lg font-medium uppercase tracking-wide text-mr-text/40">
          Sin órdenes registradas
        </p>
        <p className="text-sm text-mr-text/30 mt-2">
          Crea tu primera orden de trabajo para comenzar
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="table-industrial">
        <thead>
          <tr>
            <th>Patente</th>
            <th>Vehículo</th>
            <th>Propietario</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Prioridad</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {workOrders.map((order) => (
            <tr key={order.id}>
              <td>
                <span className="font-bold text-mr-accent tracking-wider">
                  {order.vehicle.plate}
                </span>
              </td>
              <td>
                <div>
                  <p className="font-medium">{order.vehicle.brand} {order.vehicle.model}</p>
                  {order.vehicle.year && (
                    <p className="text-sm text-mr-text/50">{order.vehicle.year}</p>
                  )}
                </div>
              </td>
              <td>
                {order.vehicle.owner ? (
                  <div>
                    <p className="font-medium">{order.vehicle.owner.name}</p>
                    <p className="text-sm text-mr-text/50">{order.vehicle.owner.phone}</p>
                  </div>
                ) : (
                  <span className="text-mr-text/30">Sin propietario</span>
                )}
              </td>
              <td>
                <p className="max-w-xs truncate" title={order.description}>
                  {order.description}
                </p>
              </td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  disabled={updatingId === order.id}
                  className={`px-3 py-1 border text-sm uppercase tracking-wide cursor-pointer ${statusColors[order.status] || ''} bg-transparent disabled:opacity-50`}
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="diagnostico">Diagnóstico</option>
                  <option value="reparando">Reparando</option>
                  <option value="finalizada">Finalizada</option>
                </select>
              </td>
              <td>
                <span className={`uppercase text-sm tracking-wide ${priorityColors[order.priority] || ''}`}>
                  {order.priority}
                </span>
              </td>
              <td>
                <span className="text-sm text-mr-text/60">
                  {formatDate(order.createdAt)}
                </span>
              </td>
              <td>
                <button
                  onClick={() => router.push(`/work-orders/${order.id}`)}
                  className="text-mr-accent hover:text-mr-secondary transition-colors uppercase text-sm font-medium"
                >
                  Ver
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
