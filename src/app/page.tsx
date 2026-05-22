import Link from 'next/link';

// ── Icons ────────────────────────────────────────────────────────────────────
const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);
const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconWorkOrder = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
  </svg>
);
const IconCar = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-4h8l2 4h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" /><circle cx="7.5" cy="17" r="2.5" /><circle cx="16.5" cy="17" r="2.5" />
  </svg>
);
const IconUsers = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IconStatus = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);
const IconBooking = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const IconWebsite = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

// ── Data ──────────────────────────────────────────────────────────────────────
const features = [
  {
    icon: <IconWorkOrder />,
    title: 'Órdenes de trabajo',
    desc: 'Crea, asigna y actualiza órdenes en tiempo real. Historial completo por vehículo.',
  },
  {
    icon: <IconCar />,
    title: 'Ficha de vehículo',
    desc: 'Matrícula, marca, modelo, kilometraje y todas las intervenciones anteriores.',
  },
  {
    icon: <IconBooking />,
    title: 'Reservas online',
    desc: 'Tu cliente reserva desde la web. La cita entra directo en el panel del taller.',
  },
  {
    icon: <IconWebsite />,
    title: 'Web de taller incluida',
    desc: 'Página pública profesional con servicios, precios y formulario. Sin coste extra.',
  },
  {
    icon: <IconUsers />,
    title: 'Roles y permisos',
    desc: 'Admin, propietario, recepcionista, mecánico. Cada rol ve solo lo que necesita.',
  },
  {
    icon: <IconStatus />,
    title: 'Estados en tiempo real',
    desc: 'De "Pendiente" a "Entregado" con un clic. El equipo siempre sincronizado.',
  },
];

const steps = [
  { n: '01', title: 'Crea tu taller', desc: 'Registro en menos de 2 minutos. Configuras nombre, servicios y horarios.' },
  { n: '02', title: 'Gestiona desde el panel', desc: 'Órdenes, vehículos y reservas centralizados. Acceso desde cualquier dispositivo.' },
  { n: '03', title: 'Tus clientes reservan online', desc: 'Tu web de taller publicada automáticamente. Los clientes reservan, tú confirmas.' },
];

