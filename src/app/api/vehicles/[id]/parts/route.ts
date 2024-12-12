import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const parts = await prisma.part.findMany({
      where: {
        vehicleId: params.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json(parts)
  } catch (error) {
    console.error('Error fetching parts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch parts' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    console.log('Received parts data:', body)

    if (!body.parts || !Array.isArray(body.parts)) {
      return NextResponse.json(
        { error: 'Invalid parts data' },
        { status: 400 }
      )
    }

    const vehicleId = params.id

    // Vérifier si le véhicule existe
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId },
    })

    if (!vehicle) {
      return NextResponse.json(
        { error: 'Vehicle not found' },
        { status: 404 }
      )
    }

    console.log('Deleting existing parts for vehicle:', vehicleId)
    // D'abord, supprimer toutes les pièces existantes
    await prisma.part.deleteMany({
      where: {
        vehicleId,
      },
    })

    console.log('Creating new parts')
    // Ensuite, créer les nouvelles pièces
    const createdParts = await prisma.$transaction(
      body.parts.map((part: any) =>
        prisma.part.create({
          data: {
            vehicleId,
            name: part.name,
            icon: part.icon,
            category: part.category,
            severity: part.severity,
            status: part.status || 'good',
            description: part.description,
            isDefault: part.isDefault || false,
          },
        })
      )
    )

    console.log('Parts created successfully:', createdParts)
    return NextResponse.json(createdParts)
  } catch (error) {
    console.error('Error creating parts:', error)
    return NextResponse.json(
      { error: 'Failed to create parts', details: (error as Error).message },
      { status: 500 }
    )
  }
}
