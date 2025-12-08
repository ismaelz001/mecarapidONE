import Shell from '@/components/layout/Shell';

const stats = [
  { label: 'Órdenes Activas', value: '12', trend: '+3 hoy' },
  { label: 'Vehículos en Taller', value: '8', trend: '2 finalizados' },
  { label: 'Pendientes', value: '5', trend: '↑ Prioridad alta' },
  { label: 'Completadas (Mes)', value: '47', trend: '+15% vs anterior' },
];

const recentActivities = [
  { id: 1, action: 'Nueva orden creada', vehicle: 'Toyota Hilux 2022', time: 'Hace 15 min' },
  { id: 2, action: 'Diagnóstico completado', vehicle: 'Ford Ranger 2021', time: 'Hace 1 hora' },
  { id: 3, action: 'Repuestos solicitados', vehicle: 'Chevrolet S10 2023', time: 'Hace 2 horas' },
  { id: 4, action: 'Orden finalizada', vehicle: 'Nissan Frontier 2020', time: 'Hace 3 horas' },
];

export default function DashboardPage() {
  return (
    <Shell>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold uppercase tracking-wider text-mr-text">
          Panel de Control
        </h1>
        <p className="text-mr-text/60 mt-1">
          Resumen operativo del taller — {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="card-industrial group hover:border-mr-accent transition-colors duration-150"
          >
            <p className="text-sm uppercase tracking-wider text-mr-text/60 mb-2">
              {stat.label}
            </p>
            <p className="text-4xl font-bold text-mr-accent mb-1">
              {stat.value}
            </p>
            <p className="text-xs text-mr-secondary font-medium">
              {stat.trend}
            </p>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 card-industrial">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold uppercase tracking-wider">
              Actividad Reciente
            </h2>
            <button className="btn-primary text-sm">
              Ver Todo
            </button>
          </div>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between py-3 border-b border-mr-border last:border-0"
              >
                <div>
                  <p className="font-medium text-mr-text">
                    {activity.action}
                  </p>
                  <p className="text-sm text-mr-text/60">
                    {activity.vehicle}
                  </p>
                </div>
                <span className="text-xs text-mr-secondary uppercase tracking-wide">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card-industrial">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-4">
            Acciones Rápidas
          </h2>
          <div className="space-y-3">
            <button className="btn-accent w-full text-left flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nueva Orden de Trabajo
            </button>
            <button className="btn-primary w-full text-left flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeWidth={2} d="M8 17h.01M16 17h.01M3 11l2-6h14l2 6M5 17h14a2 2 0 002-2v-4H3v4a2 2 0 002 2z" />
              </svg>
              Registrar Vehículo
            </button>
            <button className="btn-primary w-full text-left flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Buscar Orden
            </button>
          </div>
        </div>
      </div>
    </Shell>
  );
}