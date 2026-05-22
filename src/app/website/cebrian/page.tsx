import Link from 'next/link';
import Image from 'next/image';

// ── Datos Cebrian ─────────────────────────────────────────
const phone = '+34 969 XX XX XX';
const whatsapp = '34969XXXXXX';
const hours = 'Lun–Vie 9:00–19:00 · Sáb 9:00–14:00';

const services = [
  { name: 'Mecánica general', price: 'Presupuesto gratis' },
  { name: 'Diagnosis electrónica', price: '35 €' },
  { name: 'Pre-ITV', price: '25 €' },
  { name: 'Cambio de aceite y filtros', price: 'Desde 49 €' },
  { name: 'Frenos y discos', price: 'Desde 89 €' },
  { name: 'Aire acondicionado', price: 'Desde 59 €' },
  { name: 'Neumáticos y equilibrado', price: 'Desde 15 €/ud' },
  { name: 'Electricidad y alternador', price: 'Presupuesto gratis' },
];

const IconWhatsApp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function CebrianLandingPage() {
  return (
    <div style={{ backgroundColor: '#0A0D0C', color: '#F2F0EB' }} className="min-h-[100dvh] antialiased">

      {/* HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur-sm border-b" style={{ backgroundColor: 'rgba(10,13,12,0.95)', borderColor: '#1A1F1E' }}>
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-4 flex items-center justify-between">
          <Link href="/website/cebrian" className="relative h-[36px] w-[160px] flex-shrink-0">
            <Image src="/cebrian/logo.png" alt="Cebrian Automacion" fill className="object-contain object-left" priority />
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/website/cebrian/servicios" className="text-xs uppercase tracking-[0.14em] transition-colors" style={{ color: '#666' }}>Servicios</Link>
            <Link href="/website/cebrian/contacto" className="text-xs uppercase tracking-[0.14em] transition-colors" style={{ color: '#666' }}>Contacto</Link>
            <a href={'tel:' + phone} className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: '#009AD6' }}>{phone}</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/website/cebrian/reserva" className="font-bold text-xs px-5 py-3 uppercase tracking-[0.12em] transition-colors" style={{ backgroundColor: '#009AD6', color: '#0A0D0C' }}>Reservar cita</Link>
            <Link href="/login" className="text-[10px] uppercase tracking-wider hidden md:block" style={{ color: '#2A2F2E' }}>Acceso taller</Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="min-h-[100dvh] flex flex-col justify-center px-5 md:px-10 py-24 border-b" style={{ borderColor: '#1A1F1E' }}>
        <div className="max-w-7xl mx-auto w-full">
          <div className="relative mb-16" style={{ width: 'clamp(200px, 28vw, 360px)', height: 'clamp(80px, 11vw, 145px)' }}>
            <Image src="/cebrian/logo.png" alt="Cebrian Automacion" fill className="object-contain object-left" priority />
          </div>
          <h1 className="font-bold leading-[0.88] tracking-tight mb-10" style={{ fontSize: 'clamp(3.5rem, 10vw, 9.5rem)', color: '#F2F0EB', maxWidth: '13ch' }}>
            Mecánica<br />que da<br />la cara.
          </h1>
          <p className="text-lg md:text-xl leading-relaxed mb-14" style={{ color: '#666', maxWidth: '44ch' }}>
            Reparamos tu vehículo con garantía de resultado.<br />Presupuesto gratis, sin sorpresas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/website/cebrian/reserva" className="inline-flex items-center justify-center font-bold px-8 py-5 text-base uppercase tracking-[0.1em] transition-colors" style={{ backgroundColor: '#009AD6', color: '#0A0D0C' }}>
              Reservar cita online
            </Link>
            <a href={'https://wa.me/' + whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 border font-semibold px-8 py-5 text-base transition-colors" style={{ borderColor: '#1A1F1E', color: '#F2F0EB' }}>
              <span style={{ color: '#009AD6' }}><IconWhatsApp /></span>
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b" style={{ borderColor: '#1A1F1E', backgroundColor: '#0D1110' }}>
        <div className="max-w-7xl mx-auto px-5 md:px-10 grid grid-cols-3">
          {[
            { n: '+15', label: 'Años de experiencia' },
            { n: '+2.000', label: 'Vehículos reparados' },
            { n: '100%', label: 'Presupuesto gratuito' },
          ].map((s, i) => (
            <div key={i} className="py-10 px-4 md:px-8" style={{ borderLeft: i > 0 ? '1px solid #1A1F1E' : 'none' }}>
              <p className="font-bold mb-1" style={{ color: '#009AD6', fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)' }}>{s.n}</p>
              <p className="text-xs uppercase tracking-[0.12em]" style={{ color: '#444' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="py-24 md:py-32 px-5 md:px-10 border-b" style={{ borderColor: '#1A1F1E' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-baseline justify-between mb-14">
            <p className="text-xs uppercase tracking-[0.18em] font-semibold" style={{ color: '#009AD6' }}>Servicios</p>
            <Link href="/website/cebrian/servicios" className="text-xs uppercase tracking-[0.12em] transition-colors" style={{ color: '#444' }}>Ver todos</Link>
          </div>
          <div className="grid md:grid-cols-2">
            {services.map((s, i) => (
              <div key={i} className="flex items-center justify-between py-5 px-3 -mx-3" style={{ borderTop: '1px solid #1A1F1E' }}>
                <span className="font-medium" style={{ color: '#F2F0EB' }}>{s.name}</span>
                <span className="text-sm font-semibold" style={{ color: '#009AD6' }}>{s.price}</span>
              </div>
            ))}
          </div>
          <div className="pt-10 mt-2" style={{ borderTop: '1px solid #1A1F1E' }}>
            <Link href="/website/cebrian/reserva" className="text-sm uppercase tracking-[0.12em]" style={{ color: '#444' }}>
              Solicitar presupuesto →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA RESERVA */}
      <section className="py-28 md:py-40 px-5 md:px-10 border-b" style={{ borderColor: '#1A1F1E' }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_auto] gap-12 items-end">
          <div>
            <h2 className="font-bold leading-[0.9] tracking-tight mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)', color: '#F2F0EB' }}>
              ¿Cuándo traes<br />el coche?
            </h2>
            <p className="leading-relaxed max-w-[44ch]" style={{ color: '#555' }}>
              Rellena el formulario en 2 minutos. Te llamamos para confirmar la cita. Sin listas de espera eternas.
            </p>
          </div>
          <Link href="/website/cebrian/reserva" className="inline-flex items-center justify-center font-bold px-10 py-5 text-base uppercase tracking-[0.1em] transition-colors whitespace-nowrap" style={{ backgroundColor: '#009AD6', color: '#0A0D0C' }}>
            Reservar ahora
          </Link>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="py-20 px-5 md:px-10 border-b" style={{ borderColor: '#1A1F1E', backgroundColor: '#0D1110' }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-4">
          <a href={'tel:' + phone} className="border p-8 transition-colors" style={{ borderColor: '#1A1F1E' }}>
            <p className="text-xs uppercase tracking-[0.12em] mb-3" style={{ color: '#444' }}>Teléfono</p>
            <p className="text-xl font-bold" style={{ color: '#F2F0EB' }}>{phone}</p>
          </a>
          <a href={'https://wa.me/' + whatsapp} target="_blank" rel="noopener noreferrer" className="border p-8 transition-colors" style={{ borderColor: '#1A1F1E' }}>
            <p className="text-xs uppercase tracking-[0.12em] mb-3" style={{ color: '#444' }}>WhatsApp</p>
            <p className="text-xl font-bold" style={{ color: '#F2F0EB' }}>Escribir mensaje</p>
          </a>
          <div className="border p-8" style={{ borderColor: '#1A1F1E' }}>
            <p className="text-xs uppercase tracking-[0.12em] mb-3" style={{ color: '#444' }}>Horario</p>
            <p className="font-medium leading-relaxed" style={{ color: '#F2F0EB' }}>{hours}</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-5 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: '#2A2F2E' }}>© {new Date().getFullYear()} Cebrián Automoción. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <Link href="/website/cebrian/servicios" className="text-xs" style={{ color: '#2A2F2E' }}>Servicios</Link>
            <Link href="/website/cebrian/contacto" className="text-xs" style={{ color: '#2A2F2E' }}>Contacto</Link>
            <Link href="/website/cebrian/reserva" className="text-xs" style={{ color: '#2A2F2E' }}>Reservar</Link>
            <Link href="/login" className="text-xs" style={{ color: '#1E2220' }}>Acceso taller</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
