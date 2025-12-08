import Shell from '@/components/layout/Shell';
import WorkOrderList from '@/components/workorders/WorkOrderList';
import { getWorkOrders } from '@/server/workorders';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function WorkOrdersPage() {
  const workOrders = await getWorkOrders();

  return (
    <Shell>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-wider text-mr-text">
            Órdenes de Trabajo
          </h1>
          <p className="text-mr-text/60 mt-1">
            Gestión y seguimiento de órdenes del taller — {workOrders.length} orden(es)
          </p>
        </div>
        <Link href="/work-orders/new" className="btn-accent flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="square" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nueva Orden
        </Link>
      </div>

      {/* Stats Bar */}
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

      {/* Work Orders List */}
      <div className="card-industrial">
        <WorkOrderList workOrders={workOrders} />
      </div>
    </Shell>
  );
}
