const { prismaClient: prismaClientFromClient } = require('./client');
const prismaClient = new PrismaClient()

const standardParts = [
  // Moteur
  {
    name: 'Moteur',
    icon: '🔧',
    category: 'Moteur',
    description: 'Moteur principal du véhicule',
    isDefault: true,
  },
  {
    name: 'Filtre à air',
    icon: '💨',
    category: 'Moteur',
    description: 'Filtre à air du moteur',
    isDefault: true,
  },
  {
    name: 'Courroie',
    icon: '⭕',
    category: 'Moteur',
    description: 'Courroie de distribution',
    isDefault: true,
  },

  // Transmission
  {
    name: 'Boîte de vitesses',
    icon: '⚙️',
    category: 'Transmission',
    description: 'Boîte de vitesses manuelle ou automatique',
    isDefault: true,
  },
  {
    name: 'Embrayage',
    icon: '🔄',
    category: 'Transmission',
    description: 'Système d\'embrayage',
    isDefault: true,
  },

  // Freinage
  {
    name: 'Plaquettes de frein',
    icon: '🛑',
    category: 'Freinage',
    description: 'Plaquettes de frein avant et arrière',
    isDefault: true,
  },
  {
    name: 'Disques de frein',
    icon: '⭕',
    category: 'Freinage',
    description: 'Disques de frein avant et arrière',
    isDefault: true,
  },

  // Suspension
  {
    name: 'Amortisseurs',
    icon: '🔩',
    category: 'Suspension',
    description: 'Amortisseurs avant et arrière',
    isDefault: true,
  },
  {
    name: 'Ressorts',
    icon: '🌀',
    category: 'Suspension',
    description: 'Ressorts de suspension',
    isDefault: true,
  },

  // Électrique
  {
    name: 'Batterie',
    icon: '🔋',
    category: 'Électrique',
    description: 'Batterie principale',
    isDefault: true,
  },
  {
    name: 'Alternateur',
    icon: '⚡',
    category: 'Électrique',
    description: 'Système de charge',
    isDefault: true,
  },
]

async function main() {
  console.log('Seeding default parts...')

  for (const part of standardParts) {
    await prismaClientFromClient.defaultPart.upsert({
      where: {
        name: part.name,
      },
      update: {
        icon: part.icon,
        category: part.category,
        description: part.description,
        isDefault: part.isDefault,
      },
      create: part,
    })
  }

  console.log('Seeding completed.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prismaClientFromClient.$disconnect()
  })
