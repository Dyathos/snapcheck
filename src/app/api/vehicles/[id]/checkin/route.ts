import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const json = await request.json()
    const updates = json.updates

    // Créer ou mettre à jour les pièces de check-in
    for (const update of updates) {
      const existingPart = await prisma.checkInPart.findUnique({
        where: { id: update.id },
      })

      if (existingPart) {
        await prisma.checkInPart.update({
          where: { id: existingPart.id },
          data: {
            status: update.status,
          },
        })
      } else {
        const newPart = await prisma.checkInPart.create({
          data: {
            vehicleId: params.id,
            itemId: update.itemId,
            status: update.status,
          },
        })

        // Ajouter un nouvel élément à l'historique
        await prisma.checkInPartHistory.create({
          data: {
            checkInPartId: newPart.id,
            status: update.status,
            severity: update.severity,
            description: update.description,
            inspector: 'User', // À remplacer par l'utilisateur connecté
          },
        })
      }
    }

    // Mettre à jour le statut de santé du véhicule
    const criticalItems = updates.filter(
      (update: any) =>
        update.status === 'warning' &&
        (update.severity === 'critical' || update.severity === 'high')
    )

    let healthStatus = 'excellent'
    if (criticalItems.length > 0) {
      healthStatus = criticalItems.some((item: any) => item.severity === 'critical')
        ? 'critical'
        : 'warning'
    }

    await prisma.vehicle.update({
      where: { id: params.id },
      data: {
        healthStatus,
        lastInspection: new Date(),
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating check-in:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la mise à jour.' },
      { status: 500 }
    )
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const checkInParts = await prisma.checkInPart.findMany({
      where: {
        vehicleId: params.id,
      },
      include: {
        item: true,
        histories: { // Corrected from history to histories
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
      orderBy: {
        item: {
          category: 'asc',
        },
      },
    })

    return NextResponse.json(checkInParts)
  } catch (error) {
    console.error('Error fetching check-in parts:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue lors du chargement des données.' },
      { status: 500 }
    )
  }
}
