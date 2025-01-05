// app/api/inspections/stats/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get uninspected vehicles
    const totalVehicles = await prisma.vehicle.count();
    const inspectedToday = await prisma.inspection.count({
      where: {
        date: {
          gte: today,
        },
      },
    });

    // Get critical cases
    const criticalCases = await prisma.vehicle.count({
      where: {
        parts: {
          some: {
            severity: 'critical',
          },
        },
      },
    });

    // Get historical data (last 7 days)
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const history = await prisma.$queryRaw`
      SELECT 
        DATE(date) as date,
        COUNT(*) as inspected,
        SUM(CASE WHEN status = 'critical' THEN 1 ELSE 0 END) as critical,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending
      FROM inspections
      WHERE date >= ${sevenDaysAgo}
      GROUP BY DATE(date)
      ORDER BY date ASC
    `;

    const serializedHistory = history.map(item => ({
      ...item,
      inspected: String(item.inspected), // Convert any BigInt properties to string
      // Convert other BigInt properties if necessary
    }));
    
    return NextResponse.json({
      uninspected: String(totalVehicles - inspectedToday),
      critical: String(criticalCases),
      history: serializedHistory, // Use the serialized history
    });

  } catch (error) {
    console.error('Error fetching inspection stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch inspection stats' },
      { status: 500 }
    );
  }
}
