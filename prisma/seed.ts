import prisma from './client'

async function mainSeed() {
  // Créer un véhicule de test
  const vehicle = await prisma.vehicle.create({
    data: {
      brand: 'Renault',
      model: 'Clio',
      year: 2020,
      mileage: 50000,
      plateNumber: 'AA-123-BB',
      vin: 'VF1RFB00066666666',
    },
  })

  // Créer quelques pièces pour le véhicule
  const [huileMoteur, plaquettesAvant, pneusAvant] = await Promise.all([
    prisma.part.create({
      data: {
        vehicleId: vehicle.id,
        name: 'Huile moteur',
        status: 'good',
        severity: 'low',
        category: 'Moteur',
        icon: '🛢️',
        description: 'Niveau et qualité de l\'huile moteur',
      },
    }),
    prisma.part.create({
      data: {
        vehicleId: vehicle.id,
        name: 'Plaquettes avant',
        status: 'warning',
        severity: 'medium',
        category: 'Freins',
        icon: '🛑',
        description: 'État des plaquettes de frein avant',
      },
    }),
    prisma.part.create({
      data: {
        vehicleId: vehicle.id,
        name: 'Pneus avant',
        status: 'critical',
        severity: 'high',
        category: 'Pneumatiques',
        icon: '🛞',
        description: 'État et pression des pneus avant',
      },
    }),
  ])

  // Créer une inspection de test
  const inspection = await prisma.inspection.create({
    data: {
      inspector: 'Jean Dupont',
      status: 'completed',
      notes: 'Inspection initiale',
      vehicles: {
        create: {
          vehicleId: vehicle.id,
          status: 'good',
          notes: 'RAS',
          parts: {
            create: [
              {
                partId: huileMoteur.id,
                status: 'good',
                notes: 'Niveau correct',
              },
              {
                partId: plaquettesAvant.id,
                status: 'warning',
                notes: 'À changer prochainement',
              },
            ],
          },
        },
      },
    },
  })

  console.log('Seed data created successfully')
}

mainSeed()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
