import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const defaultParts = [
  {
    name: 'Niveau de Liquide de Refroidissement',
    icon: 'alert-circle',
    category: 'Fluides et Niveaux',
    description: 'Vérification du niveau de liquide de refroidissement',
    isActive: true,
    isDefault: true
  },
  {
    name: 'Niveau Huile de Frein',
    icon: 'droplet',
    category: 'Fluides et Niveaux',
    description: 'Contrôle du niveau d\'huile de frein',
    isActive: true,
    isDefault: true
  },
  {
    name: 'Niveau Huile Moteur',
    icon: 'oil-can',
    category: 'Fluides et Niveaux',
    description: 'Vérification du niveau d\'huile moteur',
    isActive: true,
    isDefault: true
  },
  {
    name: 'Niveau de Carburant',
    icon: 'fuel',
    category: 'Fluides et Niveaux',
    description: 'Contrôle du niveau de carburant',
    isActive: true,
    isDefault: true
  },
  {
    name: 'Niveau Huile Direction',
    icon: 'steering',
    category: 'Fluides et Niveaux',
    description: 'Vérification du niveau d\'huile de direction assistée',
    isActive: true,
    isDefault: true
  },

  // Système de Freinage
  {
    name: 'Test Freins de Service',
    icon: 'brake-warning',
    category: 'Système de Freinage',
    description: 'Vérification des freins de service',
    isActive: true,
    isDefault: true
  },
  {
    name: 'Test Frein de Stationnement',
    icon: 'parking',
    category: 'Système de Freinage',
    description: 'Contrôle du frein de stationnement',
    isActive: true,
    isDefault: true
  },

  // Éclairage
  {
    name: 'Phares Avant',
    icon: 'lightbulb',
    category: 'Éclairage',
    description: 'Vérification des phares avant',
    isActive: true,
    isDefault: true
  },
  {
    name: 'Feux Arrière',
    icon: 'lightbulb-outline',
    category: 'Éclairage',
    description: 'Contrôle des feux arrière',
    isActive: true,
    isDefault: true
  },

  // Sécurité
  {
    name: 'Extincteur',
    icon: 'fire-extinguisher',
    category: 'Sécurité',
    description: 'Vérification de l\'extincteur',
    isActive: true,
    isDefault: true
  },
  {
    name: 'Trousse de Premiers Secours',
    icon: 'first-aid',
    category: 'Sécurité',
    description: 'Contrôle de la trousse de premiers secours',
    isActive: true,
    isDefault: true
  },
  {
    name: 'Interrupteurs d\'Isolation',
    icon: 'toggle-off',
    category: 'Sécurité',
    description: 'Vérification des interrupteurs d\'isolation',
    isActive: true,
    isDefault: true
  },

  // Pneumatiques et Roues
  {
    name: 'Roue de Secours et Cric',
    icon: 'car-wheel',
    category: 'Pneumatiques et Roues',
    description: 'Vérification de la roue de secours et du cric',
    isActive: true,
    isDefault: true
  },
  {
    name: 'État des Pneus et Jantes',
    icon: 'car-tire',
    category: 'Pneumatiques et Roues',
    description: 'Contrôle de l\'état des pneus et des jantes',
    isActive: true,
    isDefault: true
  },

  // Habitacle
  {
    name: 'État des Sièges et Ceintures',
    icon: 'car-seat',
    category: 'Habitacle',
    description: 'Vérification des sièges et ceintures de sécurité',
    isActive: true,
    isDefault: true
  },
  {
    name: 'Propreté de l\'Habitacle',
    icon: 'broom',
    category: 'Habitacle',
    description: 'Contrôle de la propreté de l\'habitacle',
    isActive: true,
    isDefault: true
  },
  {
    name: 'Fonctionnement Climatisation',
    icon: 'fan',
    category: 'Habitacle',
    description: 'Vérification du système de climatisation',
    isActive: true,
    isDefault: true
  },

  // Équipements de Communication
  {
    name: 'Fonctionnement Radio',
    icon: 'radio',
    category: 'Équipements de Communication',
    description: 'Contrôle du système radio',
    isActive: true,
    isDefault: true
  },
  {
    name: 'Caméra de Gestion de Fatigue',
    icon: 'eye',
    category: 'Équipements de Communication',
    description: 'Vérification de la caméra de surveillance de fatigue',
    isActive: true,
    isDefault: true
  },
]

async function main() {
  console.log('Début de la génération des pièces par défaut...')
  
  try {
    const result = await prisma.defaultPart.createMany({
      data: defaultParts,
      skipDuplicates: true,
    })
    
    console.log(`✅ ${result.count} pièces créées avec succès`)
  } catch (error) {
    console.error('❌ Erreur:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()