import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const maintenanceTaskSchema = z.object({
  vehicleId: z.string(),
  inspectionId: z.string(),
  description: z.string(),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
  status: z.enum(['pending', 'in_progress', 'completed']).default('pending'),
  assignedTo: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  notes: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = maintenanceTaskSchema.parse(body);

    const task = await prisma.maintenanceTask.create({
      data: {
        ...validatedData,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      include: {
        vehicle: true,
        inspection: true,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error('Error creating maintenance task:', error);
    return NextResponse.json(
      { error: 'Failed to create maintenance task' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const tasks = await prisma.maintenanceTask.findMany({
      include: {
        vehicle: true,
        inspection: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error fetching maintenance tasks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch maintenance tasks' },
      { status: 500 }
    );
  }
}