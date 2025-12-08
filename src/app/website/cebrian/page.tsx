import Link from 'next/link';
import Image from 'next/image';

export default function CebrianLandingPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A0D0C' }}>
      {/* Inline styles for hover effects */}
      <style>{`
        .cebrian-link:hover { color: #009AD6 !important; }
        .cebrian-btn:hover { background-color: #037FB4 !important; }
        .cebrian-btn-dark:hover { background-color: #1a1d1c !important; }
        .cebrian-card:hover { border-color: #037FB4 !important; }
        .cebrian-btn-outline:hover { background-color: rgba(0, 154, 214, 0.1) !important; }
      `}</style>

      {/* Header */}
      <header className="border-b" style={{ borderColor: '#009AD6' }}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="relative h-[40px] md:h-[60px] w-[150px] md:w-[200px]">
              <Image 
                src="/cebrian/logo.png" 
                alt="Cebrian Automoción" 
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/website/cebrian/servicios" 
              className="cebrian-link text-sm uppercase tracking-wide transition-colors"
              style={{ color: '#D7DBDD' }}
            >
              Servicios
            </Link>
            <Link 
              href="/website/cebrian/contacto" 
              className="cebrian-link text-sm uppercase tracking-wide transition-colors"
              style={{ color: '#D7DBDD' }}
            >
              Contacto
            </Link>
            <Link 
              href="/website/cebrian/reserva" 
              className="cebrian-btn px-4 py-2 font-bold uppercase tracking-wide text-sm transition-colors"
              style={{ backgroundColor: '#009AD6', color: '#0A0D0C' }}
            >
              Reservar Cita
            </Link>
          </nav>
          <Link 
            href="/website/cebrian/reserva" 
            className="cebrian-btn md:hidden px-4 py-2 font-bold uppercase tracking-wide text-sm transition-colors"
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
          <div className="relative w-[250px] md:w-[330px] h-[100px] mx-auto mb-8">
            <Image 
              src="/cebrian/logo.png" 
              alt="Cebrian Automoción" 
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-widest mb-4" style={{ color: '#F5F7F6' }}>
            Cebrian Automoción
          </h1>
          <p className="text-xl md:text-2xl mb-10" style={{ color: '#D7DBDD' }}>
            Servicio integral de mecánica y diagnosis
          </p>
          <Link 
            href="/website/cebrian/reserva"
            className="cebrian-btn inline-block px-8 py-4 font-bold uppercase tracking-wide text-lg transition-colors"
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
                className="cebrian-card p-6 border transition-colors"
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
              className="cebrian-btn-outline inline-block px-6 py-3 border font-bold uppercase tracking-wide text-sm transition-colors"
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
            className="cebrian-btn-dark inline-block px-8 py-4 font-bold uppercase tracking-wide text-lg transition-colors"
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
