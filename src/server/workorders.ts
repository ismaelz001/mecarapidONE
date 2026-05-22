'use server';

import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/session';
import { revalidatePath } from 'next/cache';

export interface WorkOrderWithRelations {
  id: string;
  description: string;
  priority: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  vehicle: {
    id: string;
    plate: string;
    brand: string;
    model: string;
    year: number | null;
    km: number | null;
    owner: {
      id: string;
      name: string;
      phone: string;
      email: string | null;
    } | null;
  };
}

function getWorkshopFilter(workshopId?: string | null) {
  return workshopId ? { workshopId } : {};
}

export async function getWorkOrders(): Promise<WorkOrderWithRelations[]> {
  try {
    const user = await getCurrentUser();
    const workshopId = user?.workshopId ?? null;

    return await prisma.workOrder.findMany({
      where: getWorkshopFilter(workshopId),
      include: {
        vehicle: {
          include: {
            owner: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  } catch (error) {
    console.error('Error fetching work orders:', error);
    return [];
  }
}

export async function getWorkOrderById(
  id: string
): Promise<WorkOrderWithRelations | null> {
  try {
    const user = await getCurrentUser();
    const workshopId = user?.workshopId ?? null;

    return await prisma.workOrder.findFirst({
      where: {
        id,
        ...getWorkshopFilter(workshopId),
      },
      include: {
        vehicle: {
          include: {
            owner: true,
          },
        },
      },
    });
  } catch (error) {
    console.error('Error fetching work order:', error);
    return null;
  }
}

interface CreateWorkOrderData {
  plate: string;
  brand: string;
  model: string;
  year?: number;
  km?: number;
  ownerName: string;
  ownerPhone: string;
  ownerEmail?: string;
  description: string;
  priority: string;
}

export async function createWorkOrder(
  data: CreateWorkOrderData
): Promise<{ success: boolean; error?: string; workOrderId?: string }> {
  try {
    const user = await getCurrentUser();
    const workshopId = user?.workshopId ?? null;
    const plate = data.plate.toUpperCase().replace(/\s/g, '');
    const plateRegex = /^[0-9]{4}[A-Z]{3}$/;

    if (!plateRegex.test(plate)) {
      return {
        success: false,
        error: 'Matricula invalida. Formato correcto: 1234ABC',
      };
    }

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

    let vehicle = await prisma.vehicle.findFirst({
      where: {
        plate,
        workshopId,
      },
    });

    if (!vehicle) {
      vehicle = await prisma.vehicle.create({
        data: {
          workshopId,
          plate,
          brand: data.brand,
          model: data.model,
          year: data.year || null,
          km: data.km || null,
          ownerId: owner.id,
        },
      });
    } else {
      vehicle = await prisma.vehicle.update({
        where: { id: vehicle.id },
        data: {
          km: data.km ?? vehicle.km,
          ownerId: owner.id,
          workshopId,
        },
      });
    }

    const workOrder = await prisma.workOrder.create({
      data: {
        workshopId,
        vehicleId: vehicle.id,
        description: data.description,
        priority: data.priority,
        status: 'pendiente',
      },
    });

    revalidatePath('/work-orders');
    return { success: true, workOrderId: workOrder.id };
  } catch (error) {
    console.error('Error creating work order:', error);
    return { success: false, error: 'Error al crear la orden de trabajo' };
  }
}

export async function updateWorkOrderStatus(
  id: string,
  status: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await getCurrentUser();
    const workshopId = user?.workshopId ?? null;

    const result = await prisma.workOrder.updateMany({
      where: {
        id,
        ...getWorkshopFilter(workshopId),
      },
      data: { status },
    });

    if (result.count === 0) {
      return { success: false, error: 'Orden no encontrada' };
    }

    revalidatePath('/work-orders');
    revalidatePath(`/work-orders/${id}`);
    return { success: true };
  } catch (error) {
    console.error('Error updating work order status:', error);
    return { success: false, error: 'Error al actualizar el estado' };
  }
}

export async function deleteWorkOrder(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await getCurrentUser();
    const workshopId = user?.workshopId ?? null;

    const result = await prisma.workOrder.deleteMany({
      where: {
        id,
        ...getWorkshopFilter(workshopId),
      },
    });

    if (result.count === 0) {
      return { success: false, error: 'Orden no encontrada' };
    }

    revalidatePath('/work-orders');
    return { success: true };
  } catch (error) {
    console.error('Error deleting work order:', error);
    return { success: false, error: 'Error al eliminar la orden' };
  }
}
