import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
    const { firstName, lastName, email, password, role } = await request.json();

    try {
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json({ error: 'Un utilisateur avec cet email existe déjà' }, { status: 400 });
        }

        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer l'utilisateur
        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                role
            }
        });

        return NextResponse.json({ 
            message: 'Compte créé avec succès',
            user: { 
                id: user.id, 
                email: user.email, 
                role: user.role 
            }
        }, { status: 201 });
    } catch (error) {
        console.error('Erreur lors de la création du compte:', error);
        return NextResponse.json({ error: 'Erreur lors de la création du compte' }, { status: 500 });
    }
}