import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const vehicles = await prisma.vehicle.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        parts: true,
      },
    })
    return NextResponse.json(vehicles)
  } catch (error) {
    console.error('Error fetching vehicles:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue lors du chargement des véhicules.' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    console.log('Creating vehicle with data:', json)

    const vehicle = await prisma.vehicle.create({
      data: {
        brand: json.brand,
        model: json.model,
        year: Number(json.year),
        mileage: Number(json.mileage),
        plateNumber: json.plateNumber,
        vin: json.vin || undefined,
      },
    })

    console.log('Vehicle created:', vehicle)
    return NextResponse.json(vehicle)
  } catch (error) {
    console.error('Error creating vehicle:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la création du véhicule.' },
      { status: 500 }
    )
  }
}
