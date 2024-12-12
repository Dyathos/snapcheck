'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { CheckInItem } from '@prisma/client'

type CheckInItemWithStatus = CheckInItem & {
  status?: string
  severity?: string
  description?: string
}

interface CheckInGridProps {
  items: CheckInItemWithStatus[]
  onItemSelect: (item: CheckInItemWithStatus) => void
  selectedItems: string[]
}

export function CheckInGrid({ items, onItemSelect, selectedItems }: CheckInGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Obtenir les catégories uniques
  const categories = Array.from(new Set(items.map((item) => item.category)))

  // Filtrer les éléments par catégorie
  const filteredItems = selectedCategory
    ? items.filter((item) => item.category === selectedCategory)
    : items

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'warning':
        return 'bg-yellow-100 text-yellow-800'
      case 'critical':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-green-100 text-green-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Filtres par catégorie */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? 'default' : 'outline'}
          onClick={() => setSelectedCategory(null)}
          className="text-sm"
        >
          Tous
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(category)}
            className="text-sm"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Grille d'éléments */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemSelect(item)}
            className={`flex items-center p-4 rounded-lg border transition-colors ${
              selectedItems.includes(item.id)
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200 hover:border-blue-500'
            }`}
          >
            <div className="flex-1 text-left">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{item.icon}</span>
                <h3 className="font-medium">{item.name}</h3>
              </div>
              <p className="text-sm text-gray-500 mt-1">{item.description}</p>
              {item.status && (
                <Badge className={`mt-2 ${getStatusColor(item.status)}`}>
                  {item.status}
                  {item.severity && ` - ${item.severity}`}
                </Badge>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
