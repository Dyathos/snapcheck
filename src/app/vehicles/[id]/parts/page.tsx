import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import SelectParts from './SelectParts'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function VehiclePartsPage({
  params,
}: {
  params: { id: string }
}) {
  if (!params.id) {
    notFound()
  }

  try {
    const [vehicle, defaultParts, existingParts] = await Promise.all([
      prisma.vehicle.findUnique({
        where: { id: params.id },
      }),
      prisma.defaultPart.findMany({
        where: { isActive: true },
        orderBy: { category: 'asc' },
      }),
      prisma.part.findMany({
        where: { vehicleId: params.id },
        orderBy: { createdAt: 'desc' },
      }),
    ])

    if (!vehicle) {
      notFound()
    }

    return (
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            Pièces du véhicule - {vehicle.brand} {vehicle.model}
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Gérer les pièces</CardTitle>
            <CardDescription>
              Sélectionnez les pièces à suivre pour ce véhicule et définissez leur état
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SelectParts
              vehicleId={vehicle.id}
              defaultParts={defaultParts}
              existingParts={existingParts}
            />
          </CardContent>
        </Card>
      </div>
    )
  } catch (error) {
    console.error('Error loading vehicle parts:', error)
    return (
      <div className="container mx-auto py-6">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">
                Une erreur est survenue lors du chargement des pièces du véhicule.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
