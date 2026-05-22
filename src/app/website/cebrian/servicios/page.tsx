import Link from 'next/link';
import Image from 'next/image';

const phone = '+34 969 XX XX XX';

const categories = [
  {
    title: 'Mecánica General',
    items: [
      { name: 'Revisión general', price: 'Desde 39 €' },
      { name: 'Cambio de correa de distribución', price: 'Desde 149 €' },
      { name: 'Reparación de motor', price: 'Presupuesto gratis' },
      { name: 'Suspensión y amortiguadores', price: 'Desde 89 €' },
      { name: 'Embrague', price: 'Desde 199 €' },
    ],
  },
  {
    title: 'Mantenimiento',
    items: [
      { name: 'Cambio de aceite y filtros', price: 'Desde 49 €' },
      { name: 'Filtro de habitáculo', price: 'Desde 19 €' },
      { name: 'Líquido de frenos', price: 'Desde 25 €' },
      { name: 'Refrigerante y anticongelante', price: 'Desde 29 €' },
    ],
  },
  {
    title: 'Frenos y seguridad',
    items: [
      { name: 'Pastillas de freno', price: 'Desde 59 €' },
      { name: 'Discos de freno', price: 'Desde 89 €' },
      { name: 'Revisión ABS', price: 'Presupuesto gratis' },
    ],
  },
  {
    title: 'Electricidad y electrónica',
    items: [
      { name: 'Diagnosis electrónica', price: '35 €' },
      { name: 'Batería y alternador', price: 'Presupuesto gratis' },
      { name: 'Sensores y sondas', price: 'Presupuesto gratis' },
    ],
  },
  {
    title: 'Neumáticos y geometría',
    items: [
      { name: 'Neumáticos (montaje y equilibrado)', price: 'Desde 15 €/ud' },
      { name: 'Geometría y alineación', price: 'Desde 39 €' },
    ],
  },
  {
    title: 'Aire acondicionado',
    items: [
      { name: 'Recarga y revisión AC', price: 'Desde 59 €' },
      { name: 'Desinfección habitáculo', price: 'Desde 25 €' },
    ],
  },
  {
    title: 'Pre-ITV',
    items: [
      { name: 'Revisión pre-ITV', price: '25 €' },
      { name: 'Informe de estado', price: 'Gratis con reparación' },
    ],
  },
];

export default function CebrianServiciosPage() {
  return (
    <div style={{ backgroundColor: '#0A0D0C', color: '#F2F0EB' }} className="min-h-[100dvh] antialiased">

      {/* HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur-sm border-b" style={{ backgroundColor: 'rgba(10,13,12,0.95)', borderColor: '#1A1F1E' }}>
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-4 flex items-center justify-between">
          <Link href="/website/cebrian" className="relative h-[36px] w-[160px] flex-shrink-0">
            <Image src="/cebrian/logo.png" alt="Cebrian Automacion" fill className="object-contain object-left" priority />
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/website/cebrian/servicios" className="text-xs uppercase tracking-[0.14em] font-semibold" style={{ color: '#F2F0EB' }}>Servicios</Link>
            <Link href="/website/cebrian/contacto" className="text-xs uppercase tracking-[0.14em] transition-colors" style={{ color: '#666' }}>Contacto</Link>
            <a href={'tel:' + phone} className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: '#009AD6' }}>{phone}</a>
          </nav>
          <Link href="/website/cebrian/reserva" className="font-bold text-xs px-5 py-3 uppercase tracking-[0.12em]" style={{ backgroundColor: '#009AD6', color: '#0A0D0C' }}>Reservar cita</Link>
        </div>
      </header>

      {/* HERO SERVICIOS */}
      <section className="pt-20 pb-14 px-5 md:px-10 border-b" style={{ borderColor: '#1A1F1E' }}>
        <div className="max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-[0.18em] font-semibold mb-5" style={{ color: '#009AD6' }}>Servicios</p>
          <h1 className="font-bold leading-[0.9] tracking-tight" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', color: '#F2F0EB', maxWidth: '14ch' }}>
            Lo arreglamos. Punto.
          </h1>
          <p className="mt-6 leading-relaxed" style={{ color: '#555', maxWidth: '46ch' }}>
            Presupuesto siempre gratuito. Sin letras pequeñas.
          </p>
        </div>
      </section>

      {/* CATEGORIAS */}
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        {categories.map((cat, ci) => (
          <section key={ci} className="py-12 border-b" style={{ borderColor: '#1A1F1E' }}>
            <p className="text-xs uppercase tracking-[0.18em] font-semibold mb-8" style={{ color: '#009AD6' }}>{cat.title}</p>
            <div className="grid md:grid-cols-2 gap-x-12">
              {cat.items.map((item, ii) => (
                <div key={ii} className="flex items-center justify-between py-4 -mx-3 px-3" style={{ borderTop: '1px solid #1A1F1E' }}>
                  <span className="font-medium" style={{ color: '#F2F0EB' }}>{item.name}</span>
                  <span className="text-sm font-semibold ml-4 whitespace-nowrap" style={{ color: '#009AD6' }}>{item.price}</span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <section className="py-24 px-5 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div>
            <h2 className="font-bold leading-[0.9] tracking-tight mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', color: '#F2F0EB' }}>
              Pide tu presupuesto
            </h2>
            <p style={{ color: '#555' }}>Sin compromiso. En menos de 24h.</p>
          </div>
          <Link href="/website/cebrian/reserva" className="inline-flex items-center justify-center font-bold px-10 py-5 text-base uppercase tracking-[0.1em] whitespace-nowrap" style={{ backgroundColor: '#009AD6', color: '#0A0D0C' }}>
            Reservar cita
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-5 md:px-10 border-t" style={{ borderColor: '#1A1F1E' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: '#2A2F2E' }}>
            Cebrian Automacion
          </p>
          <div className="flex items-center gap-6">
            <Link href="/website/cebrian" className="text-xs" style={{ color: '#2A2F2E' }}>Inicio</Link>
            <Link href="/website/cebrian/contacto" className="text-xs" style={{ color: '#2A2F2E' }}>Contacto</Link>
            <Link href="/website/cebrian/reserva" className="text-xs" style={{ color: '#2A2F2E' }}>Reservar</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
