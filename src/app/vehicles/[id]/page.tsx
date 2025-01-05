// app/vehicles/[id]/page.tsx

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Badge } from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'
import { ClipboardDocumentCheckIcon, WrenchIcon } from '@heroicons/react/24/outline'
import { EditVehicle } from '../components/EditVehicle'
import AppLayout from '@/components/layout/AppLayout'

async function getVehicle(id: string) {
  const vehicle = await prisma.vehicle.findUnique({
    where: { id },
    include: {
      inspectionVehicles: {
        include: {
          inspection: true
        },
        orderBy: {
          inspection: {
            date: 'desc'
          }
        }
      },
      parts: {
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  })

  if (!vehicle) {
    notFound()
  }

  return vehicle
}

export default async function VehiclePage({
  params,
}: {
  params: { id: string }
}) {
  const vehicle = await getVehicle(params.id)
  const criticalParts = vehicle.parts.filter(part => part.severity === 'critical').length

  return (
    <>
    <AppLayout title={`${vehicle.brand} ${vehicle.affectation}`}
        showBack>
      {/* Actions */}
      <div className="p-4">
            <div className="flex space-x-4">
              <Link
                href={`/inspections/new/${vehicle.id}`}
                className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <ClipboardDocumentCheckIcon className="h-5 w-5 mr-2" />
                Nouvelle inspection
              </Link>
              <Link
                href={`/vehicles/${vehicle.id}/parts`}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <WrenchIcon className="h-5 w-5 mr-2" />
                Gérer les pièces
              </Link>
              <EditVehicle vehicleId={vehicle.id} initialData={{
                brand: vehicle.brand,
                affectation: vehicle.affectation
              }}/>
            </div>
          </div>

      <div className="p-4 space-y-6">
        <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
          {/* Informations générales */}
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  {vehicle.brand} {vehicle.affectation}
                </h2>
                {vehicle.photo && (
                <img
                  src={vehicle.photo}
                  alt={`${vehicle.brand} ${vehicle.affectation}`} // Utilisation de 'affectation' pour le texte alternatif
                  className="w-16 h-16 rounded-md object-cover mr-4"
                />
              )}
              </div>
              <div className="flex items-center space-x-2">
                {criticalParts > 0 && (
                  <Badge variant="destructive">
                    {criticalParts} pièce{criticalParts > 1 ? 's' : ''} critique{criticalParts > 1 ? 's' : ''}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          
          {/* Historique des inspections */}
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Historique des inspections
            </h3>
            <div className="space-y-4">
              {vehicle.inspectionVehicles.length > 0 ? (
                vehicle.inspectionVehicles.map((iv) => (
                  <div
                    key={iv.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {formatDate(iv.inspection.date)}
                      </div>
                      <div className="text-sm text-gray-500">
                        Par {iv.inspection.inspector}
                      </div>
                    </div>
                    <Badge
                      variant={
                        iv.status === 'critical'
                          ? 'destructive'
                          : iv.status === 'warning'
                          ? 'warning'
                          : 'success'
                      }
                    >
                      {iv.status === 'critical'
                        ? 'Critique'
                        : iv.status === 'warning'
                        ? 'À surveiller'
                        : 'OK'}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  Aucune inspection enregistrée
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      </AppLayout>
    </>
  )
}
