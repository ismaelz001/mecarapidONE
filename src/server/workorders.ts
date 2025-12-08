'use server';

import { prisma } from '@/lib/prisma';
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

export async function getWorkOrders(): Promise<WorkOrderWithRelations[]> {
  try {
    const workOrders = await prisma.workOrder.findMany({
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
    return workOrders;
  } catch (error) {
    console.error('Error fetching work orders:', error);
    return [];
  }
}

export async function getWorkOrderById(id: string): Promise<WorkOrderWithRelations | null> {
  try {
    const workOrder = await prisma.workOrder.findUnique({
      where: { id },
      include: {
        vehicle: {
          include: {
            owner: true,
          },
        },
      },
    });
    return workOrder;
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

export async function createWorkOrder(data: CreateWorkOrderData): Promise<{ success: boolean; error?: string; workOrderId?: string }> {
  try {
    // 1. Find or create owner
    let owner = await prisma.owner.findFirst({
      where: {
        phone: data.ownerPhone,
      },
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

    // 2. Find or create vehicle
    let vehicle = await prisma.vehicle.findUnique({
      where: {
        plate: data.plate.toUpperCase(),
      },
    });

    if (!vehicle) {
      vehicle = await prisma.vehicle.create({
        data: {
          plate: data.plate.toUpperCase(),
          brand: data.brand,
          model: data.model,
          year: data.year || null,
          km: data.km || null,
          ownerId: owner.id,
        },
      });
    } else {
      // Update vehicle info if it already exists
      vehicle = await prisma.vehicle.update({
        where: { id: vehicle.id },
        data: {
          km: data.km || vehicle.km,
          ownerId: owner.id,
        },
      });
    }

    // 3. Create work order
    const workOrder = await prisma.workOrder.create({
      data: {
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
    await prisma.workOrder.update({
      where: { id },
      data: { status },
    });

    revalidatePath('/work-orders');
    return { success: true };
  } catch (error) {
    console.error('Error updating work order status:', error);
    return { success: false, error: 'Error al actualizar el estado' };
  }
}

export async function deleteWorkOrder(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.workOrder.delete({
      where: { id },
    });

    revalidatePath('/work-orders');
    return { success: true };
  } catch (error) {
    console.error('Error deleting work order:', error);
    return { success: false, error: 'Error al eliminar la orden' };
  }
}
