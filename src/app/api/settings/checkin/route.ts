import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const checkInItem = await prisma.checkInItem.create({
      data: {
        name: json.name,
        description: json.description,
        icon: json.icon,
        category: json.category,
        isRequired: json.isRequired,
      },
    })

    return NextResponse.json(checkInItem)
  } catch (error) {
    console.error('Error creating check-in item:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la création.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const checkInItems = await prisma.checkInItem.findMany({
      orderBy: [
        {
          category: 'asc',
        },
        {
          name: 'asc',
        },
      ],
    })

    return NextResponse.json(checkInItems)
  } catch (error) {
    console.error('Error fetching check-in items:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue lors du chargement des données.' },
      { status: 500 }
    )
  }
}
