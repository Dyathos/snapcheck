import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    const [vehicleCount, inspectionCount, criticalCount] = await Promise.all([
        prisma.vehicle.count(),
        prisma.inspection.count(),
        prisma.part.count({
            where: {
                severity: 'critical', // Ajoutez vos conditions ici
            },
        }),
    ]);

    return NextResponse.json({ vehicleCount, inspectionCount, criticalCount });
}