const plans = [
  {
    name: 'Starter',
    price: '0',
    period: '/ mes',
    desc: 'Para empezar sin riesgo.',
    features: ['1 taller', 'Hasta 50 órdenes/mes', 'Web de taller incluida', 'Reservas online'],
    cta: 'Empezar gratis',
    accent: false,
  },
  {
    name: 'Pro',
    price: '39',
    period: '/ mes',
    desc: 'Para talleres en crecimiento.',
    features: ['Talleres ilimitados', 'Órdenes ilimitadas', 'Roles y permisos avanzados', 'Soporte prioritario', 'Estadísticas y reportes'],
    cta: 'Empezar prueba gratis',
    accent: true,
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="min-h-[100dvh] overflow-x-hidden" style={{ background: '#070909', color: '#F4F1EA', fontFamily: 'var(--font-jakarta), sans-serif' }}>

      {/* ── Navbar ─────────────────────────────────────────────────────── */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 backdrop-blur-xl" style={{ background: 'rgba(7,9,9,0.85)' }}>
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 md:px-8">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-md text-[#070909] font-black text-sm" style={{ background: '#61D398' }}>M</span>
            <span style={{ fontFamily: 'var(--font-oswald)', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.08em', color: '#F4F1EA' }}>
              MECARAPID
            </span>
          </div>
          <nav className="hidden items-center gap-8 md:flex">
            {['Funciones', 'Cómo funciona', 'Precios'].map((item, i) => (
              <a key={item} href={`#${['features', 'how', 'pricing'][i]}`} className="text-sm font-semibold transition-colors" style={{ color: '#9B9990' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#F4F1EA')}
                onMouseLeave={e => (e.currentTarget.style.color = '#9B9990')}>
                {item}
              </a>
            ))}
          </nav>
          <Link href="/login" className="inline-flex h-10 items-center gap-2 rounded-md px-4 text-sm font-bold transition-colors" style={{ background: '#61D398', color: '#070909' }}>
            Acceder al taller
            <IconArrow />
          </Link>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[100dvh] flex-col items-start justify-center overflow-hidden pt-[72px]">
        {/* Grid background */}
        <div className="pointer-events-none absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(97,211,152,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(97,211,152,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        {/* Glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #61D398 0%, transparent 70%)' }} />

        <div className="relative mx-auto w-full max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <p className="land-hero-1 mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em]"
            style={{ borderColor: 'rgba(97,211,152,0.3)', color: '#61D398', background: 'rgba(97,211,152,0.06)' }}>
            Software para talleres mecánicos
          </p>

          <h1 className="land-hero-2 max-w-5xl" style={{ fontFamily: 'var(--font-oswald)', fontWeight: 700, lineHeight: 0.9, fontSize: 'clamp(3.5rem, 9vw, 8.5rem)', letterSpacing: '-0.01em', color: '#F4F1EA' }}>
            EL SISTEMA<br />
            QUE GESTIONA<br />
            <span style={{ color: '#61D398' }}>TU TALLER.</span>
          </h1>

          <p className="land-hero-3 mt-8 max-w-xl text-base font-semibold leading-8 md:text-lg" style={{ color: 'rgba(244,241,234,0.7)' }}>
            Órdenes de trabajo, vehículos, reservas online y web de taller —
            todo en un solo panel. Pensado para mecánicos, no para informáticos.
          </p>

          <div className="land-hero-4 mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/login" className="inline-flex h-14 items-center justify-center gap-3 rounded-md px-7 text-sm font-black uppercase tracking-[0.12em] transition-colors" style={{ background: '#61D398', color: '#070909' }}>
              Acceder gratis
              <IconArrow />
            </Link>
            <a href="#features" className="inline-flex h-14 items-center justify-center rounded-md border px-7 text-sm font-black uppercase tracking-[0.12em] transition-colors" style={{ borderColor: 'rgba(244,241,234,0.2)', color: '#F4F1EA' }}>
              Ver funciones
            </a>
          </div>

          {/* Stats */}
          <div className="land-hero-4 mt-16 grid grid-cols-3 gap-px border-t pt-10 md:w-2/3" style={{ borderColor: 'rgba(244,241,234,0.1)' }}>
            {[['100%', 'Gratis para empezar'], ['+6', 'Módulos integrados'], ['1 panel', 'Todo centralizado']].map(([val, label]) => (
              <div key={label} className="pr-6">
                <p style={{ fontFamily: 'var(--font-oswald)', fontSize: '2rem', fontWeight: 700, color: '#61D398', lineHeight: 1 }}>{val}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: '#9B9990' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────────────────── */}
      <section id="features" className="border-t py-20 md:py-28" style={{ borderColor: 'rgba(244,241,234,0.08)' }}>
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-14 grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
            <div>
              <p className="mb-4 text-xs font-black uppercase tracking-[0.24em]" style={{ color: '#61D398' }}>Funciones</p>
              <h2 style={{ fontFamily: 'var(--font-oswald)', fontWeight: 700, fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', lineHeight: 0.95, color: '#F4F1EA' }}>
                TODO LO QUE<br />NECESITA UN TALLER.
              </h2>
            </div>
            <p className="text-base font-semibold leading-8 md:text-lg" style={{ color: '#9B9990' }}>
              Sin módulos de pago extra, sin formaciones de días. Entra, configura
              tu taller y gestiona desde el primer minuto.
            </p>
          </div>

          <div className="grid gap-px md:grid-cols-2 lg:grid-cols-3" style={{ background: 'rgba(244,241,234,0.06)' }}>
            {features.map((f) => (
              <div key={f.title} className="group flex flex-col gap-5 p-7 transition-colors" style={{ background: '#070909' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#0f1513')}
                onMouseLeave={e => (e.currentTarget.style.background = '#070909')}>
                <span style={{ color: '#61D398' }}>{f.icon}</span>
                <div>
                  <h3 className="mb-2 font-black" style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: '1.2rem', color: '#F4F1EA' }}>{f.title}</h3>
                  <p className="text-sm font-semibold leading-7" style={{ color: '#9B9990' }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────────────────── */}
      <section id="how" className="border-t py-20 md:py-28" style={{ borderColor: 'rgba(244,241,234,0.08)', background: '#0a0d0c' }}>
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-14">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.24em]" style={{ color: '#61D398' }}>Cómo funciona</p>
            <h2 style={{ fontFamily: 'var(--font-oswald)', fontWeight: 700, fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', lineHeight: 0.95, color: '#F4F1EA' }}>
              EN TRES PASOS,<br />LISTO PARA TRABAJAR.
            </h2>
          </div>

          <div className="grid gap-px md:grid-cols-3" style={{ background: 'rgba(244,241,234,0.06)' }}>
            {steps.map((s) => (
              <div key={s.n} className="min-h-[260px] p-7 md:p-9" style={{ background: '#0a0d0c' }}>
                <p className="mb-8" style={{ fontFamily: 'var(--font-oswald)', fontSize: '3.5rem', fontWeight: 700, color: 'rgba(97,211,152,0.25)', lineHeight: 1 }}>{s.n}</p>
                <h3 className="mb-3 font-black" style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: '1.3rem', color: '#F4F1EA' }}>{s.title}</h3>
                <p className="text-sm font-semibold leading-7" style={{ color: '#9B9990' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ────────────────────────────────────────────────────── */}
      <section id="pricing" className="border-t py-20 md:py-28" style={{ borderColor: 'rgba(244,241,234,0.08)' }}>
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-14 text-center">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.24em]" style={{ color: '#61D398' }}>Precios</p>
            <h2 style={{ fontFamily: 'var(--font-oswald)', fontWeight: 700, fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', lineHeight: 0.95, color: '#F4F1EA' }}>
              SIMPLE Y HONESTO.
            </h2>
          </div>

          <div className="mx-auto grid max-w-3xl gap-px md:grid-cols-2" style={{ background: 'rgba(244,241,234,0.06)' }}>
            {plans.map((plan) => (
              <div key={plan.name} className="flex flex-col p-8 md:p-10" style={{ background: plan.accent ? '#0f1513' : '#070909' }}>
                {plan.accent && (
                  <span className="mb-4 inline-flex w-fit rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.16em]" style={{ background: 'rgba(97,211,152,0.12)', color: '#61D398' }}>
                    Recomendado
                  </span>
                )}
                <p className="text-sm font-black uppercase tracking-[0.16em]" style={{ color: '#9B9990' }}>{plan.name}</p>
                <div className="my-4 flex items-end gap-1">
                  <span style={{ fontFamily: 'var(--font-oswald)', fontSize: '3.5rem', fontWeight: 700, lineHeight: 1, color: '#F4F1EA' }}>{plan.price === '0' ? 'Gratis' : `${plan.price}€`}</span>
                  {plan.price !== '0' && <span className="mb-2 text-sm font-semibold" style={{ color: '#9B9990' }}>{plan.period}</span>}
                </div>
                <p className="mb-6 text-sm font-semibold" style={{ color: '#9B9990' }}>{plan.desc}</p>
                <ul className="mb-8 flex-1 space-y-3">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-3 text-sm font-semibold" style={{ color: '#F4F1EA' }}>
                      <span style={{ color: '#61D398', flexShrink: 0 }}><IconCheck /></span>
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link href="/login" className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md text-sm font-black uppercase tracking-[0.1em] transition-colors"
                  style={{ background: plan.accent ? '#61D398' : 'transparent', color: plan.accent ? '#070909' : '#F4F1EA', border: plan.accent ? 'none' : '1px solid rgba(244,241,234,0.2)' }}>
                  {plan.cta}
                  <IconArrow />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA final ──────────────────────────────────────────────────── */}
      <section className="border-t py-20 md:py-32" style={{ borderColor: 'rgba(244,241,234,0.08)', background: '#0a0d0c' }}>
        <div className="mx-auto max-w-7xl px-5 text-center md:px-8">
          <h2 className="mx-auto max-w-4xl" style={{ fontFamily: 'var(--font-oswald)', fontWeight: 700, fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', lineHeight: 0.95, color: '#F4F1EA' }}>
            TU TALLER MERECE<br />
            <span style={{ color: '#61D398' }}>GESTIÓN PROFESIONAL.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-lg text-base font-semibold leading-8" style={{ color: 'rgba(244,241,234,0.6)' }}>
            Entra ahora, configura tu taller en minutos y empieza a gestionar órdenes hoy mismo. Sin tarjeta de crédito.
          </p>
          <Link href="/login" className="mt-10 inline-flex h-16 items-center gap-3 rounded-md px-10 text-base font-black uppercase tracking-[0.12em] transition-colors"
            style={{ background: '#61D398', color: '#070909' }}>
            Empezar ahora — es gratis
            <IconArrow />
          </Link>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="border-t px-5 pb-10 pt-12 md:px-8" style={{ borderColor: 'rgba(244,241,234,0.08)', background: '#070909' }}>
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-md text-[#070909] font-black text-xs" style={{ background: '#61D398' }}>M</span>
            <span style={{ fontFamily: 'var(--font-oswald)', fontWeight: 700, letterSpacing: '0.08em', color: '#F4F1EA' }}>MECARAPID</span>
          </div>
          <div className="flex flex-wrap gap-6 text-xs font-bold uppercase tracking-[0.14em]" style={{ color: '#9B9990' }}>
            <a href="#features">Funciones</a>
            <a href="#how">Cómo funciona</a>
            <a href="#pricing">Precios</a>
            <Link href="/login">Acceder</Link>
          </div>
          <p className="text-xs font-semibold" style={{ color: '#9B9990' }}>© {new Date().getFullYear()} MecaRapid. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

