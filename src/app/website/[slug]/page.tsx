import Image from 'next/image';
import Link from 'next/link';
import { getWorkshopBySlug } from '@/server/reservas';
import { ScrollReveal } from '@/components/website/ScrollReveal';

interface PageProps {
  params: { slug: string };
}

const IconArrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const IconPhone = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6.02-6.02A19.79 19.79 0 0 1 2.1 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.64 2.63a2 2 0 0 1-.45 2.11L8.03 9.73a16 16 0 0 0 6.24 6.24l1.27-1.27a2 2 0 0 1 2.11-.45c.85.31 1.73.52 2.63.64A2 2 0 0 1 22 16.92z" />
  </svg>
);

const IconCheck = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconClock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconMap = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const trustPoints = [
  'Presupuesto antes de reparar',
  'Diagnosis con criterio tecnico',
  'Confirmacion rapida por telefono',
];

const process = [
  {
    step: '01',
    title: 'Reserva online',
    desc: 'Indicas vehiculo, averia y fecha preferida. El taller recibe la solicitud ordenada.',
  },
  {
    step: '02',
    title: 'Confirmacion',
    desc: 'Te llaman o escriben para cerrar hora, prioridad y primeras comprobaciones.',
  },
  {
    step: '03',
    title: 'Diagnosis',
    desc: 'Antes de reparar se revisa la causa y se comunica el alcance del trabajo.',
  },
  {
    step: '04',
    title: 'Entrega',
    desc: 'Recoges el coche con explicacion clara, garantia y siguientes cuidados.',
  },
];

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

