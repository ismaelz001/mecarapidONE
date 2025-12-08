import Shell from '@/components/layout/Shell';

export default function OwnersPage() {
  return (
    <Shell>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-wider text-mr-text">
            Propietarios
          </h1>
          <p className="text-mr-text/60 mt-1">
            Gestión de clientes y propietarios de vehículos
          </p>
        </div>
        <button className="btn-accent flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="square" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nuevo Propietario
        </button>
      </div>

      {/* Filters */}
      <div className="card-industrial mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <input
            type="text"
            placeholder="Buscar por nombre, documento o teléfono..."
            className="input-industrial flex-1 min-w-[250px]"
          />
          <button className="btn-primary">
            Buscar
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="card-industrial overflow-x-auto">
        <table className="table-industrial">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Documento</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Vehículos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} className="text-center py-12 text-mr-text/40">
                <div className="flex flex-col items-center gap-3">
                  <svg className="w-16 h-16 text-mr-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <p className="text-lg font-medium uppercase tracking-wide">
                    Sin propietarios registrados
                  </p>
                  <p className="text-sm">
                    Registra tu primer propietario para comenzar
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Shell>
  );
}
