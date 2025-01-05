import { NextResponse } from 'next-auth/next';
import { signIn } from 'next-auth/react';

export async function POST(request: Request) {
    const { email, password } = await request.json();

    try {
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password
        });

        if (result?.error) {
            return NextResponse.json({ error: 'Identifiants invalides' }, { status: 401 });
        }

        return NextResponse.json({ message: 'Connexion réussie' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Erreur lors de la connexion' }, { status: 500 });
    }
}