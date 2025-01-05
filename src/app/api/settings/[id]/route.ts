import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const json = await request.json()
    const checkInItem = await prisma.checkInItem.update({
      where: { id: params.id },
      data: json,
    })

    return NextResponse.json(checkInItem)
  } catch (error) {
    console.error('Error updating check-in item:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la mise à jour.' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Vérifier si l'élément est standard
    const item = await prisma.checkInItem.findUnique({
      where: { id: params.id },
    })

    if (item?.isDefault) {
      return NextResponse.json(
        { error: 'Les éléments standards ne peuvent pas être supprimés.' },
        { status: 400 }
      )
    }

    await prisma.checkInItem.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting check-in item:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la suppression.' },
      { status: 500 }
    )
  }
}
