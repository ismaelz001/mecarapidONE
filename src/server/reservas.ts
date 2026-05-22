'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

interface ReservaData {
  ownerName: string;
  ownerPhone: string;
  ownerEmail?: string;
  marca: string;
  modelo: string;
  matricula: string;
  año?: number;
  problema: string;
  prioridad: string;
  fechaSugerida?: string;
  slug: string;
}

const defaultServices = [
  { name: 'Cambio de Aceite', description: 'Cambio de aceite y filtros', price: 'Desde 49 EUR', category: 'Mantenimiento' },
  { name: 'Frenos', description: 'Revision y cambio de pastillas/discos', price: 'Desde 89 EUR', category: 'Seguridad' },
  { name: 'Diagnosis', description: 'Diagnosis electronica completa', price: '35 EUR', category: 'Electronica' },
  { name: 'Neumaticos', description: 'Cambio y equilibrado', price: 'Desde 15 EUR/ud', category: 'Ruedas' },
  { name: 'ITV', description: 'Pre-ITV y acompaniamiento', price: '25 EUR', category: 'Mantenimiento' },
  { name: 'Aire Acondicionado', description: 'Recarga y revision A/C', price: 'Desde 59 EUR', category: 'Climatizacion' },
];

function normalizePlate(value: string) {
  return value.toUpperCase().replace(/\s/g, '');
}

export async function createReserva(data: ReservaData): Promise<{ success: boolean; error?: string; workOrderId?: string }> {
  try {
    const workshop = await prisma.workshop.findUnique({
      where: { slug: data.slug },
    });
    const workshopId = workshop?.id ?? null;

    // 1. Find or create owner by phone
    let owner = await prisma.owner.findFirst({
      where: {
        phone: data.ownerPhone,
        workshopId,
      },
    });

    if (!owner) {
      owner = await prisma.owner.create({
        data: {
          workshopId,
          name: data.ownerName,
          phone: data.ownerPhone,
          email: data.ownerEmail || null,
        },
      });
    }

    // 2. Find or create vehicle by plate
    const plateNormalized = normalizePlate(data.matricula);
    
    let vehicle = await prisma.vehicle.findFirst({
      where: {
        plate: plateNormalized,
        workshopId,
      },
    });

    if (!vehicle) {
      vehicle = await prisma.vehicle.create({
        data: {
          workshopId,
          plate: plateNormalized,
          brand: data.marca,
          model: data.modelo,
          year: data.año || null,
          ownerId: owner.id,
        },
      });
    } else {
      // Update owner if vehicle exists
      vehicle = await prisma.vehicle.update({
        where: { id: vehicle.id },
        data: { ownerId: owner.id },
      });
    }

    // 3. Create work order
    const description = data.fechaSugerida 
      ? `${data.problema}\n\n📅 Fecha sugerida: ${data.fechaSugerida}`
      : data.problema;

    const workOrder = await prisma.workOrder.create({
      data: {
        workshopId,
        vehicleId: vehicle.id,
        description,
        priority: data.prioridad,
        status: 'pendiente',
      },
    });

    revalidatePath('/work-orders');
    revalidatePath(`/website/${data.slug}`);

    return { success: true, workOrderId: workOrder.id };
  } catch (error) {
    console.error('Error creating reserva:', error);
    return { success: false, error: 'Error al crear la reserva. Por favor, inténtalo de nuevo.' };
  }
}

export async function getWorkshopBySlug(slug: string) {
  const workshop = await prisma.workshop.findUnique({
    where: { slug },
    include: {
      services: {
        where: { active: true },
        orderBy: [{ order: 'asc' }, { name: 'asc' }],
      },
    },
  });

  if (workshop) {
    return {
      slug: workshop.slug,
      name: workshop.name,
      description: workshop.description || 'Taller mecanico especializado en reparacion y mantenimiento de vehiculos.',
      phone: workshop.phone,
      whatsapp: workshop.whatsapp,
      email: workshop.email || 'info@mecarapid.com',
      address: workshop.address || 'Direccion pendiente de configurar',
      hours: workshop.hours || 'Lunes a Viernes: 9:00 - 19:00 | Sabados: 9:00 - 14:00',
      logoUrl: workshop.logoUrl,
      heroImageUrl: workshop.heroImageUrl || '/website/hero-workshop.jpg',
      primaryColor: workshop.primaryColor,
      accentColor: workshop.accentColor,
      services: workshop.services.length > 0 ? workshop.services.map((service) => ({
        name: service.name,
        description: service.description || '',
        price: service.price || 'Consultar',
        category: service.category || 'General',
      })) : defaultServices,
    };
  }

  return {
    slug,
    name: 'MecaRapid Taller',
    description: 'Taller mecanico especializado en reparacion y mantenimiento de vehiculos. Servicio rapido, profesional y con garantia.',
    phone: '+34 612 345 678',
    whatsapp: '34612345678',
    email: 'info@mecarapid.com',
    address: 'Calle Industrial 123, Madrid',
    hours: 'Lunes a Viernes: 9:00 - 19:00 | Sabados: 9:00 - 14:00',
    logoUrl: null,
    heroImageUrl: '/website/hero-workshop.jpg',
    primaryColor: '#070909',
    accentColor: '#61D398',
    services: defaultServices,
  };
}
