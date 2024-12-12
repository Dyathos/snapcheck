import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import { prisma } from '@/lib/prisma'
import { CheckInForm } from './CheckInForm'

async function getVehicle(id: string) {
  const vehicle = await prisma.vehicle.findUnique({
    where: { id },
    include: {
      checkInParts: {
        include: {
          item: true,
        },
      },
    },
  })

  if (!vehicle) {
    notFound()
  }

  return vehicle
}

async function getCheckInItems() {
  return prisma.checkInItem.findMany({
    orderBy: {
      category: 'asc',
    },
  })
}

export default async function VehicleCheckInPage({
  params,
}: {
  params: { id: string }
}) {
  const [vehicle, checkInItems] = await Promise.all([
    getVehicle(params.id),
    getCheckInItems(),
  ])

  // Fusionner les éléments de check-in avec leur statut actuel
  const itemsWithStatus = checkInItems.map((item) => {
    const existingPart = vehicle.checkInParts.find((part) => part.itemId === item.id)
    return {
      ...item,
      status: existingPart?.status || 'ok',
      // severity: existingPart?.severity, // Supprimé
      description: item.description || '',
    }
  })

  return (
    <>
      <Header
        title={`Check-in quotidien - ${vehicle.brand}`}
        showBack
      />
      
      <div className="p-4">
        <div className="max-w-7xl mx-auto">
          <CheckInForm
            vehicleId={vehicle.id}
            items={itemsWithStatus}
          />
        </div>
      </div>
    </>
  )
}
