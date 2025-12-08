import Link from 'next/link';
import { getWorkshopBySlug } from '@/server/reservas';

interface PageProps {
  params: { slug: string };
}

export default async function LandingPage({ params }: PageProps) {
  const workshop = await getWorkshopBySlug(params.slug);

  return (
    <div className="min-h-screen bg-mr-bg">
      {/* Header */}
      <header className="border-b border-mr-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-mr-accent flex items-center justify-center">
              <span className="text-mr-bg font-bold text-xl">M</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-mr-accent tracking-wider">{workshop.name}</h1>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href={`/website/${params.slug}/servicios`} className="text-mr-text/80 hover:text-mr-accent transition-colors uppercase text-sm tracking-wide">
              Servicios
            </Link>
            <Link href={`/website/${params.slug}/contacto`} className="text-mr-text/80 hover:text-mr-accent transition-colors uppercase text-sm tracking-wide">
              Contacto
            </Link>
            <Link href={`/website/${params.slug}/reserva`} className="btn-accent text-sm">
              Reservar Cita
            </Link>
          </nav>
          {/* Mobile menu button */}
          <Link href={`/website/${params.slug}/reserva`} className="md:hidden btn-accent text-sm">
            Reservar
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-mr-accent mb-6">
            <span className="text-mr-bg font-bold text-4xl">M</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-mr-text mb-4 uppercase tracking-wider">
            {workshop.name}
          </h2>
          <p className="text-xl text-mr-text/70 max-w-2xl mx-auto mb-8">
            {workshop.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={`/website/${params.slug}/reserva`} className="btn-accent text-lg px-8 py-4 w-full sm:w-auto">
              📅 Reservar Cita
            </Link>
            <a 
              href={`https://wa.me/${workshop.whatsapp}?text=Hola, me gustaría información sobre vuestros servicios`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-lg px-8 py-4 w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 px-4 bg-mr-primary/20">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-mr-accent uppercase tracking-wider text-center mb-8">
            Nuestros Servicios
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workshop.services.slice(0, 6).map((service, i) => (
              <div key={i} className="card-industrial">
                <h4 className="font-bold text-mr-text mb-2">{service.name}</h4>
                <p className="text-sm text-mr-text/60 mb-3">{service.description}</p>
                <p className="text-mr-accent font-bold">{service.price}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href={`/website/${params.slug}/servicios`} className="btn-primary">
              Ver Todos los Servicios
            </Link>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="card-industrial text-center">
            <div className="w-12 h-12 bg-mr-accent mx-auto mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-mr-bg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="square" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h4 className="font-bold text-mr-text mb-2 uppercase">Ubicación</h4>
            <p className="text-sm text-mr-text/60">{workshop.address}</p>
          </div>
          <div className="card-industrial text-center">
            <div className="w-12 h-12 bg-mr-accent mx-auto mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-mr-bg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="font-bold text-mr-text mb-2 uppercase">Horario</h4>
            <p className="text-sm text-mr-text/60">{workshop.hours}</p>
          </div>
          <div className="card-industrial text-center">
            <div className="w-12 h-12 bg-mr-accent mx-auto mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-mr-bg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h4 className="font-bold text-mr-text mb-2 uppercase">Teléfono</h4>
            <p className="text-sm text-mr-text/60">{workshop.phone}</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-mr-accent">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-mr-bg uppercase tracking-wider mb-4">
            ¿Necesitas una Reparación?
          </h3>
          <p className="text-mr-bg/80 mb-8">
            Reserva tu cita online y te atendemos lo antes posible
          </p>
          <Link href={`/website/${params.slug}/reserva`} className="inline-block bg-mr-bg text-mr-accent font-bold uppercase tracking-wide px-8 py-4 hover:bg-mr-primary transition-colors">
            Reservar Ahora
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-mr-border">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-mr-text/50">
            © 2024 {workshop.name}. Todos los derechos reservados.
          </p>
          <p className="text-xs text-mr-text/30 mt-2">
            Powered by MecaRapidOne
          </p>
        </div>
      </footer>
    </div>
  );
}
