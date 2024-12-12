'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { getHealthStatusColor, formatDate } from '@/lib/utils'
import { PrismaClient } from '@prisma/client';
import { prisma } from '@/lib/prisma'

async function getInventory(searchParams: URLSearchParams) {
  let whereClause: any = {}

  const health = searchParams.get('health')
  const severity = searchParams.get('severity')
  const notInspected = searchParams.get('notInspected')

  if (health) {
    whereClause.health_status = health
  }
  if (severity) {
    whereClause.parts = {
      some: {
        severity: severity
      }
    }
  }
  if (notInspected === 'true') {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    whereClause.last_inspection = {
      lt: today.toISOString()
    }
  }

  try {
    try {
      const vehicles = await prisma.vehicle.findMany({
        include: {
          parts: true
        },
        where: whereClause,
        orderBy: {
          brand: 'asc'
        }
      })

      return vehicles
    } catch (error) {
      console.error('Error fetching vehicles:', error)
      throw new Error('Failed to fetch vehicles')
    }
  } catch (error) {
    console.error('Error fetching vehicles:', error)
    throw new Error('Failed to fetch vehicles')
  }
}

export async function InventoryList() {
  const searchParams = useSearchParams()
  const inventory = await getInventory(new URLSearchParams(Object.fromEntries(searchParams)))

  return (
    <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
      {inventory.map((vehicle) => (
        <div key={vehicle.id} className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {vehicle.brand}
              </h3>
              <p className="text-sm text-gray-500">{vehicle.brand}</p>
            </div>
            <Badge className={getHealthStatusColor(vehicle.healthStatus || 'defaultStatus')}>
              {vehicle.healthStatus}
            </Badge>
          </div>

          <div className="mt-4">
          <div className="text-sm text-gray-500">
            <p>Dernière inspection: {vehicle.lastInspection ? formatDate(vehicle.lastInspection) : 'Non inspecté'}</p>
          </div>


            {vehicle.parts && vehicle.parts.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900">
                  Problèmes détectés
                </h4>
                <div className="mt-2 space-y-2">
                  {vehicle.parts
                    .filter((part) => part.status === 'issue')
                    .map((part) => (
                      <div
                        key={part.id}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm text-gray-500">
                          {part.name}
                        </span>
                        <Badge className={getHealthStatusColor(part.severity || 'defaultStatus')}>
                          {part.severity}
                        </Badge>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex space-x-4">
            <Link href={`/vehicles/${vehicle.id}`}>
              <Button variant="outline">Voir les détails</Button>
            </Link>
            <Link href={`/inspections/new/${vehicle.id}`}>
              <Button>Nouvelle inspection</Button>
            </Link>
          </div>
        </div>
      ))}

      {inventory.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucun véhicule ne correspond aux critères</p>
        </div>
      )}
    </div>
  )
}
