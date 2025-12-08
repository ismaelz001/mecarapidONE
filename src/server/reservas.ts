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

export async function createReserva(data: ReservaData): Promise<{ success: boolean; error?: string; workOrderId?: string }> {
  try {
    // 1. Find or create owner by phone
    let owner = await prisma.owner.findFirst({
      where: { phone: data.ownerPhone },
    });

    if (!owner) {
      owner = await prisma.owner.create({
        data: {
          name: data.ownerName,
          phone: data.ownerPhone,
          email: data.ownerEmail || null,
        },
      });
    }

    // 2. Find or create vehicle by plate
    const plateNormalized = data.matricula.toUpperCase().replace(/\s/g, '');
    
    let vehicle = await prisma.vehicle.findUnique({
      where: { plate: plateNormalized },
    });

    if (!vehicle) {
      vehicle = await prisma.vehicle.create({
        data: {
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
  // For now, return static workshop data
  // In the future, this would query a Workshop model
  return {
    slug,
    name: 'MecaRapid Taller',
    description: 'Taller mecánico especializado en reparación y mantenimiento de vehículos. Servicio rápido, profesional y con garantía.',
    phone: '+34 612 345 678',
    whatsapp: '34612345678',
    email: 'info@mecarapid.com',
    address: 'Calle Industrial 123, Madrid',
    hours: 'Lunes a Viernes: 9:00 - 19:00 | Sábados: 9:00 - 14:00',
    services: [
      { name: 'Cambio de Aceite', description: 'Cambio de aceite y filtros', price: 'Desde 49€' },
      { name: 'Frenos', description: 'Revisión y cambio de pastillas/discos', price: 'Desde 89€' },
      { name: 'Diagnosis', description: 'Diagnosis electrónica completa', price: '35€' },
      { name: 'Neumáticos', description: 'Cambio y equilibrado', price: 'Desde 15€/ud' },
      { name: 'ITV', description: 'Pre-ITV y acompañamiento', price: '25€' },
      { name: 'Aire Acondicionado', description: 'Recarga y revisión A/C', price: 'Desde 59€' },
    ],
  };
}
