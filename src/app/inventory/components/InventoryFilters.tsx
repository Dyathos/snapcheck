'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Filter, CheckCircle, AlertTriangle, Calendar } from 'lucide-react'

const healthStatuses = [
  { value: 'excellent', label: 'Excellent', icon: CheckCircle, color: 'text-green-500' },
  { value: 'good', label: 'Bon', icon: CheckCircle, color: 'text-blue-500' },
  { value: 'fair', label: 'Moyen', icon: AlertTriangle, color: 'text-yellow-500' },
  { value: 'poor', label: 'Mauvais', icon: AlertTriangle, color: 'text-orange-500' },
  { value: 'critical', label: 'Critique', icon: AlertTriangle, color: 'text-red-500' },
]

const severityLevels = [
  { value: 'low', label: 'Faible', color: 'border-blue-200 hover:border-blue-300 hover:bg-blue-50' },
  { value: 'medium', label: 'Moyen', color: 'border-yellow-200 hover:border-yellow-300 hover:bg-yellow-50' },
  { value: 'high', label: 'Élevé', color: 'border-orange-200 hover:border-orange-300 hover:bg-orange-50' },
  { value: 'critical', label: 'Critique', color: 'border-red-200 hover:border-red-300 hover:bg-red-50' },
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
    <Card className="bg-white shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg font-semibold">
          <Filter className="mr-2 h-5 w-5" />
          Filtres
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
            <CheckCircle className="mr-2 h-4 w-4" />
            État de santé
          </h3>
          <div className="space-y-2">
            {healthStatuses.map(({ value, label, icon: Icon, color }) => (
              <Button
                key={value}
                variant={currentHealth === value ? 'default' : 'outline'}
                className={`w-full justify-start ${currentHealth === value ? '' : color}`}
                onClick={() => toggleFilter('health', value)}
              >
                <Icon className="mr-2 h-4 w-4" />
                {label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Niveau de gravité
          </h3>
          <div className="space-y-2">
            {severityLevels.map(({ value, label, color }) => (
              <Button
                key={value}
                variant={currentSeverity === value ? 'default' : 'outline'}
                className={`w-full justify-start ${currentSeverity === value ? '' : color}`}
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
            <Calendar className="mr-2 h-4 w-4" />
            Non inspectés aujourd'hui
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}