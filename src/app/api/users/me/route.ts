import { NextRequest, NextResponse } from 'next/server';
import { getSession } from 'next-auth/react'; 
import { prisma } from '@/lib/prisma';
import NextAuth from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }
}

export async function GET(request: NextRequest) {
    const session = await getSession({ req: request as any }); // Cast request to any

    if (!session || !session.user) {
        return NextResponse.json({ error: 'Utilisateur non connecté' }, { status: 401 });
    }

    const userId = session.user.id; 

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                firstName: true,
                lastName: true,
                email: true,
                role: true,
                photo: true,
            },
        });

        if (!user) {
            return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error('Erreur lors de la récupération de l’utilisateur:', error);
        return NextResponse.json({ error: 'Erreur lors de la récupération des informations de l’utilisateur' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    const session = await getSession({ req: request as any }); // Cast request to any

    if (!session || !session.user) {
        return NextResponse.json({ error: 'Utilisateur non connecté' }, { status: 401 });
    }

    const userId = session.user.id; 
    const body = await request.formData();

    const updatedData = {
        firstName: body.get('firstName')?.toString() || undefined,
        lastName: body.get('lastName')?.toString() || undefined,
        email: body.get('email')?.toString() || undefined,
        role: body.get('role')?.toString() || undefined,
        photo: body.get('photo') || undefined, // Assurez-vous de gérer le téléchargement de fichiers
    };

    try {
        const user = await prisma.user.update({
            where: { id: userId },
            data: updatedData,
        });
        return NextResponse.json(user);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l’utilisateur:', error);
        return NextResponse.json({ error: 'Erreur lors de la mise à jour des informations de l’utilisateur' }, { status: 500 });
    }
}
