import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const vehicleId = formData.get('vehicleId') as string

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Créer un nom de fichier unique
    const timestamp = Date.now()
    const filename = `${timestamp}-${file.name}`
    const dir = path.join(process.cwd(), 'public', 'uploads', 'inspections', vehicleId)
    const filePath = path.join(dir, filename)

    // Créer le dossier s'il n'existe pas
    await writeFile(path.join(process.cwd(), 'public', 'uploads', 'inspections', vehicleId), '', { flag: 'a' })
      .catch(() => {})

    // Sauvegarder le fichier
    await writeFile(filePath, buffer)

    // Retourner l'URL relative pour accéder au fichier
    const fileUrl = `/uploads/inspections/${vehicleId}/${filename}`

    return NextResponse.json({ fileUrl })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    )
  }
}
