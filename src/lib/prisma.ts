import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

// Définir un type global pour Prisma
const globalForPrisma = globalThis as { prisma?: PrismaClient };

// Création ou récupération de l'instance Prisma
const prisma = globalForPrisma.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
});

// Stocker l'instance dans l'objet global en mode développement
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Fonction pour créer un nouvel utilisateur avec un mot de passe haché
async function createUser(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  role: Role
) {
  try {
    // Hachage du mot de passe avant de l'enregistrer
    const hashedPassword = await bcrypt.hash(password, 10);

    return await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword, // Mot de passe haché
        role,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur:", error);
    throw new Error('Erreur lors de la création de l’utilisateur.');
  }
}

// Exporter l'instance Prisma et la fonction createUser
export { prisma, createUser };
