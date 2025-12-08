import Shell from '@/components/layout/Shell';

export default function VehiclesPage() {
  return (
    <Shell>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-wider text-mr-text">
            Vehículos
          </h1>
          <p className="text-mr-text/60 mt-1">
            Registro y control de vehículos del taller
          </p>
        </div>
        <button className="btn-accent flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="square" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nuevo Vehículo
        </button>
      </div>

      {/* Filters */}
      <div className="card-industrial mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <input
            type="text"
            placeholder="Buscar por patente, marca o modelo..."
            className="input-industrial flex-1 min-w-[250px]"
          />
          <select className="input-industrial">
            <option value="">Todas las marcas</option>
            <option value="toyota">Toyota</option>
            <option value="ford">Ford</option>
            <option value="chevrolet">Chevrolet</option>
            <option value="nissan">Nissan</option>
          </select>
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
              <th>Patente</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Año</th>
              <th>Propietario</th>
              <th>Última Visita</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={7} className="text-center py-12 text-mr-text/40">
                <div className="flex flex-col items-center gap-3">
                  <svg className="w-16 h-16 text-mr-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeWidth={1} d="M8 17h.01M16 17h.01M3 11l2-6h14l2 6M5 17h14a2 2 0 002-2v-4H3v4a2 2 0 002 2z" />
                  </svg>
                  <p className="text-lg font-medium uppercase tracking-wide">
                    Sin vehículos registrados
                  </p>
                  <p className="text-sm">
                    Registra tu primer vehículo para comenzar
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
