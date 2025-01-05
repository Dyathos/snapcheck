import { mkdir, unlink, writeFile } from 'fs/promises';
import path from 'path';

export async function handlePhotoUpload(
  newPhoto: File,
  existingPhotoPath: string | null,
  folder: string
): Promise<string | null> {
  try {
    // Créer le dossier uploads s'il n'existe pas
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder);
    await mkdir(uploadDir, { recursive: true });

    // Supprimer l'ancienne photo si elle existe
    if (existingPhotoPath) {
      const fullPath = path.join(process.cwd(), 'public', existingPhotoPath);
      try {
        await unlink(fullPath);
      } catch (error) {
        console.error('Error deleting existing photo:', error);
      }
    }

    // Générer un nom de fichier unique
    const fileName = `${Date.now()}-${newPhoto.name}`;
    const filePath = path.join(uploadDir, fileName);
    
    // Convertir le File en Buffer et sauvegarder
    const arrayBuffer = await newPhoto.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await writeFile(filePath, buffer);

    // Retourner le chemin relatif pour la base de données
    return `/uploads/${folder}/${fileName}`;
  } catch (error) {
    console.error('Error handling photo:', error);
    throw new Error('Erreur lors du traitement de l\'image');
  }
}