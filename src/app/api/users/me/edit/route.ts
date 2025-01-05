import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { handlePhotoUpload } from '@/lib/pinterest';
import { User } from '@/types'; // Import User type

// Define an interface for the session using the existing User type
interface Session {
  user?: User;
}

export async function PATCH(request: Request) {
  try {
    const session: Session | null = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const firstname = formData.get('firstname') as string;
    const lastname = formData.get('lastname') as string;
    const badge = formData.get('badge') as string;
    const email = formData.get('email') as string;
    const telephone = formData.get('telephone') as string;
    const department = formData.get('department') as string;
    const photo = formData.get('photo') as File | null;

    if (!firstname || !lastname || !email) {
      return NextResponse.json(
        { error: 'Les champs prénom, nom et email sont requis' },
        { status: 400 }
      );
    }

    // Convertir l'ID en nombre si c'est une chaîne
    const userId = typeof session.user.id === 'string' ? parseInt(session.user.id) : session.user.id;

    let photoPath = null;
    if (photo) {
      const existingUser = await prisma.user.findUnique({
        where: { id: userId },
        select: { photo: true }
      });
      photoPath = await handlePhotoUpload(photo, existingUser?.photo, 'users');
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName: firstname ?? null,
        lastName: lastname ?? null,
        badge: badge ?? null,
        email: email ?? null,
        phone: telephone ?? null,
        department: department ?? null,
        ...(photo && { photo: photoPath }),
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la mise à jour du profil' },
      { status: 500 }
    );
  }
}