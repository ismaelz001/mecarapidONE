import Link from 'next/link';
import Image from 'next/image';

const phone = '+34 969 XX XX XX';
const whatsapp = '34969XXXXXX';
const hours = 'Lun\u2013Vie 9:00\u201319:00\nS\u00e1b 9:00\u201314:00';
const address = 'Cuenca — a\u00f1adir direcci\u00f3n';

export default function CebrianContactoPage() {
  return (
    <div style={{ backgroundColor: '#0A0D0C', color: '#F2F0EB' }} className="min-h-[100dvh] antialiased">

      {/* HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur-sm border-b" style={{ backgroundColor: 'rgba(10,13,12,0.95)', borderColor: '#1A1F1E' }}>
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-4 flex items-center justify-between">
          <Link href="/website/cebrian" className="relative h-[36px] w-[160px] flex-shrink-0">
            <Image src="/cebrian/logo.png" alt="Cebrian Autmooci\u00f3n" fill className="object-contain object-left" priority />
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/website/cebrian/servicios" className="text-xs uppercase tracking-[0.14em] transition-colors" style={{ color: '#666' }}>Servicios</Link>
            <Link href="/website/cebrian/contacto" className="text-xs uppercase tracking-[0.14em] font-semibold" style={{ color: '#F2F0EB' }}>Contacto</Link>
            <a href={`tel:${phone}`} className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: '#009AD6' }}>{phone}</a>
          </nav>
          <Link href="/website/cebrian/reserva" className="font-bold text-xs px-5 py-3 uppercase tracking-[0.12em]" style={{ backgroundColor: '#009AD6', color: '#0A0D0C' }}>
            Reservar cita
          </Link>
        </div>
      </header>

      {/* HERO CONTACTO */}
      <section className="pt-20 pb-16 px-5 md:px-10 border-b" style={{ borderColor: '#1A1F1E' }}>
        <div className="max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-[0.18em] font-semibold mb-5" style={{ color: '#009AD6' }}>Contacto</p>
          <h1 className="font-bold leading-[0.9] tracking-tight" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', color: '#F2F0EB', maxWidth: '14ch' }}>
            Hablamos.
          </h1>
        </div>
      </section>

      {/* BLOQUES CONTACTO */}
      <section className="py-16 px-5 md:px-10 border-b" style={{ borderColor: '#1A1F1E' }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-4">

          {/* Tel\u00e9fono */}
          <a href={`tel:${phone}`} className="border p-10 transition-colors group" style={{ borderColor: '#1A1F1E' }}>
            <p className="text-xs uppercase tracking-[0.14em] mb-4" style={{ color: '#444' }}>Tel\u00e9fono</p>
            <p className="font-bold leading-tight mb-3" style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', color: '#F2F0EB' }}>{phone}</p>
            <p className="text-sm" style={{ color: '#009AD6' }}>Llamar ahora \u2192</p>
          </a>

          {/* WhatsApp */}
          <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="border p-10 transition-colors group" style={{ borderColor: '#1A1F1E' }}>
            <p className="text-xs uppercase tracking-[0.14em] mb-4" style={{ color: '#444' }}>WhatsApp</p>
            <p className="font-bold leading-tight mb-3" style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', color: '#F2F0EB' }}>Escr\u00edbenos</p>
            <p className="text-sm" style={{ color: '#009AD6' }}>Abrir WhatsApp \u2192</p>
          </a>

          {/* Horario */}
          <div className="border p-10" style={{ borderColor: '#1A1F1E' }}>
            <p className="text-xs uppercase tracking-[0.14em] mb-4" style={{ color: '#444' }}>Horario</p>
            <p className="font-bold leading-relaxed whitespace-pre-line" style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#F2F0EB' }}>{hours}</p>
          </div>

          {/* Direcci\u00f3n */}
          <div className="border p-10" style={{ borderColor: '#1A1F1E' }}>
            <p className="text-xs uppercase tracking-[0.14em] mb-4" style={{ color: '#444' }}>Direcci\u00f3n</p>
            <p className="font-bold leading-relaxed" style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#F2F0EB' }}>{address}</p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-5 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_auto] gap-12 items-end">
          <div>
            <h2 className="font-bold leading-[0.9] tracking-tight mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', color: '#F2F0EB' }}>
              Reserva tu cita<br />ahora mismo.
            </h2>
            <p style={{ color: '#555' }}>Formulario r\u00e1pido, confirmaci\u00f3n en 24h.</p>
          </div>
          <Link href="/website/cebrian/reserva" className="inline-flex items-center justify-center font-bold px-10 py-5 text-base uppercase tracking-[0.1em] whitespace-nowrap" style={{ backgroundColor: '#009AD6', color: '#0A0D0C' }}>
            Reservar
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-5 md:px-10 border-t" style={{ borderColor: '#1A1F1E' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: '#2A2F2E' }}>Cebri\u00e1n Automoci\u00f3n</p>
          <div className="flex items-center gap-6">
            <Link href="/website/cebrian" className="text-xs" style={{ color: '#2A2F2E' }}>Inicio</Link>
            <Link href="/website/cebrian/servicios" className="text-xs" style={{ color: '#2A2F2E' }}>Servicios</Link>
            <Link href="/website/cebrian/reserva" className="text-xs" style={{ color: '#2A2F2E' }}>Reservar</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
