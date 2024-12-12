'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckInGrid } from '@/components/checkin/CheckInGrid'
import { Button } from '@/components/ui/Button'
import type { CheckInItem } from '@prisma/client'

type CheckInItemWithStatus = CheckInItem & {
  status?: string
  severity?: string
  description?: string
}

interface CheckInFormProps {
  vehicleId: string
  items: CheckInItemWithStatus[]
}

export function CheckInForm({ vehicleId, items }: CheckInFormProps) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [itemDetails, setItemDetails] = useState<Record<string, {
    severity: string
    description: string
  }>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleItemSelect = (item: CheckInItemWithStatus) => {
    setSelectedItems((prev) =>
      prev.includes(item.id)
        ? prev.filter((id) => id !== item.id)
        : [...prev, item.id]
    )
  }

  const handleSeverityChange = (itemId: string, severity: string) => {
    setItemDetails((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        severity,
      },
    }))
  }

  const handleDescriptionChange = (itemId: string, description: string) => {
    setItemDetails((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        description,
      },
    }))
  }

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)

      // Préparer les données pour l'API
      const updates = items.map((item) => ({
        itemId: item.id,
        status: selectedItems.includes(item.id) ? 'warning' : 'ok',
        severity: selectedItems.includes(item.id)
          ? itemDetails[item.id]?.severity || 'low'
          : null,
        description: selectedItems.includes(item.id)
          ? itemDetails[item.id]?.description || ''
          : null,
      }))

      // Envoyer les données à l'API
      const response = await fetch(`/api/vehicles/${vehicleId}/checkin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ updates }),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour')
      }

      router.refresh()
      router.push(`/vehicles/${vehicleId}`)
    } catch (error) {
      console.error('Error updating check-in:', error)
      alert('Une erreur est survenue lors de la mise à jour')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-700">
                Sélectionnez les éléments présentant un problème. Les éléments non
                sélectionnés seront considérés comme étant en bon état.
              </p>
            </div>
            <CheckInGrid
              items={items}
              onItemSelect={handleItemSelect}
              selectedItems={selectedItems}
            />
            <div className="flex justify-end">
              <Button onClick={() => setStep(2)} disabled={selectedItems.length === 0}>
                Continuer
              </Button>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-yellow-700">
                Précisez la gravité et ajoutez une description pour chaque élément
                sélectionné.
              </p>
            </div>
            <div className="space-y-4">
              {selectedItems.map((itemId) => {
                const item = items.find((i) => i.id === itemId)
                if (!item) return null

                return (
                  <div
                    key={itemId}
                    className="bg-white p-4 rounded-lg border space-y-4"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{item.icon}</span>
                      <h3 className="font-medium">{item.name}</h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Gravité
                        </label>
                        <select
                          value={itemDetails[itemId]?.severity || 'low'}
                          onChange={(e) =>
                            handleSeverityChange(itemId, e.target.value)
                          }
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        >
                          <option value="low">Faible</option>
                          <option value="medium">Moyenne</option>
                          <option value="high">Haute</option>
                          <option value="critical">Critique</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Description
                        </label>
                        <textarea
                          value={itemDetails[itemId]?.description || ''}
                          onChange={(e) =>
                            handleDescriptionChange(itemId, e.target.value)
                          }
                          rows={2}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Retour
              </Button>
              <Button onClick={() => setStep(3)}>Continuer</Button>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-700">
                Vérifiez le récapitulatif des problèmes avant de valider.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Éléments avec problèmes</h3>
              <div className="space-y-4">
                {selectedItems.map((itemId) => {
                  const item = items.find((i) => i.id === itemId)
                  if (!item) return null

                  return (
                    <div
                      key={itemId}
                      className="bg-white p-4 rounded-lg border"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{item.icon}</span>
                          <h4 className="font-medium">{item.name}</h4>
                        </div>
                        <div className="text-sm text-gray-500">
                          Gravité: {itemDetails[itemId]?.severity || 'faible'}
                        </div>
                      </div>
                      {itemDetails[itemId]?.description && (
                        <p className="mt-2 text-sm text-gray-600">
                          {itemDetails[itemId].description}
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="mt-6">
                <h3 className="font-medium text-lg">Éléments en bon état</h3>
                <p className="text-sm text-gray-600 mt-2">
                  {items.length - selectedItems.length} éléments sont en bon état.
                </p>
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>
                Retour
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Enregistrement...' : 'Valider'}
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Indicateur de progression */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            1
          </div>
          <div className="w-16 h-1 bg-gray-200">
            <div
              className={`h-full ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}
            />
          </div>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            2
          </div>
          <div className="w-16 h-1 bg-gray-200">
            <div
              className={`h-full ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}
            />
          </div>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            3
          </div>
        </div>
      </div>

      {renderStep()}
    </div>
  )
}
