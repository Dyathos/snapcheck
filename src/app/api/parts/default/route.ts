import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const defaultParts = await prisma.defaultPart.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        category: 'asc',
      },
    })

    return NextResponse.json(defaultParts)
  } catch (error) {
    console.error('Error fetching default parts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch default parts' },
      { status: 500 }
    )
  }
}
