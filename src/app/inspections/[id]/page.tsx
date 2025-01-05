import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import { prisma } from '@/lib/prisma'
import { Badge } from '@/components/ui/Badge'

async function getInspection(id: string) {
  const inspection = await prisma.inspection.findUnique({
    where: { id },
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
  })

  if (!inspection) {
    notFound()
  }

  return inspection
}

export default async function InspectionPage({
  params,
}: {
  params: { id: string }
}) {
  const inspection = await getInspection(params.id)
  const vehicle = inspection.vehicles[0]?.vehicle

  if (!vehicle) {
    notFound()
  }

  return (
    <>
      <Header
        title={`Inspection du ${inspection.date.toLocaleDateString()}`}
        showBack
      />

      <div className="p-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white shadow-sm rounded-lg p-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-medium">Informations générales</h2>
                <dl className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Inspecteur</dt>
                    <dd className="mt-1 text-sm text-gray-900">{inspection.inspector}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Statut</dt>
                    <dd className="mt-1">
                      <Badge variant={inspection.status === 'completed' ? 'success' : 'default'}>
                        {inspection.status === 'completed' ? 'Terminée' : 'En cours'}
                      </Badge>
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Notes</dt>
                    <dd className="mt-1 text-sm text-gray-900">{inspection.notes || 'Aucune note'}</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h2 className="text-lg font-medium">Véhicule</h2>
                <dl className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Affectation</dt>
                    <dd className="mt-1 text-sm text-gray-900">{vehicle.brand} {vehicle.affectation}</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h2 className="text-lg font-medium">Pièces inspectées</h2>
                <div className="mt-4 space-y-4">
                  {inspection.vehicles[0]?.parts.map((inspectionPart) => (
                    <div
                      key={inspectionPart.id}
                      className="border rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{inspectionPart.part.name}</h4>
                          {inspectionPart.part.description && (
                            <p className="text-sm text-gray-500">{inspectionPart.part.description}</p>
                          )}
                        </div>
                        <Badge
                          variant={
                            inspectionPart.status === 'critical'
                              ? 'destructive'
                              : inspectionPart.status === 'warning'
                              ? 'warning'
                              : 'success'
                          }
                        >
                          {inspectionPart.status === 'critical'
                            ? 'Critique'
                            : inspectionPart.status === 'warning'
                            ? 'À surveiller'
                            : 'Bon état'}
                        </Badge>
                      </div>
                      {inspectionPart.notes && (
                        <p className="mt-2 text-sm text-gray-500">{inspectionPart.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
