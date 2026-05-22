import Link from 'next/link';
import { getWorkshopBySlug } from '@/server/reservas';
import { ScrollReveal } from '@/components/website/ScrollReveal';

interface PageProps {
  params: { slug: string };
}

const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

const IconPhone = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
);

const allServices = [
  {
    cat: 'Mantenimiento',
    items: [
      { name: 'Cambio de aceite y filtros', desc: 'Aceite sintético + filtros de aceite, aire y habitáculo. Revisión de niveles incluida.', price: 'Desde 49€' },
      { name: 'Pre-ITV completa', desc: 'Revisión de todos los puntos que comprueba la estación ITV. Acompañamiento opcional.', price: '25€' },
      { name: 'Batería', desc: 'Test de batería y alternador. Suministro e instalación con garantía de fábrica.', price: 'Desde 80€' },
    ],
  },
  {
    cat: 'Seguridad',
    items: [
      { name: 'Frenos y pastillas', desc: 'Revisión completa del sistema de frenado. Cambio de pastillas, discos y líquido.', price: 'Desde 89€' },
      { name: 'Suspensión', desc: 'Revisión y cambio de amortiguadores, muelles y silentblocks.', price: 'Desde 120€' },
      { name: 'Neumáticos', desc: 'Cambio, equilibrado y alineación. Todas las marcas disponibles.', price: 'Desde 15€/ud' },
    ],
  },
  {
    cat: 'Motor y mecánica',
    items: [
      { name: 'Kit de distribución', desc: 'Cambio completo del kit de distribución con bomba de agua. Trabajo de precisión.', price: 'Desde 350€' },
      { name: 'Embrague', desc: 'Sustitución del kit de embrague. Volante motor bimasa si es necesario.', price: 'Desde 450€' },
      { name: 'Sistema de escape', desc: 'Reparación y sustitución del sistema de escape. Soldadura incluida.', price: 'Desde 95€' },
    ],
  },
  {
    cat: 'Electrónica',
    items: [
      { name: 'Diagnosis electrónica', desc: 'Lectura de códigos de error con equipo profesional. Informe detallado entregado al cliente.', price: '35€' },
      { name: 'Aire acondicionado', desc: 'Recarga de gas refrigerante, revisión de fugas y limpieza del sistema.', price: 'Desde 59€' },
      { name: 'Sistema eléctrico', desc: 'Reparación de instalación eléctrica, luces, fusibles y alternador.', price: 'Consultar' },
    ],
  },
];

export default async function ServiciosPage({ params }: PageProps) {
  const workshop = await getWorkshopBySlug(params.slug);
  const servicesByCategory = workshop.services.reduce<
    Array<{
      cat: string;
      items: Array<{ name: string; desc: string; price: string }>;
    }>
  >((groups, service) => {
    const category = service.category || 'General';
    const group = groups.find((item) => item.cat === category);
    const mappedService = {
      name: service.name,
      desc: service.description,
      price: service.price,
    };

    if (group) {
      group.items.push(mappedService);
    } else {
      groups.push({ cat: category, items: [mappedService] });
    }

    return groups;
  }, []);

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
            <Link href={`/website/${params.slug}/contacto`} className="text-sm text-site-muted hover:text-site-text transition-colors">Contacto</Link>
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
          <p className="site-hero-animate text-xs font-semibold text-site-accent uppercase tracking-[0.18em] mb-4">Servicios</p>
          <h1 className="site-hero-animate site-hero-animate-delay-1 font-bold text-site-text leading-tight max-w-[14ch]"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
            Todo lo que necesita tu vehículo.
          </h1>
          <p className="site-hero-animate site-hero-animate-delay-2 mt-6 text-site-muted leading-relaxed max-w-[52ch]">
            Presupuesto previo sin compromiso en todos los trabajos.
            Si no hay acuerdo, no empezamos — así de simple.
          </p>
        </div>
      </section>

      {/* ── SERVICIOS POR CATEGORÍA ─────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="space-y-0">
            {servicesByCategory.map((cat, ci) => (
              <div key={cat.cat} className="border-b border-site-border last:border-b-0 py-12">
                <ScrollReveal>
                  <p className="text-xs font-semibold text-site-accent uppercase tracking-[0.18em] mb-8">{cat.cat}</p>
                </ScrollReveal>
                <div className="grid md:grid-cols-3 gap-x-12 gap-y-0">
                  {cat.items.map((s, i) => (
                    <ScrollReveal key={s.name} delay={i * 80 + ci * 30}>
                      <div className="border-t border-site-border py-7 pr-4">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h3 className="font-semibold text-site-text text-base leading-tight">{s.name}</h3>
                          <span className="text-sm font-bold text-site-accent tabular-nums whitespace-nowrap">{s.price}</span>
                        </div>
                        <p className="text-sm text-site-muted leading-relaxed">{s.desc}</p>
                        <Link
                          href={`/website/${params.slug}/reserva`}
                          className="inline-flex items-center gap-1.5 mt-5 text-xs font-semibold text-site-accent border-b border-site-accent/40 pb-0.5 hover:border-site-accent transition-colors"
                        >
                          Solicitar cita <IconArrow />
                        </Link>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section className="py-20 bg-site-surface border-t border-site-border">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <ScrollReveal>
            <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <h2 className="font-bold text-site-text leading-tight mb-3"
                    style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
                  No encuentras lo que buscas?
                </h2>
                <p className="text-site-muted leading-relaxed">
                  Llámanos y te asesoramos sin compromiso. Si lo podemos hacer, te decimos cuánto y cuándo.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row md:flex-col gap-3">
                <a href={`tel:${workshop.phone.replace(/\s/g, '')}`}
                   className="inline-flex items-center justify-center gap-2 bg-site-text text-site-bg font-semibold px-6 py-4 hover:bg-site-accent transition-colors">
                  <IconPhone /> {workshop.phone}
                </a>
                <Link href={`/website/${params.slug}/reserva`}
                      className="inline-flex items-center justify-center gap-2 border border-site-text text-site-text font-semibold px-6 py-4 hover:bg-site-surface transition-colors">
                  Reservar cita online
                </Link>
              </div>
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
            <Link href={`/website/${params.slug}/contacto`} className="text-xs text-site-muted hover:text-site-text transition-colors">Contacto</Link>
            <Link href={`/website/${params.slug}/reserva`} className="text-xs text-site-muted hover:text-site-text transition-colors">Reserva</Link>
            <Link href="/login" className="text-xs text-site-border hover:text-site-muted transition-colors">Acceso taller</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
