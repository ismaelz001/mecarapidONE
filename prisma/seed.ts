import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Hash password
  const password = await bcrypt.hash('mecarapid123', 10);

  // Create users
  const users = [
    {
      email: 'admin@mecarapid.com',
      name: 'Admin Sistema',
      role: 'ADMIN' as Role,
      password,
    },
    {
      email: 'owner@mecarapid.com',
      name: 'Carlos Taller',
      role: 'OWNER' as Role,
      password,
    },
    {
      email: 'office@mecarapid.com',
      name: 'María Secretaria',
      role: 'OFFICE' as Role,
      password,
    },
    {
      email: 'mechanic@mecarapid.com',
      name: 'Juan Mecánico',
      role: 'MECHANIC' as Role,
      password,
    },
  ];

  for (const userData of users) {
    const existing = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (existing) {
      console.log(`⏭️  User ${userData.email} already exists, skipping...`);
      continue;
    }

    const user = await prisma.user.create({
      data: userData,
    });

    console.log(`✅ Created user: ${user.email} (${user.role})`);
  }

  console.log('');
  console.log('🎉 Seed completed!');
  console.log('');
  console.log('📋 Login credentials (password for all: mecarapid123):');
  console.log('   - admin@mecarapid.com (ADMIN)');
  console.log('   - owner@mecarapid.com (OWNER)');
  console.log('   - office@mecarapid.com (OFFICE)');
  console.log('   - mechanic@mecarapid.com (MECHANIC)');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
