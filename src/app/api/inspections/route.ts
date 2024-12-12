import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const partSchema = z.object({
  id: z.string(),
  status: z.string(),
  notes: z.string().optional().nullable(),
})

const inspectionSchema = z.object({
  inspector: z.string(),
  status: z.string().default('in_progress'),
  notes: z.string().optional().nullable(),
  vehicleId: z.string(),
  parts: z.array(partSchema),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Received inspection data:', JSON.stringify(body, null, 2))

    // Valider les données
    const validatedData = inspectionSchema.parse(body)
    console.log('Validated data:', JSON.stringify(validatedData, null, 2))

    try {
      // Vérifier que le véhicule existe
      const vehicle = await prisma.vehicle.findUnique({
        where: { id: validatedData.vehicleId },
        include: { parts: true },
      })

      if (!vehicle) {
        console.error('Vehicle not found:', validatedData.vehicleId)
        return NextResponse.json(
          { error: 'Vehicle not found' },
          { status: 404 }
        )
      }

      // Vérifier que toutes les pièces existent
      const vehicleParts = new Set(vehicle.parts.map(p => p.id))
      const invalidParts = validatedData.parts.filter(p => !vehicleParts.has(p.id))

      if (invalidParts.length > 0) {
        console.error('Invalid parts:', invalidParts)
        return NextResponse.json(
          { 
            error: 'Invalid parts',
            details: `Parts not found: ${invalidParts.map(p => p.id).join(', ')}`
          },
          { status: 400 }
        )
      }

      // Créer l'inspection avec une transaction
      const inspection = await prisma.$transaction(async (tx) => {
        console.log('Starting transaction...')

        // 1. Créer l'inspection
        const newInspection = await tx.inspection.create({
          data: {
            date: new Date(),
            inspector: validatedData.inspector,
            status: validatedData.status,
            notes: validatedData.notes,
          },
        })
        console.log('Created inspection:', newInspection)

        // 2. Créer l'InspectionVehicle
        const inspectionVehicle = await tx.inspectionVehicle.create({
          data: {
            inspectionId: newInspection.id,
            vehicleId: validatedData.vehicleId,
            status: validatedData.status,
            notes: validatedData.notes,
          },
        })
        console.log('Created inspection vehicle:', inspectionVehicle)

        // 3. Créer les InspectionPart
        const parts = await tx.inspectionPart.createMany({
          data: validatedData.parts.map(part => ({
            inspectionVehicleId: inspectionVehicle.id,
            partId: part.id,
            status: part.status,
            notes: part.notes || '',
          })),
        })
        console.log('Created inspection parts:', parts)

        // 4. Retourner l'inspection complète
        const completeInspection = await tx.inspection.findUnique({
          where: { id: newInspection.id },
          include: {
            vehicles: {
              include: {
                vehicle: true,
                parts: {
                  include: {
                    part: true,
                  },
                },
              },
            },
          },
        })
        console.log('Transaction completed successfully')
        return completeInspection
      })

      console.log('Created complete inspection:', JSON.stringify(inspection, null, 2))
      return NextResponse.json(inspection)
    } catch (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { 
          error: 'Database error',
          details: dbError instanceof Error ? dbError.message : 'Unknown database error'
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error creating inspection:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Validation error',
          details: error.errors 
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { 
        error: 'Failed to create inspection',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const inspections = await prisma.inspection.findMany({
      include: {
        vehicles: {
          include: {
            vehicle: true,
            parts: {
              include: {
                part: true,
              },
            },
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    })

    return NextResponse.json(inspections)
  } catch (error) {
    console.error('Error fetching inspections:', error)
    return NextResponse.json(
      { error: 'Failed to fetch inspections' },
      { status: 500 }
    )
  }
}
