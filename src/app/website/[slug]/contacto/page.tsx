import Link from 'next/link';
import { getWorkshopBySlug } from '@/server/reservas';

interface PageProps {
  params: { slug: string };
}

export default async function ContactoPage({ params }: PageProps) {
  const workshop = await getWorkshopBySlug(params.slug);

  return (
    <div className="min-h-screen bg-mr-bg">
      {/* Header */}
      <header className="border-b border-mr-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={`/website/${params.slug}`} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-mr-accent flex items-center justify-center">
              <span className="text-mr-bg font-bold text-xl">M</span>
            </div>
            <span className="text-lg font-bold text-mr-accent tracking-wider">{workshop.name}</span>
          </Link>
          <Link href={`/website/${params.slug}/reserva`} className="btn-accent text-sm">
            Reservar Cita
          </Link>
        </div>
      </header>

      {/* Contact Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-mr-accent uppercase tracking-wider mb-8 text-center">
            Contacto
          </h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              {/* WhatsApp - Primary */}
              <a 
                href={`https://wa.me/${workshop.whatsapp}?text=Hola, me gustaría información sobre vuestros servicios`}
                target="_blank"
                rel="noopener noreferrer"
                className="card-industrial flex items-center gap-4 hover:border-green-500 transition-colors group"
              >
                <div className="w-14 h-14 bg-green-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-mr-text/60 uppercase tracking-wide">WhatsApp</p>
                  <p className="text-lg font-bold text-mr-text group-hover:text-green-400 transition-colors">
                    Enviar Mensaje
                  </p>
                  <p className="text-sm text-mr-text/50">Respuesta rápida</p>
                </div>
              </a>

              {/* Phone */}
              <a 
                href={`tel:${workshop.phone.replace(/\s/g, '')}`}
                className="card-industrial flex items-center gap-4 hover:border-mr-accent transition-colors group"
              >
                <div className="w-14 h-14 bg-mr-accent flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-mr-bg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-mr-text/60 uppercase tracking-wide">Teléfono</p>
                  <p className="text-lg font-bold text-mr-text group-hover:text-mr-accent transition-colors">
                    {workshop.phone}
                  </p>
                </div>
              </a>

              {/* Email */}
              <a 
                href={`mailto:${workshop.email}`}
                className="card-industrial flex items-center gap-4 hover:border-mr-accent transition-colors group"
              >
                <div className="w-14 h-14 bg-mr-secondary flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-mr-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-mr-text/60 uppercase tracking-wide">Email</p>
                  <p className="text-lg font-bold text-mr-text group-hover:text-mr-accent transition-colors">
                    {workshop.email}
                  </p>
                </div>
              </a>

              {/* Address */}
              <div className="card-industrial flex items-center gap-4">
                <div className="w-14 h-14 bg-mr-primary flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-mr-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="square" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-mr-text/60 uppercase tracking-wide">Dirección</p>
                  <p className="text-lg font-bold text-mr-text">
                    {workshop.address}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="card-industrial flex items-center gap-4">
                <div className="w-14 h-14 bg-mr-primary flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-mr-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-mr-text/60 uppercase tracking-wide">Horario</p>
                  <p className="font-bold text-mr-text">
                    {workshop.hours}
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="card-industrial h-[400px] md:h-full min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-mr-border mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-10 h-10 text-mr-text/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <p className="text-mr-text/50 uppercase tracking-wide text-sm mb-4">
                  Mapa de ubicación
                </p>
                <a 
                  href={`https://maps.google.com/?q=${encodeURIComponent(workshop.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm"
                >
                  Ver en Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 bg-mr-accent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-mr-bg uppercase tracking-wider mb-4">
            ¿Prefieres reservar online?
          </h2>
          <p className="text-mr-bg/80 mb-6">
            Completa el formulario y te contactamos para confirmar tu cita
          </p>
          <Link href={`/website/${params.slug}/reserva`} className="inline-block bg-mr-bg text-mr-accent font-bold uppercase tracking-wide px-8 py-4 hover:bg-mr-primary transition-colors">
            Reservar Cita Online
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-mr-border">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-mr-text/50">
            © 2024 {workshop.name}. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
