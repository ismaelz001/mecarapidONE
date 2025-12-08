import Link from 'next/link';
import { getWorkshopBySlug } from '@/server/reservas';

interface PageProps {
  params: { slug: string };
}

export default async function ServiciosPage({ params }: PageProps) {
  const workshop = await getWorkshopBySlug(params.slug);

  const allServices = [
    { name: 'Cambio de Aceite', description: 'Cambio de aceite sintético y filtros. Incluye revisión de niveles.', price: 'Desde 49€', icon: '🛢️' },
    { name: 'Frenos', description: 'Revisión completa del sistema de frenado. Cambio de pastillas y discos.', price: 'Desde 89€', icon: '🛑' },
    { name: 'Diagnosis Electrónica', description: 'Lectura de códigos de error con equipo profesional. Informe detallado.', price: '35€', icon: '🔌' },
    { name: 'Neumáticos', description: 'Cambio, equilibrado y alineación. Todas las marcas disponibles.', price: 'Desde 15€/ud', icon: '🔧' },
    { name: 'Pre-ITV', description: 'Revisión completa pre-ITV. Acompañamiento opcional a la estación.', price: '25€', icon: '📋' },
    { name: 'Aire Acondicionado', description: 'Recarga de gas, revisión de fugas y limpieza del sistema.', price: 'Desde 59€', icon: '❄️' },
    { name: 'Distribución', description: 'Cambio de kit de distribución completo. Incluye bomba de agua.', price: 'Desde 350€', icon: '⚙️' },
    { name: 'Embrague', description: 'Sustitución del kit de embrague. Volante motor si es necesario.', price: 'Desde 450€', icon: '🔄' },
    { name: 'Suspensión', description: 'Revisión y cambio de amortiguadores, muelles y silentblocks.', price: 'Desde 120€', icon: '🚗' },
    { name: 'Batería', description: 'Test de batería y alternador. Cambio de batería con garantía.', price: 'Desde 80€', icon: '🔋' },
    { name: 'Escape', description: 'Reparación y sustitución del sistema de escape.', price: 'Desde 95€', icon: '💨' },
    { name: 'Electricidad', description: 'Reparación de sistema eléctrico, luces, fusibles y alternador.', price: 'Consultar', icon: '⚡' },
  ];

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

      {/* Hero */}
      <section className="py-12 px-4 bg-mr-primary/20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-mr-accent uppercase tracking-wider mb-4">
            Nuestros Servicios
          </h1>
          <p className="text-mr-text/70 max-w-2xl mx-auto">
            Ofrecemos una amplia gama de servicios de mantenimiento y reparación para tu vehículo. 
            Todos nuestros trabajos incluyen garantía.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allServices.map((service, i) => (
              <div key={i} className="card-industrial hover:border-mr-accent transition-colors group">
                <div className="text-3xl mb-3">{service.icon}</div>
                <h3 className="text-lg font-bold text-mr-text mb-2 group-hover:text-mr-accent transition-colors">
                  {service.name}
                </h3>
                <p className="text-sm text-mr-text/60 mb-4">
                  {service.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-mr-accent font-bold text-lg">{service.price}</span>
                  <Link 
                    href={`/website/${params.slug}/reserva`}
                    className="text-sm text-mr-text/50 hover:text-mr-accent transition-colors uppercase"
                  >
                    Reservar →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 bg-mr-accent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-mr-bg uppercase tracking-wider mb-4">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-mr-bg/80 mb-6">
            Contacta con nosotros y te asesoramos sin compromiso
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={`/website/${params.slug}/reserva`} className="bg-mr-bg text-mr-accent font-bold uppercase tracking-wide px-6 py-3 hover:bg-mr-primary transition-colors">
              Solicitar Presupuesto
            </Link>
            <Link href={`/website/${params.slug}/contacto`} className="border-2 border-mr-bg text-mr-bg font-bold uppercase tracking-wide px-6 py-3 hover:bg-mr-bg/10 transition-colors">
              Contactar
            </Link>
          </div>
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
