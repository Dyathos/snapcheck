import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { defaultParts } from '@/lib/defaultParts';

export async function POST() {
  try {
    // Insérer toutes les pièces par défaut
    const createdParts = await prisma.defaultPart.createMany({
      data: defaultParts,
      skipDuplicates: true, // Évite les doublons basés sur les contraintes uniques
    });

    return NextResponse.json({
      success: true,
      message: `${createdParts.count} pièces par défaut créées`,
    });
  } catch (error) {
    console.error('Erreur lors de la création des pièces par défaut:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erreur lors de la création des pièces par défaut' 
      },
      { status: 500 }
    );
  }
}