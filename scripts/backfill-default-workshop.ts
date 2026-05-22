import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const defaultServices = [
  { name: 'Cambio de aceite y filtros', description: 'Aceite, filtros y revision de niveles.', price: 'Desde 49 EUR', category: 'Mantenimiento', order: 1 },
  { name: 'Diagnosis electronica', description: 'Lectura profesional de errores e informe claro.', price: '35 EUR', category: 'Electronica', order: 2 },
  { name: 'Frenos y seguridad', description: 'Revision y sustitucion de pastillas, discos y liquido.', price: 'Desde 89 EUR', category: 'Seguridad', order: 3 },
  { name: 'Neumaticos y equilibrado', description: 'Montaje, equilibrado y revision de desgaste.', price: 'Desde 15 EUR/ud', category: 'Ruedas', order: 4 },
  { name: 'Pre-ITV', description: 'Revision previa de puntos criticos antes de ITV.', price: '25 EUR', category: 'Mantenimiento', order: 5 },
  { name: 'Aire acondicionado', description: 'Carga, fugas y rendimiento del sistema.', price: 'Desde 59 EUR', category: 'Climatizacion', order: 6 },
];

function parseArgs() {
  const args = process.argv.slice(2);
  const values: Record<string, string> = {};

  for (let index = 0; index < args.length; index += 1) {
    const current = args[index];
    if (!current.startsWith('--')) continue;

    const key = current.slice(2);
    const value = args[index + 1];
    if (!value || value.startsWith('--')) {
      values[key] = 'true';
      continue;
    }

    values[key] = value;
    index += 1;
  }

  return values;
}

async function main() {
  const args = parseArgs();
  const slug = args.slug || 'demo';
  const name = args.name || 'MecaRapid Taller Demo';

  const workshop = await prisma.workshop.upsert({
    where: { slug },
    update: {
      name,
      phone: args.phone || '+34 612 345 678',
      whatsapp: args.whatsapp || '34612345678',
      email: args.email || 'demo@mecarapid.local',
      address: args.address || 'Direccion pendiente de configurar',
      hours: args.hours || 'Lunes a Viernes: 9:00 - 19:00 | Sabados: 9:00 - 14:00',
      description: args.description || 'Taller base para datos migrados desde la rama de produccion.',
    },
    create: {
      slug,
      name,
      phone: args.phone || '+34 612 345 678',
      whatsapp: args.whatsapp || '34612345678',
      email: args.email || 'demo@mecarapid.local',
      address: args.address || 'Direccion pendiente de configurar',
      hours: args.hours || 'Lunes a Viernes: 9:00 - 19:00 | Sabados: 9:00 - 14:00',
      description: args.description || 'Taller base para datos migrados desde la rama de produccion.',
    },
  });

  const serviceCount = await prisma.workshopService.count({
    where: { workshopId: workshop.id },
  });

  if (serviceCount === 0) {
    await prisma.workshopService.createMany({
      data: defaultServices.map((service) => ({
        ...service,
        workshopId: workshop.id,
      })),
    });
  }

  const [users, owners, vehicles, workOrders] = await Promise.all([
    prisma.user.updateMany({ where: { workshopId: null }, data: { workshopId: workshop.id } }),
    prisma.owner.updateMany({ where: { workshopId: null }, data: { workshopId: workshop.id } }),
    prisma.vehicle.updateMany({ where: { workshopId: null }, data: { workshopId: workshop.id } }),
    prisma.workOrder.updateMany({ where: { workshopId: null }, data: { workshopId: workshop.id } }),
  ]);

  console.log('Backfill completado');
  console.log(`- Taller: ${workshop.name} (${workshop.slug})`);
  console.log(`- Usuarios asignados: ${users.count}`);
  console.log(`- Propietarios asignados: ${owners.count}`);
  console.log(`- Vehiculos asignados: ${vehicles.count}`);
  console.log(`- Ordenes asignadas: ${workOrders.count}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
