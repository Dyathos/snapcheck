'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/Button'

const healthStatuses = [
  { value: 'excellent', label: 'Excellent' },
  { value: 'good', label: 'Bon' },
  { value: 'fair', label: 'Moyen' },
  { value: 'poor', label: 'Mauvais' },
  { value: 'critical', label: 'Critique' },
]

const severityLevels = [
  { value: 'low', label: 'Faible' },
  { value: 'medium', label: 'Moyen' },
  { value: 'high', label: 'Élevé' },
  { value: 'critical', label: 'Critique' },
]

export function InventoryFilters() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const currentHealth = searchParams.get('health')
  const currentSeverity = searchParams.get('severity')
  const notInspectedToday = searchParams.get('notInspected') === 'true'

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(name, value)
    } else {
      params.delete(name)
    }
    return params.toString()
  }

  const toggleFilter = (name: string, value: string) => {
    const current = searchParams.get(name)
    const newValue = current === value ? '' : value
    router.push(pathname + '?' + createQueryString(name, newValue))
  }

  const toggleNotInspected = () => {
    router.push(
      pathname +
        '?' +
        createQueryString('notInspected', notInspectedToday ? '' : 'true')
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">
          État de santé
        </h3>
        <div className="space-y-2">
          {healthStatuses.map(({ value, label }) => (
            <Button
              key={value}
              variant={currentHealth === value ? 'default' : 'outline'}
              className="w-full justify-start"
              onClick={() => toggleFilter('health', value)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">
          Niveau de gravité des problèmes
        </h3>
        <div className="space-y-2">
          {severityLevels.map(({ value, label }) => (
            <Button
              key={value}
              variant={currentSeverity === value ? 'default' : 'outline'}
              className="w-full justify-start"
              onClick={() => toggleFilter('severity', value)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <Button
          variant={notInspectedToday ? 'default' : 'outline'}
          className="w-full justify-start"
          onClick={toggleNotInspected}
        >
          Non inspectés aujourd&apos;hui
        </Button>
      </div>
    </div>
  )
}
