const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function mainTestVehicle() {
  try {
    const vehicle = await prisma.vehicle.create({
      data: {
        brand: 'Renault',
        model: 'T-Series',
        year: 2023,
        mileage: 15000,
        plateNumber: 'XX-123-YY',
        vin: '2HGES16575H123456',
      },
    })
    console.log('Vehicle created:', vehicle)
  } catch (error) {
    console.error('Error creating vehicle:', error)
  } finally {
    await prisma.$disconnect()
  }
}

mainTestVehicle()
