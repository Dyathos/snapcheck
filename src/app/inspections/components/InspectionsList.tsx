

import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'
import { prisma } from '@/lib/prisma'
import { ChevronRightIcon, PlusIcon } from '@heroicons/react/24/outline'

async function getInspections() {
  try {
    const inspections = await prisma.inspection.findMany({
      include: {
        vehicles: {
          include: {
            vehicle: true,
            parts: {
              include: {
                part: true,
              },
            },
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    })
    return inspections
  } catch (error) {
    console.error('Error fetching inspections:', error)
    return []
  }
}

export async function InspectionsList() {
  const inspections = await getInspections()

  if (!inspections || inspections.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="mt-2 text-sm font-semibold text-gray-900">Aucune inspection</h3>
        <p className="mt-1 text-sm text-gray-500">Commencez par créer une inspection pour un véhicule.</p>
        <div className="mt-6">
          <Link
            href="/inspections/new"
            className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Nouvelle inspection
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="divide-y divide-gray-200">
      {inspections.map((inspection) => {
        const vehicle = inspection.vehicles[0]?.vehicle
        if (!vehicle) return null

        const criticalParts = inspection.vehicles[0]?.parts.filter(
          part => part.status === 'critical'
        ).length || 0

        return (
          <Link
            key={inspection.id}
            href={`/inspections/${inspection.id}`}
            className="block hover:bg-gray-50"
          >
            <div className="px-4 py-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    {vehicle.brand} {vehicle.affectation}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Inspecteur : {inspection.inspector}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDate(inspection.date)}
                  </p>
                </div>
                <div className="flex items-center">
                  <Badge variant={criticalParts > 0 ? 'destructive' : inspection.status === 'completed' ? 'success' : 'default'}>
                    {criticalParts > 0 
                      ? `${criticalParts} pièce${criticalParts > 1 ? 's' : ''} critique${criticalParts > 1 ? 's' : ''}` 
                      : inspection.status === 'completed' 
                        ? 'Terminée' 
                        : 'En cours'}
                  </Badge>
                  <ChevronRightIcon className="ml-4 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
