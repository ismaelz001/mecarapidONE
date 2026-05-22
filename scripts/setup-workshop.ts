import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

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
    const next = args[index + 1];
    if (!next || next.startsWith('--')) {
      values[key] = 'true';
      continue;
    }

    values[key] = next;
    index += 1;
  }

  return values;
}

function normalizeSlug(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

async function main() {
  const args = parseArgs();
  const name = args.name || 'Taller Demo';
  const slug = normalizeSlug(args.slug || name);
  const ownerEmail = args.ownerEmail || `owner@${slug}.local`;
  const ownerPassword = args.ownerPassword || 'demo123';
  const phone = args.phone || '+34 612 345 678';
  const whatsapp = args.whatsapp || phone.replace(/\D/g, '');

  if (!slug) {
    throw new Error('No se pudo generar slug. Usa --slug taller-demo');
  }

  const workshop = await prisma.workshop.upsert({
    where: { slug },
    update: {
      name,
      phone,
      whatsapp,
      email: args.email || `${slug}@mecarapid.local`,
      address: args.address || 'Direccion pendiente de configurar',
      hours: args.hours || 'Lunes a Viernes: 9:00 - 19:00 | Sabados: 9:00 - 14:00',
      description: args.description || 'Taller mecanico con reserva online y CRM operativo.',
    },
    create: {
      slug,
      name,
      phone,
      whatsapp,
      email: args.email || `${slug}@mecarapid.local`,
      address: args.address || 'Direccion pendiente de configurar',
      hours: args.hours || 'Lunes a Viernes: 9:00 - 19:00 | Sabados: 9:00 - 14:00',
      description: args.description || 'Taller mecanico con reserva online y CRM operativo.',
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

  const hashedPassword = await bcrypt.hash(ownerPassword, 10);

  await prisma.user.upsert({
    where: { email: ownerEmail },
    update: {
      name: `${name} Owner`,
      role: Role.OWNER,
      workshopId: workshop.id,
    },
    create: {
      email: ownerEmail,
      password: hashedPassword,
      name: `${name} Owner`,
      role: Role.OWNER,
      workshopId: workshop.id,
    },
  });

  console.log('Workshop listo');
  console.log(`- Web: /website/${workshop.slug}`);
  console.log(`- Taller: ${workshop.name}`);
  console.log(`- Owner: ${ownerEmail}`);
  console.log(`- Password: ${ownerPassword}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
