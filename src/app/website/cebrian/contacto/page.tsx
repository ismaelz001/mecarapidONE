import Link from 'next/link';

export default function CebrianContactoPage() {
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

      {/* Content */}
      <main className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wider mb-4 text-center" style={{ color: '#009AD6' }}>
            Contacto
          </h1>
          <p className="text-center mb-12" style={{ color: '#D7DBDD' }}>
            Muy pronto:
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* WhatsApp */}
            <div 
              className="p-6 border text-center"
              style={{ borderColor: '#009AD6', backgroundColor: 'rgba(0, 154, 214, 0.05)' }}
            >
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-lg font-bold uppercase tracking-wide mb-2" style={{ color: '#F5F7F6' }}>
                WhatsApp
              </h3>
              <p className="text-sm" style={{ color: '#D7DBDD' }}>
                [Próximamente]
              </p>
            </div>

            {/* Dirección */}
            <div 
              className="p-6 border text-center"
              style={{ borderColor: '#009AD6', backgroundColor: 'rgba(0, 154, 214, 0.05)' }}
            >
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-lg font-bold uppercase tracking-wide mb-2" style={{ color: '#F5F7F6' }}>
                Dirección
              </h3>
              <p className="text-sm" style={{ color: '#D7DBDD' }}>
                [Próximamente]
              </p>
            </div>

            {/* Horario */}
            <div 
              className="p-6 border text-center"
              style={{ borderColor: '#009AD6', backgroundColor: 'rgba(0, 154, 214, 0.05)' }}
            >
              <div className="text-4xl mb-4">🕐</div>
              <h3 className="text-lg font-bold uppercase tracking-wide mb-2" style={{ color: '#F5F7F6' }}>
                Horario
              </h3>
              <p className="text-sm" style={{ color: '#D7DBDD' }}>
                [Próximamente]
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="mb-6" style={{ color: '#D7DBDD' }}>
              Mientras tanto, puedes reservar tu cita online
            </p>
            <Link 
              href="/website/cebrian/reserva"
              className="inline-block px-8 py-4 font-bold uppercase tracking-wide transition-colors"
              style={{ backgroundColor: '#009AD6', color: '#0A0D0C' }}
            >
              Reservar Cita
            </Link>
          </div>
        </div>
      </main>

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
