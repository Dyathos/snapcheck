'use client'

import { useState } from 'react'
import { Switch } from '@/components/ui/Switch'
import { Button } from '@/components/ui/Button'
import type { CheckInItem } from '@prisma/client'

interface CheckInItemListProps {
  items: CheckInItem[]
}

export function CheckInItemList({ items }: CheckInItemListProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])

  const categories = Array.from(new Set(items.map((item) => item.category)))

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }

  const toggleItemStatus = async (item: CheckInItem) => {
    try {
      const response = await fetch(`/api/settings/checkin/${item.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isActive: !item.isActive,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update item status')
      }

      // Rafraîchir la page pour voir les changements
      window.location.reload()
    } catch (error) {
      console.error('Error updating item status:', error)
      alert('Une erreur est survenue lors de la mise à jour')
    }
  }

  

  return (
    <div className="divide-y">
      {categories.map((category) => (
        <div key={category} className="p-4">
          <button
            onClick={() => toggleCategory(category)}
            className="w-full flex items-center justify-between text-left"
          >
            <h3 className="text-lg font-medium">{category}</h3>
            <span className="text-gray-500">
              {expandedCategories.includes(category) ? '▼' : '▶'}
            </span>
          </button>

          {expandedCategories.includes(category) && (
            <div className="mt-4 space-y-4">
              {items
                .filter((item) => item.category === category)
                .map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex items-center space-x-4">
                      {item.icon && (
                        <span className="text-xl">{item.icon}</span>
                      )}
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        {item.description && (
                          <p className="text-sm text-gray-500">
                            {item.description}
                          </p>
                        )}
                        {item.isDefault && (
                          <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 mt-1">
                            Standard
                          </span>
                        )}
                        {item.isRequired && (
                          <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 mt-1 ml-2">
                            Obligatoire
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
