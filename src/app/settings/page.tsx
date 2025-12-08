import Shell from '@/components/layout/Shell';

const settingsSections = [
  {
    title: 'General',
    description: 'Configuración básica del sistema',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="square" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="square" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Usuarios',
    description: 'Gestión de usuarios y permisos',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="square" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: 'Taller',
    description: 'Información y horarios del taller',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="square" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    title: 'Notificaciones',
    description: 'Alertas y recordatorios',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="square" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
  },
  {
    title: 'Integraciones',
    description: 'APIs y servicios externos',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="square" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
  },
  {
    title: 'Seguridad',
    description: 'Contraseñas y autenticación',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="square" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
];

export default function SettingsPage() {
  return (
    <Shell>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold uppercase tracking-wider text-mr-text">
          Configuración
        </h1>
        <p className="text-mr-text/60 mt-1">
          Administración y preferencias del sistema
        </p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {settingsSections.map((section, index) => (
          <button
            key={index}
            className="card-industrial text-left group hover:border-mr-accent transition-colors duration-150"
          >
            <div className="flex items-start gap-4">
              <div className="text-mr-secondary group-hover:text-mr-accent transition-colors duration-150">
                {section.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold uppercase tracking-wide text-mr-text group-hover:text-mr-accent transition-colors duration-150">
                  {section.title}
                </h3>
                <p className="text-sm text-mr-text/60 mt-1">
                  {section.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Info Section */}
      <div className="mt-8 card-industrial">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-mr-accent flex items-center justify-center">
            <span className="text-mr-bg font-bold text-2xl">M</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-mr-text">MecaRapidOne v0.1.0</h3>
            <p className="text-sm text-mr-text/60">Sistema de gestión de taller mecánico</p>
          </div>
        </div>
      </div>
    </Shell>
  );
}
