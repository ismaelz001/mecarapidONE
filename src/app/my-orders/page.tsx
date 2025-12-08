import Shell from '@/components/layout/Shell';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/session';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function MyOrdersPage() {
  const user = await requireAuth();

  // Get work orders assigned to this mechanic
  const workOrders = await prisma.workOrder.findMany({
    where: {
      mechanicId: user.id,
    },
    include: {
      vehicle: {
        include: {
          owner: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const statusColors: Record<string, string> = {
    pendiente: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
    diagnostico: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
    reparando: 'bg-orange-500/20 text-orange-400 border-orange-500/50',
    finalizada: 'bg-mr-accent/20 text-mr-accent border-mr-accent/50',
  };

  function formatDate(date: Date) {
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  return (
    <Shell>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold uppercase tracking-wider text-mr-text">
          Mis Órdenes de Trabajo
        </h1>
        <p className="text-mr-text/60 mt-1">
          Órdenes asignadas a ti — {workOrders.length} orden(es)
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Pendientes', count: workOrders.filter(o => o.status === 'pendiente').length, color: 'text-yellow-400' },
          { label: 'Diagnóstico', count: workOrders.filter(o => o.status === 'diagnostico').length, color: 'text-blue-400' },
          { label: 'Reparando', count: workOrders.filter(o => o.status === 'reparando').length, color: 'text-orange-400' },
          { label: 'Finalizadas', count: workOrders.filter(o => o.status === 'finalizada').length, color: 'text-mr-accent' },
        ].map((stat, i) => (
          <div key={i} className="card-industrial text-center">
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.count}</p>
            <p className="text-sm uppercase tracking-wide text-mr-text/50">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Orders Grid */}
      {workOrders.length === 0 ? (
        <div className="card-industrial text-center py-12">
          <svg className="w-16 h-16 text-mr-border mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="square" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-lg font-medium uppercase tracking-wide text-mr-text/40">
            No tienes órdenes asignadas
          </p>
          <p className="text-sm text-mr-text/30 mt-2">
            Las órdenes asignadas aparecerán aquí
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workOrders.map((order) => (
            <Link
              key={order.id}
              href={`/work-orders/${order.id}`}
              className="card-industrial hover:border-mr-accent transition-colors group"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-xl font-bold text-mr-accent tracking-wider">
                  {order.vehicle.plate}
                </span>
                <span className={`px-2 py-1 text-xs uppercase tracking-wide border ${statusColors[order.status]}`}>
                  {order.status}
                </span>
              </div>
              <p className="font-medium text-mr-text mb-1">
                {order.vehicle.brand} {order.vehicle.model}
              </p>
              {order.vehicle.owner && (
                <p className="text-sm text-mr-text/60 mb-3">
                  {order.vehicle.owner.name}
                </p>
              )}
              <p className="text-sm text-mr-text/80 line-clamp-2 mb-3">
                {order.description}
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className={order.priority === 'urgente' ? 'text-red-400 font-bold uppercase' : 'text-mr-text/50 uppercase'}>
                  {order.priority}
                </span>
                <span className="text-mr-text/50">
                  {formatDate(order.createdAt)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </Shell>
  );
}
