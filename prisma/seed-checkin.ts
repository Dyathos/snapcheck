import { PrismaClient } from '@prisma/client'; // Import the PrismaClient
const prisma = new PrismaClient(); // Create an instance of PrismaClient

export const parts = [
  // Fluides
  {
    id: (1).toString(),
    name: 'Niveau de refroidisseur',
    description: 'Vérifier le niveau du liquide de refroidissement',
    icon: '🌡️',
    category: 'Fluides',
    isRequired: true,
    isDefault: true,
    vehicle: {
      connect: { id: "vehicle-id" }
    },
  },
  {
    id: (2).toString(),
    name: 'Niveau d\'huile de frein',
    description: 'Vérifier le niveau d\'huile de frein',
    icon: '🛢️',
    category: 'Fluides',
    isRequired: true,
    isDefault: true,
    vehicle: {
      connect: { id: "vehicle-id" }
    },
  },
  {
    id: (3).toString(),
    name: 'Niveau d\'huile moteur',
    description: 'Vérifier le niveau d\'huile moteur',
    icon: '🛢️',
    category: 'Fluides',
    isRequired: true,
    isDefault: true,
    vehicle: {
      connect: { id: "vehicle-id" }
    },
  },
  {
    id: (4).toString(),
    name: 'Niveau de gazole',
    description: 'Vérifier le niveau de carburant',
    icon: '⛽',
    category: 'Fluides',
    isRequired: true,
    isDefault: true,
    vehicle: {
      connect: { id: "vehicle-id" }
    },
  },
  {
    id: (5).toString(),
    name: 'Niveau d\'huile de direction',
    description: 'Vérifier le niveau d\'huile de direction assistée',
    icon: '🛢️',
    category: 'Fluides',
    isRequired: true,
    isDefault: true,
    vehicle: {
      connect: { id: "vehicle-id" }
    },
  },

  // Sécurité
  {
    id: (6).toString(),
    name: 'Inspection des câbles',
    description: 'Inspecter les câbles et dommages d\'échappement',
    icon: '🔌',
    category: 'Sécurité',
    isRequired: true,
    isDefault: true,
    vehicle: {
      connect: { id: "vehicle-id" }
    },
  },
  {
    id: (7).toString(),
    name: 'Roue de secours et cric',
    description: 'Vérifier la présence et l\'état de la roue de secours et du cric',
    icon: '🔧',
    category: 'Sécurité',
    isRequired: true,
    isDefault: true,
    vehicle: {
      connect: { id: "vehicle-id" }
    },
  },
  {
    id: (8).toString(),
    name: 'État des pneus et jantes',
    description: 'Vérifier l\'état et la pression des pneus, ainsi que l\'état des jantes',
    icon: '🛞',
    category: 'Sécurité',
    isRequired: true,
    isDefault: true,
    vehicle: {
      connect: { id: "vehicle-id" }
    },
  },
  {
    id: (9).toString(),
    name: 'État du siège et ceinture',
    description: 'Vérifier l\'état du siège et de la ceinture de sécurité',
    icon: '💺',
    category: 'Sécurité',
    isRequired: true,
    isDefault: true,
    vehicle: {
      connect: { id: "vehicle-id" }
    },
  },
  {
    id: (10).toString(),
    name: 'Extincteurs',
    description: 'Vérifier la présence et l\'état des extincteurs',
    icon: '🧯',
    category: 'Sécurité',
    isRequired: true,
    isDefault: true,
    vehicle: {
      connect: { id: "vehicle-id" }
    },
  },
  {
    id: (11).toString(),
    name: 'Boîte de premiers soins',
    description: 'Vérifier la présence et le contenu de la boîte de premiers soins',
    icon: '🏥',
    category: 'Sécurité',
    isRequired: true,
    isDefault: true,
    vehicle: {
      connect: { id: "vehicle-id" }
    },
  },

  // Éclairage
  {
    id: (12).toString(),
    name: 'Phare avant',
    description: 'Vérifier le fonctionnement des phares avant',
    icon: '💡',
    category: 'Éclairage',
    isRequired: true,
    isDefault: true,
    vehicle: {
      connect: { id: "vehicle-id" }
    },
  },
  {
    id: (13).toString(),
    name: 'Feux arrière',
    description: 'Vérifier le fonctionnement des feux arrière',
    icon: '🚨',
    category: 'Éclairage',
    isRequired: true,
    isDefault: true,
    vehicle: {
      connect: { id: "vehicle-id" }
    },
  },

  // Freins
  {
    id: (14).toString(),
    name: 'Freins de service',
    description: 'Tester les freins de service',
    icon: '🛑',
    category: 'Freins',
    isRequired: true,
    isDefault: true,
    vehicle: {
      connect: { id: "vehicle-id" }
    },
  },
  {
    id: (15).toString(),
    name: 'Freins de stationnement',
    description: 'Tester les freins de stationnement',
    icon: '🅿️',
    category: 'Freins',
    isRequired: true,
    isDefault: true,
    vehicle: {
      connect: { id: "vehicle-id" }
    },
  },

  // Pièces
  {
    id: (16).toString(),
    name: 'Filtre à air',
    description: 'Vérifier l\'état du filtre à air',
    icon: '🌬️',
    category: 'Pièces',
    isRequired: true,
    isDefault: true,
    vehicle: {
      connect: { id: "vehicle-id" }
    },
  },
  {
    id: (17).toString(),
    name: 'Batterie',
    description: 'Vérifier la charge et l\'état de la batterie',
    icon: '🔋',
    category: 'Pièces',
    isRequired: true,
    isDefault: true,
    vehicle: {
      connect: { id: "vehicle-id" }
    },
  },
  {
    id: (18).toString(),
    name: 'Essuie-glaces',
    description: 'Vérifier l\'état des essuie-glaces',
    icon: '🚿',
    category: 'Pièces',
    isRequired: true,
    isDefault: true,
    vehicle: {
      connect: { id: "vehicle-id" }
    },
  },
  {
    id: (19).toString(),
    name: 'Filtre à air par défaut',
    description: 'Vérifier l\'état du filtre à air par défaut',
    icon: '🌬️',
    category: 'Pièces',
    isRequired: true,
    isDefault: true,
    vehicle: {
      connect: { id: "vehicle-id" }
    },
  },
  {
    id: (20).toString(),
    name: 'Batterie par défaut',
    description: 'Vérifier la charge et l\'état de la batterie par défaut',
    icon: '🔋',
    category: 'Pièces',
    isRequired: true,
    isDefault: true,
    vehicle: {
      connect: { id: "vehicle-id" }
    },
  },
  {
    id: (21).toString(),
    name: 'Essuie-glaces par défaut',
    description: 'Vérifier l\'état des essuie-glaces par défaut',
    icon: '🚿',
    category: 'Pièces',
    isRequired: true,
    isDefault: true,
    vehicle: {
      connect: { id: "vehicle-id" }
    },
  }
];

async function main() {
  console.log('Seeding parts...');

  for (const part of parts) {
    await prisma.part.upsert({
      where: { id: part.id },
      update: { ...part, vehicle: { connect: { id: part.vehicle.connect.id } } },
      create: { ...part, vehicle: { connect: { id: part.vehicle.connect.id } } },
    });
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });