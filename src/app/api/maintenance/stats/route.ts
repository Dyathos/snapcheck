import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get active maintenance tasks
    const active = await prisma.vehicle.findMany({
      where: {
        maintenanceTasks: {
          some: {
            status: 'active',
          },
        },
      },
      select: {
        id: true,
        brand: true,
        affectation: true,
      },
    });

    // Get completed maintenance tasks
    const completed = await prisma.vehicle.findMany({
      where: {
        maintenanceTasks: {
          some: {
            status: 'completed',
            updatedAt: {
              gte: today,
            },
          },
        },
      },
      select: {
        id: true,
        brand: true,
        affectation: true,
      },
    });

    // Get critical cases
    const critical = await prisma.vehicle.findMany({
      where: {
        parts: {
          some: {
            severity: 'critical',
          },
        },
        NOT: {
          maintenanceTasks: {
            some: {
              status: 'active',
            },
          },
        },
      },
      select: {
        id: true,
        brand: true,
        affectation: true,
      },
    });

    // Get daily actions (last 7 days)
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const dailyActions = await prisma.$queryRaw`
      SELECT 
        DATE(updated_at) as date,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as started,
        SUM(CASE WHEN status = 'critical' THEN 1 ELSE 0 END) as critical
      FROM maintenance_tasks
      WHERE updated_at >= ${sevenDaysAgo}
      GROUP BY DATE(updated_at)
      ORDER BY date ASC
    `;

    return NextResponse.json({
      active,
      completed,
      critical,
      dailyActions,
    });
  } catch (error) {
    const typedError = error as Error;
    console.error('Error fetching maintenance stats:', typedError.message);
    return NextResponse.json(
      { error: 'Failed to fetch maintenance stats', details: typedError.message },
      { status: 500 }
    );
  }
}