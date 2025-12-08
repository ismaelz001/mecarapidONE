import Shell from '@/components/layout/Shell';
import { getWorkOrderById, updateWorkOrderStatus, deleteWorkOrder } from '@/server/workorders';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import WorkOrderStatusUpdater from './StatusUpdater';

interface PageProps {
  params: { id: string };
}

export default async function WorkOrderDetailPage({ params }: PageProps) {
  const workOrder = await getWorkOrderById(params.id);

  if (!workOrder) {
    notFound();
  }

  const { vehicle } = workOrder;
  const { owner } = vehicle;

  function formatDate(date: Date) {
    return new Date(date).toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return (
    <Shell>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <Link 
              href="/work-orders"
              className="text-mr-text/60 hover:text-mr-accent transition-colors"
            >
              ← Volver
            </Link>
          </div>
          <h1 className="text-3xl font-bold uppercase tracking-wider text-mr-text">
            Orden: <span className="text-mr-accent">{vehicle.plate}</span>
          </h1>
          <p className="text-mr-text/60 mt-1">
            Creada: {formatDate(workOrder.createdAt)}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`px-4 py-2 uppercase tracking-wide text-sm font-bold ${
            workOrder.priority === 'urgente' 
              ? 'bg-red-500/20 text-red-400 border border-red-500/50' 
              : 'bg-mr-primary/20 text-mr-text/80 border border-mr-border'
          }`}>
            {workOrder.priority}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="card-industrial">
            <h3 className="text-lg font-bold uppercase tracking-wider text-mr-accent mb-4">
              Descripción del Trabajo
            </h3>
            <p className="text-mr-text whitespace-pre-wrap">{workOrder.description}</p>
          </div>

          {/* Vehicle Info */}
          <div className="card-industrial">
            <h3 className="text-lg font-bold uppercase tracking-wider text-mr-accent mb-4">
              Datos del Vehículo
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-mr-text/50 uppercase tracking-wide">Patente</p>
                <p className="text-xl font-bold text-mr-text">{vehicle.plate}</p>
              </div>
              <div>
                <p className="text-sm text-mr-text/50 uppercase tracking-wide">Marca</p>
                <p className="text-lg font-medium">{vehicle.brand}</p>
              </div>
              <div>
                <p className="text-sm text-mr-text/50 uppercase tracking-wide">Modelo</p>
                <p className="text-lg font-medium">{vehicle.model}</p>
              </div>
              {vehicle.year && (
                <div>
                  <p className="text-sm text-mr-text/50 uppercase tracking-wide">Año</p>
                  <p className="text-lg font-medium">{vehicle.year}</p>
                </div>
              )}
              {vehicle.km && (
                <div>
                  <p className="text-sm text-mr-text/50 uppercase tracking-wide">Kilometraje</p>
                  <p className="text-lg font-medium">{vehicle.km.toLocaleString()} km</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <div className="card-industrial">
            <h3 className="text-lg font-bold uppercase tracking-wider text-mr-accent mb-4">
              Estado
            </h3>
            <WorkOrderStatusUpdater 
              workOrderId={workOrder.id} 
              currentStatus={workOrder.status} 
            />
          </div>

          {/* Owner Info */}
          {owner && (
            <div className="card-industrial">
              <h3 className="text-lg font-bold uppercase tracking-wider text-mr-accent mb-4">
                Propietario
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-mr-text/50 uppercase tracking-wide">Nombre</p>
                  <p className="font-medium">{owner.name}</p>
                </div>
                <div>
                  <p className="text-sm text-mr-text/50 uppercase tracking-wide">Teléfono</p>
                  <a href={`tel:${owner.phone}`} className="font-medium text-mr-accent hover:underline">
                    {owner.phone}
                  </a>
                </div>
                {owner.email && (
                  <div>
                    <p className="text-sm text-mr-text/50 uppercase tracking-wide">Email</p>
                    <a href={`mailto:${owner.email}`} className="font-medium text-mr-accent hover:underline">
                      {owner.email}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Timestamps */}
          <div className="card-industrial">
            <h3 className="text-lg font-bold uppercase tracking-wider text-mr-accent mb-4">
              Fechas
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-mr-text/50 uppercase tracking-wide">Creación</p>
                <p>{formatDate(workOrder.createdAt)}</p>
              </div>
              <div>
                <p className="text-mr-text/50 uppercase tracking-wide">Última Actualización</p>
                <p>{formatDate(workOrder.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}
