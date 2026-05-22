import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const demoServices = [
  { name: 'Cambio de aceite y filtros', description: 'Aceite, filtros y revision de niveles.', price: 'Desde 49 EUR', category: 'Mantenimiento', order: 1 },
  { name: 'Diagnosis electronica', description: 'Lectura profesional de errores e informe claro.', price: '35 EUR', category: 'Electronica', order: 2 },
  { name: 'Frenos y seguridad', description: 'Revision y sustitucion de pastillas, discos y liquido.', price: 'Desde 89 EUR', category: 'Seguridad', order: 3 },
  { name: 'Neumaticos y equilibrado', description: 'Montaje, equilibrado y revision de desgaste.', price: 'Desde 15 EUR/ud', category: 'Ruedas', order: 4 },
];

async function main() {
  console.log('Seeding database...');

  const workshop = await prisma.workshop.upsert({
    where: { slug: 'demo' },
    update: {
      name: 'MecaRapid Taller Demo',
      phone: '+34 612 345 678',
      whatsapp: '34612345678',
      email: 'demo@mecarapid.local',
      address: 'Calle Industrial 123, Madrid',
      hours: 'Lunes a Viernes: 9:00 - 19:00 | Sabados: 9:00 - 14:00',
      description: 'Taller demo con web publica, reserva online y CRM operativo.',
    },
    create: {
      slug: 'demo',
      name: 'MecaRapid Taller Demo',
      phone: '+34 612 345 678',
      whatsapp: '34612345678',
      email: 'demo@mecarapid.local',
      address: 'Calle Industrial 123, Madrid',
      hours: 'Lunes a Viernes: 9:00 - 19:00 | Sabados: 9:00 - 14:00',
      description: 'Taller demo con web publica, reserva online y CRM operativo.',
    },
  });

  const serviceCount = await prisma.workshopService.count({
    where: { workshopId: workshop.id },
  });

  if (serviceCount === 0) {
    await prisma.workshopService.createMany({
      data: demoServices.map((service) => ({
        ...service,
        workshopId: workshop.id,
      })),
    });
  }

  await prisma.user.deleteMany({});

  const password = await bcrypt.hash('demo123', 10);

  const users = [
    { email: 'admin@mecarapid.com', name: 'Admin Sistema', role: Role.ADMIN, password, workshopId: workshop.id },
    { email: 'owner@mecarapid.com', name: 'Carlos Taller', role: Role.OWNER, password, workshopId: workshop.id },
    { email: 'office@mecarapid.com', name: 'Maria Secretaria', role: Role.OFFICE, password, workshopId: workshop.id },
    { email: 'mechanic@mecarapid.com', name: 'Juan Mecanico', role: Role.MECHANIC, password, workshopId: workshop.id },
  ];

  for (const data of users) {
    const user = await prisma.user.create({ data });
    console.log(`Created user: ${user.email} (${user.role})`);
  }

  console.log('Seed completed. Password for all: demo123');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
