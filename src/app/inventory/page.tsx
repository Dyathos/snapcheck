import { Suspense } from 'react'
import { InventoryFilters } from './components/InventoryFilters'
import { InventoryList } from './components/InventoryList'
import { prisma } from '@/lib/prisma'

async function getInventory() {
  try {
    const vehicles = await prisma.vehicle.findMany({
      include: {
        parts: true
      },
      orderBy: {
        brand: 'asc'
      }
    })
    return vehicles
  } catch (error) {
    console.error('Error fetching vehicles:', error)
    return []
  }
}

export default async function InventoryPage() {
  const vehicles = await getInventory()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Vue d&apos;Inventaire
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Visualisez l&apos;état global de votre flotte de véhicules
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="bg-white shadow-sm rounded-lg p-6">
            <Suspense fallback={<div>Chargement des filtres...</div>}>
              <InventoryFilters />
            </Suspense>
          </div>
        </div>

        <div className="lg:col-span-3">
          <Suspense fallback={<div>Chargement de l&apos;inventaire...</div>}>
            <InventoryList vehicles={vehicles} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}