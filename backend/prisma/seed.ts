import { PrismaClient, OrganizationalUnitType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // --- Role-ovi ---
  const roleNames = ['USER', 'AGENT', 'ADMIN', 'SUPER_ADMIN'];
  const roles: Record<string, { id: string }> = {};
  for (const name of roleNames) {
    roles[name] = await prisma.role.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // --- Korijenska organizaciona jedinica ---
  const directorate = await prisma.organizationalUnit.upsert({
    where: { code: 'DIRECTORATE' },
    update: {},
    create: {
      name: 'Direkcija Društva',
      type: OrganizationalUnitType.DIRECTORATE,
      code: 'DIRECTORATE',
    },
  });

  const iktSector = await prisma.organizationalUnit.upsert({
    where: { code: 'DIRECTORATE-IKT' },
    update: {},
    create: {
      name: 'Sektor za IKT',
      type: OrganizationalUnitType.SECTOR,
      code: 'DIRECTORATE-IKT',
      parentId: directorate.id,
    },
  });

  // --- Prvi SuperAdmin (zamijenite email/ime prije prve prijave) ---
  await prisma.user.upsert({
    where: { email: 'superadmin@epbih.local' },
    update: {},
    create: {
      email: 'superadmin@epbih.local',
      fullName: 'Super Admin',
      organizationalUnitId: iktSector.id,
      roleId: roles['SUPER_ADMIN'].id,
    },
  });

  // --- Osnovna kategorija i servis (da ticket-flow ima šta da referencira) ---
  const category = await prisma.serviceCategory.upsert({
    where: { id: 'seed-category-it' },
    update: {},
    create: { id: 'seed-category-it', name: 'IT podrška' },
  });

  await prisma.service.upsert({
    where: { id: 'seed-service-general-it' },
    update: {},
    create: {
      id: 'seed-service-general-it',
      name: 'Opšta IT podrška',
      categoryId: category.id,
    },
  });

  console.log('Seed završen.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
