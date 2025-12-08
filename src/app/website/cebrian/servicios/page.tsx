import Link from 'next/link';

export default function CebrianServiciosPage() {
  const services = [
    { title: 'Mecánica General', icon: '🔧', desc: 'Reparaciones de motor, transmisión, suspensión y más' },
    { title: 'Pre-ITV', icon: '📋', desc: 'Revisión completa y preparación para pasar la ITV' },
    { title: 'Diagnosis Electrónica', icon: '🔌', desc: 'Lectura de códigos de error y diagnosis profesional' },
    { title: 'Cambio de Aceite', icon: '🛢️', desc: 'Cambio de aceite sintético y filtros' },
    { title: 'Frenos', icon: '🛑', desc: 'Revisión y cambio de pastillas y discos' },
    { title: 'Neumáticos', icon: '🚗', desc: 'Cambio, equilibrado y alineación' },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A0D0C' }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: '#009AD6' }}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/website/cebrian" className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center" style={{ backgroundColor: '#009AD6' }}>
              <svg className="w-6 h-6" style={{ color: '#0A0D0C' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
              </svg>
            </div>
            <span className="font-bold tracking-wider" style={{ color: '#F5F7F6' }}>CEBRIAN</span>
          </Link>
          <Link 
            href="/website/cebrian/reserva" 
            className="px-4 py-2 font-bold uppercase tracking-wide text-sm"
            style={{ backgroundColor: '#009AD6', color: '#0A0D0C' }}
          >
            Reservar Cita
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wider mb-4" style={{ color: '#009AD6' }}>
            Servicios
          </h1>
          <p style={{ color: '#D7DBDD' }}>
            Ofrecemos un servicio integral para tu vehículo
          </p>
        </div>
      </section>

      {/* Separator */}
      <div className="w-full h-px" style={{ backgroundColor: '#009AD6' }} />

      {/* Services Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div 
                key={i} 
                className="p-6 border transition-colors"
                style={{ 
                  borderColor: '#009AD6', 
                  backgroundColor: 'rgba(0, 154, 214, 0.05)' 
                }}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold uppercase tracking-wide mb-3" style={{ color: '#F5F7F6' }}>
                  {service.title}
                </h3>
                <p className="mb-4" style={{ color: '#D7DBDD' }}>
                  {service.desc}
                </p>
                <Link 
                  href="/website/cebrian/reserva"
                  className="inline-block text-sm uppercase tracking-wide transition-colors"
                  style={{ color: '#009AD6' }}
                >
                  Solicitar →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4" style={{ backgroundColor: '#009AD6' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold uppercase tracking-wider mb-4" style={{ color: '#0A0D0C' }}>
            ¿No encuentras lo que buscas?
          </h2>
          <p className="mb-6" style={{ color: '#0A0D0C', opacity: 0.8 }}>
            Contacta con nosotros y te asesoramos sin compromiso
          </p>
          <Link 
            href="/website/cebrian/contacto"
            className="inline-block px-6 py-3 font-bold uppercase tracking-wide transition-colors"
            style={{ backgroundColor: '#0A0D0C', color: '#F5F7F6' }}
          >
            Contactar
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
