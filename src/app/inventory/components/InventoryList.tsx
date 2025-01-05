'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { getHealthStatusColor, formatDate } from '@/lib/utils'
import { ClipboardCheckIcon, WrenchIcon, AlertTriangle, Calendar } from 'lucide-react'

interface Part {
  id: string
  name: string
  status: string
  severity: string
}

interface Vehicle {
  id: string
  brand: string
  affectation: string
  healthStatus: string | null
  lastInspection: Date | null
  photo: string | null
  parts: Part[]
}

interface InventoryListProps {
  vehicles: Vehicle[]
}

export function InventoryList({ vehicles }: InventoryListProps) {
  const searchParams = useSearchParams()
  const health = searchParams.get('health')
  const severity = searchParams.get('severity')
  const notInspected = searchParams.get('notInspected') === 'true'

  const filteredVehicles = vehicles.filter(vehicle => {
    if (health && vehicle.healthStatus !== health) return false
    if (severity && !vehicle.parts.some(part => part.severity === severity)) return false
    if (notInspected) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (vehicle.lastInspection && new Date(vehicle.lastInspection) >= today) return false
    }
    return true
  })

  return (
    <div className="space-y-4">
      {filteredVehicles.map((vehicle) => {
        const criticalParts = vehicle.parts.filter(part => part.severity === 'critical')
        const warningParts = vehicle.parts.filter(part => part.severity === 'high')

        return (
          <Card key={vehicle.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                {vehicle.photo && (
                  <img
                    src={vehicle.photo}
                    alt={`${vehicle.brand} ${vehicle.affectation}`} // Utilisation de 'affectation' pour le texte alternatif
                    className="w-16 h-16 rounded-md object-cover mr-4"
                  />
                )}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {vehicle.brand}
                  </h3>
                  <p className="text-sm text-gray-500">{vehicle.affectation}</p>
                </div>
                <Badge className={getHealthStatusColor(vehicle.healthStatus || 'defaultStatus')}>
                  {vehicle.healthStatus}
                </Badge>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  Dernière inspection: {vehicle.lastInspection ? formatDate(vehicle.lastInspection) : 'Non inspecté'}
                </div>

                {(criticalParts.length > 0 || warningParts.length > 0) && (
                  <div className="space-y-2">
                    {criticalParts.length > 0 && (
                      <div className="flex items-center gap-2 text-red-600">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="text-sm">
                          {criticalParts.length} pièce{criticalParts.length > 1 ? 's' : ''} critique{criticalParts.length > 1 ? 's' : ''}
                        </span>
                      </div>
                    )}
                    {warningParts.length > 0 && (
                      <div className="flex items-center gap-2 text-orange-600">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="text-sm">
                          {warningParts.length} pièce{warningParts.length > 1 ? 's' : ''} à surveiller
                        </span>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <Link href={`/vehicles/${vehicle.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      <WrenchIcon className="h-4 w-4 mr-2" />
                      Détails
                    </Button>
                  </Link>
                  <Link href={`/inspections/new/${vehicle.id}`} className="flex-1">
                    <Button className="w-full">
                      <ClipboardCheckIcon className="h-4 w-4 mr-2" />
                      Inspecter
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}

      {filteredVehicles.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertTriangle className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">Aucun véhicule ne correspond aux critères</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}