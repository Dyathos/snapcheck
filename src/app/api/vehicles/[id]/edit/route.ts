import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { mkdir, unlink, writeFile } from 'fs/promises';
import path from 'path';
import { z } from 'zod';

// Schéma de validation
const updateVehicleSchema = z.object({
  brand: z.string().min(1, 'La marque est requise'),
  affectation: z.string().min(1, 'L\'affectation est requise'),
});

// Gestion de l'upload des photos
async function handlePhotoUpload(newPhoto: File | null, existingPhotoPath: string | null): Promise<string | null> {
  if (!newPhoto) {
    return existingPhotoPath;
  }

  try {
    // Créer le dossier uploads s'il n'existe pas
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'vehicles');
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
    return `/uploads/vehicles/${fileName}`;
  } catch (error) {
    console.error('Error handling photo:', error);
    throw new Error('Erreur lors du traitement de l\'image');
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await request.formData();
    const brand = formData.get('brand') as string;
    const affectation = formData.get('affectation') as string;
    const photo = formData.get('photo') as File | null;

    // Validation des données
    try {
      updateVehicleSchema.parse({ brand, affectation });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { error: 'Données invalides', details: error.errors },
          { status: 400 }
        );
      }
    }

    // Vérifier si le véhicule existe
    const existingVehicle = await prisma.vehicle.findUnique({
      where: { id: params.id },
    });

    if (!existingVehicle) {
      return NextResponse.json(
        { error: 'Véhicule non trouvé' },
        { status: 404 }
      );
    }

    // Gérer la photo
    const photoPath = await handlePhotoUpload(photo, existingVehicle.photo);

    // Mettre à jour le véhicule
    const vehicle = await prisma.vehicle.update({
      where: { id: params.id },
      data: {
        brand,
        affectation,
        photo: photoPath,
      },
    });

    return NextResponse.json(vehicle);
  } catch (error) {
    console.error('Error updating vehicle:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la mise à jour du véhicule' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const existingVehicle = await prisma.vehicle.findUnique({
      where: { id: params.id },
    });

    if (!existingVehicle) {
      return NextResponse.json(
        { error: 'Véhicule non trouvé' },
        { status: 404 }
      );
    }

    // Supprimer la photo si elle existe
    if (existingVehicle.photo) {
      const fullPath = path.join(process.cwd(), 'public', existingVehicle.photo);
      try {
        await unlink(fullPath);
      } catch (error) {
        console.error('Error deleting photo:', error);
      }
    }

    // Supprimer le véhicule
    await prisma.vehicle.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la suppression du véhicule' },
      { status: 500 }
    );
  }
}