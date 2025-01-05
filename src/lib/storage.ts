import { writeFile } from 'fs/promises'
import path from 'path'

export async function uploadVehicleImage(file: File) {
  try {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Créer un nom de fichier unique
    const timestamp = Date.now()
    const filename = `${timestamp}-${file.name}`
    
    // Chemin de sauvegarde (dossier public pour l'accès web)
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'vehicles')
    const filePath = path.join(uploadDir, filename)

    // Sauvegarder le fichier
    await writeFile(filePath, buffer)

    // Retourner le chemin relatif pour la base de données
    return `/uploads/vehicles/${filename}`
  } catch (error) {
    console.error('Error saving image:', error)
    throw new Error('Erreur lors de la sauvegarde de l\'image')
  }
}