export default async function LandingPage({ params }: PageProps) {
  const workshop = await getWorkshopBySlug(params.slug);
  const featuredServices = workshop.services.slice(0, 6);
  const phoneHref = `tel:${workshop.phone.replace(/\s/g, '')}`;
  const whatsappHref = `https://wa.me/${workshop.whatsapp}?text=Hola, quiero reservar cita para mi vehiculo`;
  const logoText = initials(workshop.name);

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-site-bg text-site-text">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-site-text/10 bg-site-bg/82 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 md:px-8">
          <Link href={`/website/${params.slug}`} className="flex min-w-0 items-center gap-3" aria-label={`Inicio ${workshop.name}`}>
            {workshop.logoUrl ? (
              <span className="relative h-11 w-11 overflow-hidden rounded-md border border-site-border bg-site-surface">
                <Image src={workshop.logoUrl} alt={workshop.name} fill sizes="44px" className="object-contain p-1.5" />
              </span>
            ) : (
              <span className="grid h-11 w-11 place-items-center rounded-md border border-site-text/25 bg-site-surface text-sm font-black text-site-accent">
                {logoText}
              </span>
            )}
            <span className="min-w-0">
              <span className="block truncate text-sm font-black tracking-tight text-site-text md:text-base">{workshop.name}</span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-site-muted">Taller mecanico</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="#servicios" className="text-sm font-bold text-site-muted transition-colors hover:text-site-text">Servicios</a>
            <a href="#metodo" className="text-sm font-bold text-site-muted transition-colors hover:text-site-text">Metodo</a>
            <Link href={`/website/${params.slug}/contacto`} className="text-sm font-bold text-site-muted transition-colors hover:text-site-text">Contacto</Link>
          </nav>

          <div className="flex items-center gap-2">
            <a href={phoneHref} className="hidden h-11 items-center gap-2 rounded-md border border-site-border px-4 text-xs font-black uppercase tracking-[0.12em] text-site-text transition-colors hover:border-site-accent hover:text-site-accent sm:inline-flex">
              <IconPhone />
              Llamar
            </a>
            <Link href={`/website/${params.slug}/reserva`} className="inline-flex h-11 items-center justify-center rounded-md bg-site-accent px-4 text-xs font-black uppercase tracking-[0.12em] text-site-bg transition-colors hover:bg-site-text md:px-5">
              Reservar cita
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative isolate overflow-hidden border-b border-site-border pt-20">
          <div className="absolute inset-0">
            <Image
              src={workshop.heroImageUrl}
              alt={`Taller mecanico ${workshop.name}`}
              fill
              priority
              sizes="100vw"
              className="object-cover object-[58%_50%]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,9,9,0.95)_0%,rgba(7,9,9,0.72)_45%,rgba(7,9,9,0.34)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,9,9,0.12)_0%,rgba(7,9,9,0.24)_48%,#070909_100%)]" />
          </div>

          <div className="relative mx-auto grid max-w-[1440px] gap-10 px-5 py-12 md:min-h-[calc(82dvh-5rem)] md:grid-cols-[minmax(0,1fr)_390px] md:items-end md:px-8 md:py-16">
            <div className="max-w-4xl">
              <p className="site-hero-animate mb-5 text-xs font-black uppercase tracking-[0.24em] text-site-accent">
                Reserva online para taller mecanico
              </p>
              <h1 className="site-hero-animate site-hero-animate-delay-1 font-display text-[3.25rem] font-black leading-[0.9] text-site-text sm:text-[4.4rem] md:text-[5.8rem] xl:text-[6.8rem]">
                Cuidamos tu coche con criterio de taller.
              </h1>
              <p className="site-hero-animate site-hero-animate-delay-2 mt-7 max-w-2xl text-base font-semibold leading-8 text-site-text/86 md:text-lg">
                {workshop.description} Pide cita online, recibe confirmacion del taller y decide con presupuesto previo antes de reparar.
              </p>

              <div className="site-hero-animate site-hero-animate-delay-3 mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href={`/website/${params.slug}/reserva`} className="inline-flex h-14 items-center justify-center gap-3 rounded-md bg-site-accent px-7 text-sm font-black uppercase tracking-[0.12em] text-site-bg transition-colors hover:bg-site-text">
                  Reservar cita online
                  <IconArrow />
                </Link>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex h-14 items-center justify-center rounded-md border border-site-text/30 bg-site-bg/28 px-7 text-sm font-black uppercase tracking-[0.12em] text-site-text backdrop-blur transition-colors hover:border-site-accent hover:text-site-accent">
                  WhatsApp
                </a>
              </div>

            </div>

            <aside className="site-hero-animate site-hero-animate-delay-3 hidden rounded-md border border-site-text/12 bg-site-bg/72 p-5 backdrop-blur-xl md:block md:p-6">
              <p className="mb-5 text-xs font-black uppercase tracking-[0.22em] text-site-accent">Contacto directo</p>
              <div className="space-y-5">
                <a href={phoneHref} className="flex items-center justify-between border-b border-site-border pb-4 text-site-text transition-colors hover:text-site-accent">
                  <span>
                    <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-site-muted">Telefono</span>
                    <span className="mt-1 block text-lg font-black">{workshop.phone}</span>
                  </span>
                  <IconPhone />
                </a>
                <div className="flex gap-3 border-b border-site-border pb-4">
                  <span className="mt-1 text-site-accent"><IconClock /></span>
                  <p className="text-sm font-semibold leading-6 text-site-text/82">{workshop.hours}</p>
                </div>
                <div className="flex gap-3">
                  <span className="mt-1 text-site-accent"><IconMap /></span>
                  <p className="text-sm font-semibold leading-6 text-site-text/82">{workshop.address}</p>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="border-b border-site-border bg-site-bg">
          <div className="mx-auto grid max-w-[1440px] gap-px bg-site-border px-5 md:grid-cols-3 md:px-8">
            {trustPoints.map((item) => (
              <div key={item} className="flex min-h-20 items-center gap-4 bg-site-bg py-6 md:py-8">
                <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-md bg-site-accent text-site-bg">
                  <IconCheck />
                </span>
                <span className="text-sm font-black uppercase leading-6 tracking-[0.12em] text-site-text">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="servicios" className="border-b border-site-border py-20 md:py-28">
          <div className="mx-auto max-w-[1440px] px-5 md:px-8">
            <ScrollReveal>
              <div className="mb-12 grid gap-6 md:grid-cols-[0.82fr_1fr] md:items-end">
                <div>
                  <p className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-site-accent">Servicios principales</p>
                  <h2 className="font-display text-4xl font-black leading-[0.95] text-site-text sm:text-5xl md:text-6xl">
                    Lo que mas reserva un cliente de taller.
                  </h2>
                </div>
                <p className="max-w-2xl text-base font-semibold leading-8 text-site-muted md:text-lg">
                  Servicios claros, precio orientativo y llamada a reserva en cada trabajo. La lista se alimenta de los servicios activos del taller.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid gap-px bg-site-border md:grid-cols-2 lg:grid-cols-3">
              {featuredServices.map((service, index) => (
                <ScrollReveal key={`${service.category}-${service.name}`} delay={index * 60}>
                  <Link href={`/website/${params.slug}/reserva`} className="group flex min-h-[250px] flex-col justify-between bg-site-surface p-6 transition-colors hover:bg-site-bg md:p-7">
                    <div>
                      <div className="mb-8 flex items-center justify-between gap-4">
                        <span className="rounded-md border border-site-border px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-site-muted">
                          {service.category}
                        </span>
                        <span className="text-xs font-black text-site-accent">{String(index + 1).padStart(2, '0')}</span>
                      </div>
                      <h3 className="font-display text-3xl font-black leading-tight text-site-text transition-colors group-hover:text-site-accent">{service.name}</h3>
                      <p className="mt-4 text-sm font-semibold leading-7 text-site-muted">{service.description}</p>
                    </div>
                    <div className="mt-8 flex items-center justify-between gap-4 border-t border-site-border pt-5">
                      <span className="text-sm font-black text-site-text">{service.price}</span>
                      <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-site-accent">
                        Reservar
                        <IconArrow />
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal>
              <div className="mt-8 flex justify-start">
                <Link href={`/website/${params.slug}/servicios`} className="inline-flex h-12 items-center justify-center gap-3 rounded-md border border-site-border px-5 text-xs font-black uppercase tracking-[0.14em] text-site-text transition-colors hover:border-site-accent hover:text-site-accent">
                  Ver todos los servicios
                  <IconArrow />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section id="metodo" className="border-b border-site-border bg-site-surface py-20 md:py-28">
          <div className="mx-auto max-w-[1440px] px-5 md:px-8">
            <ScrollReveal>
              <div className="mb-12 max-w-4xl">
                <p className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-site-accent">Como trabajamos</p>
                <h2 className="font-display text-4xl font-black leading-[0.95] text-site-text sm:text-5xl md:text-6xl">
                  De la reserva a la entrega, sin incertidumbre.
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid gap-px bg-site-border md:grid-cols-4">
              {process.map((item, index) => (
                <ScrollReveal key={item.step} delay={index * 80}>
                  <div className="min-h-[280px] bg-site-surface p-6 md:p-7">
                    <p className="mb-10 font-display text-5xl font-black text-site-accent/42">{item.step}</p>
                    <h3 className="mb-4 font-display text-2xl font-black text-site-text">{item.title}</h3>
                    <p className="text-sm font-semibold leading-7 text-site-muted">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden py-20 md:py-28">
          <div className="absolute inset-y-0 right-0 hidden w-1/2 md:block">
            <Image src={workshop.heroImageUrl} alt="" fill sizes="50vw" className="object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#070909_0%,rgba(7,9,9,0.74)_48%,rgba(7,9,9,0.92)_100%)]" />
          </div>

          <div className="relative mx-auto grid max-w-[1440px] gap-10 px-5 md:grid-cols-[minmax(0,1fr)_430px] md:items-center md:px-8">
            <ScrollReveal>
              <div>
                <p className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-site-accent">Reserva online</p>
                <h2 className="font-display text-4xl font-black leading-[0.95] text-site-text sm:text-5xl md:text-6xl">
                  Pide cita ahora y el taller te confirma el hueco.
                </h2>
                <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-site-muted md:text-lg">
                  Cuéntanos la averia, la matricula y tu fecha preferida. La solicitud entra separada por taller y queda lista para gestionarse en MecaRapid.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="rounded-md border border-site-border bg-site-surface p-6 md:p-7">
                <div className="space-y-4">
                  <Link href={`/website/${params.slug}/reserva`} className="group flex items-center justify-between rounded-md bg-site-accent px-5 py-4 text-site-bg transition-colors hover:bg-site-text">
                    <span>
                      <span className="block text-[11px] font-black uppercase tracking-[0.18em] opacity-70">Formulario online</span>
                      <span className="mt-1 block text-lg font-black">Reservar cita</span>
                    </span>
                    <IconArrow />
                  </Link>
                  <a href={phoneHref} className="flex items-center justify-between rounded-md border border-site-border px-5 py-4 text-site-text transition-colors hover:border-site-accent hover:text-site-accent">
                    <span>
                      <span className="block text-[11px] font-black uppercase tracking-[0.18em] text-site-muted">Telefono</span>
                      <span className="mt-1 block text-lg font-black">{workshop.phone}</span>
                    </span>
                    <IconPhone />
                  </a>
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-md border border-site-border px-5 py-4 text-site-text transition-colors hover:border-site-accent hover:text-site-accent">
                    <span>
                      <span className="block text-[11px] font-black uppercase tracking-[0.18em] text-site-muted">WhatsApp</span>
                      <span className="mt-1 block text-lg font-black">Enviar mensaje</span>
                    </span>
                    <IconArrow />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-site-border bg-site-surface px-5 pb-24 pt-12 md:px-8 md:pb-10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-lg font-black text-site-text">{workshop.name}</p>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-7 text-site-muted">{workshop.address}</p>
            <p className="mt-1 text-sm font-semibold leading-7 text-site-muted">{workshop.hours}</p>
          </div>
          <div className="flex flex-wrap gap-5 text-xs font-black uppercase tracking-[0.14em] text-site-muted">
            <Link href={`/website/${params.slug}/servicios`} className="hover:text-site-accent">Servicios</Link>
            <Link href={`/website/${params.slug}/reserva`} className="hover:text-site-accent">Reserva</Link>
            <Link href={`/website/${params.slug}/contacto`} className="hover:text-site-accent">Contacto</Link>
            <Link href="/login" className="hover:text-site-accent">Acceso taller</Link>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-[1440px] border-t border-site-border pt-5 text-xs font-semibold text-site-muted">
          © {new Date().getFullYear()} {workshop.name}. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
