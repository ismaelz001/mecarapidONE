import Link from 'next/link';
import { getWorkshopBySlug } from '@/server/reservas';
import { ScrollReveal } from '@/components/website/ScrollReveal';

interface PageProps {
  params: { slug: string };
}

const IconPhone = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
);

const IconWhatsApp = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const IconMail = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);

const IconMapPin = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

const IconClock = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

export default async function ContactoPage({ params }: PageProps) {
  const workshop = await getWorkshopBySlug(params.slug);

  const contactItems = [
    {
      label: 'Teléfono',
      value: workshop.phone,
      sub: 'Llámanos directamente',
      href: `tel:${workshop.phone.replace(/\s/g, '')}`,
      Icon: IconPhone,
      accent: true,
    },
    {
      label: 'WhatsApp',
      value: 'Enviar mensaje',
      sub: 'Respuesta rápida',
      href: `https://wa.me/${workshop.whatsapp}?text=Hola, me gustar%C3%ADa informaci%C3%B3n sobre vuestros servicios`,
      external: true,
      Icon: IconWhatsApp,
    },
    {
      label: 'Email',
      value: workshop.email,
      sub: null,
      href: `mailto:${workshop.email}`,
      Icon: IconMail,
    },
    {
      label: 'Dirección',
      value: workshop.address,
      sub: 'Ver en Google Maps',
      href: `https://maps.google.com/?q=${encodeURIComponent(workshop.address)}`,
      external: true,
      Icon: IconMapPin,
    },
    {
      label: 'Horario',
      value: workshop.hours,
      sub: null,
      href: null,
      Icon: IconClock,
    },
  ];

  return (
    <div className="min-h-[100dvh] bg-site-bg text-site-text">

      {/* ── HEADER ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-site-bg/95 backdrop-blur-sm border-b border-site-border">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-4 flex items-center justify-between">
          <Link href={`/website/${params.slug}`} className="flex items-center gap-3">
            <div className="w-9 h-9 bg-site-accent flex items-center justify-center">
              <span className="text-white font-bold text-base leading-none">N</span>
            </div>
            <span className="font-bold text-site-text text-base tracking-tight">{workshop.name}</span>
          </Link>
          <nav className="hidden md:flex items-center gap-7">
            <Link href={`/website/${params.slug}`} className="text-sm text-site-muted hover:text-site-text transition-colors">Inicio</Link>
            <Link href={`/website/${params.slug}/servicios`} className="text-sm text-site-muted hover:text-site-text transition-colors">Servicios</Link>
            <a href={`tel:${workshop.phone.replace(/\s/g, '')}`}
               className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-site-accent px-4 py-2 hover:bg-site-text transition-colors">
              <IconPhone /> Llamar ahora
            </a>
            <Link href="/login" className="text-xs text-site-border hover:text-site-muted transition-colors" title="Acceso taller">
              Acceso taller
            </Link>
          </nav>
          <a href={`tel:${workshop.phone.replace(/\s/g, '')}`}
             className="md:hidden inline-flex items-center gap-2 text-sm font-semibold text-white bg-site-accent px-4 py-2">
            <IconPhone /> Llamar
          </a>
        </div>
      </header>

      {/* ── INTRO ──────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 border-b border-site-border">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <p className="site-hero-animate text-xs font-semibold text-site-accent uppercase tracking-[0.18em] mb-4">Contacto</p>
          <h1 className="site-hero-animate site-hero-animate-delay-1 font-bold text-site-text leading-tight"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
            Estamos aquí.<br />Llama y hablamos.
          </h1>
          <p className="site-hero-animate site-hero-animate-delay-2 mt-6 text-site-muted leading-relaxed max-w-[48ch]">
            La forma más rápida es llamarnos. En 5 minutos sabes si podemos
            atenderte ese mismo día.
          </p>
        </div>
      </section>

      {/* ── CONTACTO ITEMS ─────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-2 gap-x-20 gap-y-0">
            {contactItems.map((item, i) => (
              <ScrollReveal key={item.label} delay={i * 70}>
                <div className="border-b border-site-border py-7">
                  {item.href ? (
                    <a
                      href={item.href}
                      {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="flex items-start gap-5 group"
                    >
                      <span className="mt-0.5 text-site-accent flex-shrink-0">
                        <item.Icon />
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-site-muted uppercase tracking-widest mb-1">{item.label}</p>
                        <p className="font-semibold text-site-text text-lg group-hover:text-site-accent transition-colors truncate">
                          {item.value}
                        </p>
                        {item.sub && (
                          <p className="text-xs text-site-muted mt-0.5 flex items-center gap-1">
                            {item.sub} <span className="inline-block"><IconArrow /></span>
                          </p>
                        )}
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-start gap-5">
                      <span className="mt-0.5 text-site-accent flex-shrink-0">
                        <item.Icon />
                      </span>
                      <div>
                        <p className="text-xs text-site-muted uppercase tracking-widest mb-1">{item.label}</p>
                        <p className="font-semibold text-site-text text-lg">{item.value}</p>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA RESERVA ────────────────────────────────────────── */}
      <section className="py-20 bg-site-surface border-t border-site-border">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <ScrollReveal>
            <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <h2 className="font-bold text-site-text leading-tight mb-3"
                    style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
                  Prefiero reservar online
                </h2>
                <p className="text-site-muted leading-relaxed max-w-[48ch]">
                  Rellena el formulario en 2 minutos y te confirmamos la cita.
                  Sin esperas al teléfono.
                </p>
              </div>
              <Link
                href={`/website/${params.slug}/reserva`}
                className="inline-flex items-center gap-3 bg-site-text text-site-bg font-semibold px-7 py-4 hover:bg-site-accent transition-colors whitespace-nowrap"
              >
                Reservar cita <IconArrow />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer className="py-10 px-5 md:px-8 border-t border-site-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-site-muted">© {new Date().getFullYear()} {workshop.name}. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <Link href={`/website/${params.slug}`} className="text-xs text-site-muted hover:text-site-text transition-colors">Inicio</Link>
            <Link href={`/website/${params.slug}/servicios`} className="text-xs text-site-muted hover:text-site-text transition-colors">Servicios</Link>
            <Link href={`/website/${params.slug}/reserva`} className="text-xs text-site-muted hover:text-site-text transition-colors">Reserva</Link>
            <Link href="/login" className="text-xs text-site-border hover:text-site-muted transition-colors">Acceso taller</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
