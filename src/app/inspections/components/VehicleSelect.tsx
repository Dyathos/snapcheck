'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/Badge'

type Vehicle = {
  id: string
  brand: string
  model: string
  year: number
  plateNumber: string
}

export function VehicleSelect() {
  const router = useRouter()
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/vehicles')
      .then((res) => res.json())
      .then((data) => {
        setVehicles(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error loading vehicles:', err)
        setError('Erreur lors du chargement des véhicules')
        setLoading(false)
      })
  }, [])

  const handleVehicleSelect = (vehicleId: string) => {
    router.push(`/inspections/new/${vehicleId}`)
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Chargement des véhicules...</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-24 bg-gray-100 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-4">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 text-blue-600 hover:text-blue-500"
        >
          Réessayer
        </button>
      </div>
    )
  }

  if (vehicles.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500">Aucun véhicule disponible</p>
        <a
          href="/vehicles/new"
          className="mt-2 inline-block text-blue-600 hover:text-blue-500"
        >
          Ajouter un véhicule
        </a>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Sélectionnez un véhicule</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {vehicles.map((vehicle) => (
          <button
            key={vehicle.id}
            onClick={() => handleVehicleSelect(vehicle.id)}
            className="flex items-center justify-between p-4 bg-white border rounded-lg hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <div>
              <h3 className="font-medium text-gray-900">{vehicle.brand} {vehicle.model}</h3>
              <p className="text-sm text-gray-500">{vehicle.plateNumber}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
