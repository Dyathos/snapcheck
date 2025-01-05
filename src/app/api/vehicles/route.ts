import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { uploadVehicleImage } from '@/lib/storage';
import { mkdir } from 'fs/promises';
import path from 'path';

// Méthode GET pour récupérer tous les véhicules
export async function GET() {
  try {
    const vehicles = await prisma.vehicle.findMany({
      select: {
        id: true,
        brand: true,
        affectation: true,
        photo: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return NextResponse.json(vehicles);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération des véhicules' }, { status: 500 });
  }
}

// Méthode POST pour créer un nouveau véhicule
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const brand = formData.get('brand') as string;
    const affectation = formData.get('affectation') as string;
    const photo = formData.get('photo') as File | null;

    if (!brand || !affectation) {
      return NextResponse.json(
        { error: 'La marque et l\'affectation sont requises' },
        { status: 400 }
      );
    }

    // Créer le dossier uploads s'il n'existe pas
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'vehicles');
    await mkdir(uploadDir, { recursive: true });

    // Gérer l'upload de l'image si elle existe
    let photoPath = null;
    if (photo) {
      try {
        photoPath = await uploadVehicleImage(photo);
      } catch (error) {
        console.error('Error uploading image:', error);
        return NextResponse.json(
          { error: 'Erreur lors de l\'upload de l\'image' },
          { status: 500 }
        );
      }
    }

    const vehicle = await prisma.vehicle.create({
      data: {
        brand,
        affectation,
        photo: photoPath,
      },
    });

    return NextResponse.json(vehicle, { status: 201 });
  } catch (error) {
    console.error('Error creating vehicle:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la création du véhicule' },
      { status: 500 }
    );
  }
}