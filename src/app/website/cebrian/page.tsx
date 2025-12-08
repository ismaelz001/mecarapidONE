import Link from 'next/link';

export default function CebrianLandingPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A0D0C' }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: '#009AD6' }}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo Placeholder - Car Silhouette */}
            <div className="w-12 h-12 flex items-center justify-center" style={{ backgroundColor: '#009AD6' }}>
              <svg className="w-8 h-8" style={{ color: '#0A0D0C' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
              </svg>
            </div>
            <span className="text-xl font-bold tracking-wider" style={{ color: '#F5F7F6' }}>
              CEBRIAN
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/website/cebrian/servicios" 
              className="text-sm uppercase tracking-wide transition-colors"
              style={{ color: '#D7DBDD' }}
              onMouseOver={(e) => e.currentTarget.style.color = '#009AD6'}
              onMouseOut={(e) => e.currentTarget.style.color = '#D7DBDD'}
            >
              Servicios
            </Link>
            <Link 
              href="/website/cebrian/contacto" 
              className="text-sm uppercase tracking-wide transition-colors"
              style={{ color: '#D7DBDD' }}
            >
              Contacto
            </Link>
            <Link 
              href="/website/cebrian/reserva" 
              className="px-4 py-2 font-bold uppercase tracking-wide text-sm transition-colors"
              style={{ backgroundColor: '#009AD6', color: '#0A0D0C' }}
            >
              Reservar Cita
            </Link>
          </nav>
          <Link 
            href="/website/cebrian/reserva" 
            className="md:hidden px-4 py-2 font-bold uppercase tracking-wide text-sm"
            style={{ backgroundColor: '#009AD6', color: '#0A0D0C' }}
          >
            Reservar
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo Large */}
          <div className="inline-flex items-center justify-center w-24 h-24 mb-8" style={{ backgroundColor: '#009AD6' }}>
            <svg className="w-16 h-16" style={{ color: '#0A0D0C' }} fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
            </svg>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-widest mb-4" style={{ color: '#F5F7F6' }}>
            Cebrian Automoción
          </h1>
          <p className="text-xl md:text-2xl mb-10" style={{ color: '#D7DBDD' }}>
            Servicio integral de mecánica y diagnosis
          </p>
          <Link 
            href="/website/cebrian/reserva"
            className="inline-block px-8 py-4 font-bold uppercase tracking-wide text-lg transition-colors"
            style={{ backgroundColor: '#009AD6', color: '#0A0D0C' }}
          >
            Reservar Cita
          </Link>
        </div>
      </section>

      {/* Separator */}
      <div className="w-full h-px" style={{ backgroundColor: '#009AD6' }} />

      {/* Services Teaser */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider text-center mb-12" style={{ color: '#009AD6' }}>
            Servicios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Mecánica General', icon: '🔧', desc: 'Reparaciones y mantenimiento completo' },
              { title: 'Pre-ITV', icon: '📋', desc: 'Revisión y preparación para ITV' },
              { title: 'Diagnosis', icon: '🔌', desc: 'Diagnosis electrónica profesional' },
              { title: 'Mantenimiento', icon: '🛢️', desc: 'Cambios de aceite y filtros' },
            ].map((service, i) => (
              <div 
                key={i} 
                className="p-6 border transition-colors"
                style={{ 
                  borderColor: '#009AD6', 
                  backgroundColor: 'rgba(0, 154, 214, 0.05)' 
                }}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-bold uppercase tracking-wide mb-2" style={{ color: '#F5F7F6' }}>
                  {service.title}
                </h3>
                <p className="text-sm" style={{ color: '#D7DBDD' }}>
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link 
              href="/website/cebrian/servicios"
              className="inline-block px-6 py-3 border font-bold uppercase tracking-wide text-sm transition-colors"
              style={{ borderColor: '#009AD6', color: '#009AD6' }}
            >
              Ver Todos los Servicios
            </Link>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="w-full h-px" style={{ backgroundColor: '#009AD6' }} />

      {/* CTA Section */}
      <section className="py-16 px-4" style={{ backgroundColor: '#009AD6' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider mb-4" style={{ color: '#0A0D0C' }}>
            ¿Necesitas una revisión?
          </h2>
          <p className="mb-8" style={{ color: '#0A0D0C', opacity: 0.8 }}>
            Reserva tu cita online y te atendemos lo antes posible
          </p>
          <Link 
            href="/website/cebrian/reserva"
            className="inline-block px-8 py-4 font-bold uppercase tracking-wide text-lg transition-colors"
            style={{ backgroundColor: '#0A0D0C', color: '#F5F7F6' }}
          >
            Reservar Cita
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t" style={{ borderColor: '#009AD6' }}>
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm" style={{ color: '#D7DBDD', opacity: 0.6 }}>
            © 2024 Cebrian Automoción. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
