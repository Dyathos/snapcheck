import prisma from './client'

const standardItems = [
  // Fluides
  {
    id: 1,
    name: 'Niveau de refroidisseur',
    description: 'Vérifier le niveau du liquide de refroidissement',
    icon: '🌡️',
    category: 'Fluides',
    isRequired: true,
    isDefault: true,
  },
  {
    id: 2,
    name: 'Niveau d\'huile de frein',
    description: 'Vérifier le niveau d\'huile de frein',
    icon: '🛢️',
    category: 'Fluides',
    isRequired: true,
    isDefault: true,
  },
  {
    id: 3,
    name: 'Niveau d\'huile moteur',
    description: 'Vérifier le niveau d\'huile moteur',
    icon: '🛢️',
    category: 'Fluides',
    isRequired: true,
    isDefault: true,
  },
  {
    id: 4,
    name: 'Niveau de gazole',
    description: 'Vérifier le niveau de carburant',
    icon: '⛽',
    category: 'Fluides',
    isRequired: true,
    isDefault: true,
  },
  {
    id: 5,
    name: 'Niveau d\'huile de direction',
    description: 'Vérifier le niveau d\'huile de direction assistée',
    icon: '🛢️',
    category: 'Fluides',
    isRequired: true,
    isDefault: true,
  },

  // Sécurité
  {
    id: 6,
    name: 'Inspection des câbles',
    description: 'Inspecter les câbles et dommages d\'échappement',
    icon: '🔌',
    category: 'Sécurité',
    isRequired: true,
    isDefault: true,
  },
  {
    id: 7,
    name: 'Roue de secours et cric',
    description: 'Vérifier la présence et l\'état de la roue de secours et du cric',
    icon: '🔧',
    category: 'Sécurité',
    isRequired: true,
    isDefault: true,
  },
  {
    id: 8,
    name: 'État des pneus et jantes',
    description: 'Vérifier l\'état et la pression des pneus, ainsi que l\'état des jantes',
    icon: '🛞',
    category: 'Sécurité',
    isRequired: true,
    isDefault: true,
  },
  {
    id: 9,
    name: 'État du siège et ceinture',
    description: 'Vérifier l\'état du siège et de la ceinture de sécurité',
    icon: '💺',
    category: 'Sécurité',
    isRequired: true,
    isDefault: true,
  },
  {
    id: 10,
    name: 'Extincteurs',
    description: 'Vérifier la présence et l\'état des extincteurs',
    icon: '🧯',
    category: 'Sécurité',
    isRequired: true,
    isDefault: true,
  },
  {
    id: 11,
    name: 'Boîte de premiers soins',
    description: 'Vérifier la présence et le contenu de la boîte de premiers soins',
    icon: '🏥',
    category: 'Sécurité',
    isRequired: true,
    isDefault: true,
  },

  // Éclairage
  {
    id: 12,
    name: 'Phare avant',
    description: 'Vérifier le fonctionnement des phares avant',
    icon: '💡',
    category: 'Éclairage',
    isRequired: true,
    isDefault: true,
  },
  {
    id: 13,
    name: 'Feux arrière',
    description: 'Vérifier le fonctionnement des feux arrière',
    icon: '🚨',
    category: 'Éclairage',
    isRequired: true,
    isDefault: true,
  },

  // Freins
  {
    id: 14,
    name: 'Freins de service',
    description: 'Tester les freins de service',
    icon: '🛑',
    category: 'Freins',
    isRequired: true,
    isDefault: true,
  },
  {
    id: 15,
    name: 'Freins de stationnement',
    description: 'Tester les freins de stationnement',
    icon: '🅿️',
    category: 'Freins',
    isRequired: true,
    isDefault: true,
  },
]

async function mainCheckin() { 
  console.log('Seeding check-in items...')

  for (const item of standardItems) {
    await prisma.checkInItem.upsert({
      where: {
        id: item.id.toString(),
      },
      update: {
        description: item.description,
        icon: item.icon,
        isRequired: item.isRequired,
        isDefault: item.isDefault,
      },
      create: { ...item, id: item.id.toString() },
    })
  }

  console.log('Seeding completed.')
}

mainCheckin()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
