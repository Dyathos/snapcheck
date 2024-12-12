'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

const partSchema = z.object({
  id: z.string(),
  status: z.enum(['good', 'warning', 'critical']),
  notes: z.string().optional(),
})

const inspectionSchema = z.object({
  inspector: z.string().min(1, 'Le nom de l\'inspecteur est requis'),
  status: z.enum(['pending', 'in_progress', 'completed']),
  notes: z.string().optional(),
  parts: z.array(partSchema),
})

type InspectionFormData = z.infer<typeof inspectionSchema>

type Part = {
  id: string
  name: string
  status: string
  severity: string
  description?: string
  category?: string
  icon?: string
}

type Vehicle = {
  id: string
  brand: string
  model: string
  parts: Part[]
}

export function InspectionForm({ vehicle }: { vehicle: Vehicle }) {
  const router = useRouter()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InspectionFormData>({
    resolver: zodResolver(inspectionSchema),
    defaultValues: {
      inspector: '',
      status: 'in_progress',
      notes: '',
      parts: vehicle.parts.map(part => ({
        id: part.id,
        status: 'good',
        notes: '',
      })),
    },
  })

  async function onSubmit(data: InspectionFormData) {
    try {
      setSubmitError(null)
      setIsSubmitting(true)

      const payload = {
        ...data,
        vehicleId: vehicle.id,
      }
      
      console.log('Submitting inspection data:', payload)

      const response = await fetch('/api/inspections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()
      console.log('Server response:', result)

      if (!response.ok) {
        console.error('Server error:', result)
        throw new Error(
          result.details || result.error || 'Erreur lors de la création de l\'inspection'
        )
      }

      console.log('Inspection created:', result)
      router.refresh()
      router.push('/inspections')
    } catch (error) {
      console.error('Error creating inspection:', error)
      setSubmitError(
        error instanceof Error 
          ? error.message 
          : 'Une erreur est survenue lors de la création de l\'inspection'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Inspecteur
        </label>
        <input
          type="text"
          {...register('inspector')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Nom de l'inspecteur"
        />
        {errors.inspector && (
          <p className="mt-1 text-sm text-red-600">{errors.inspector.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Notes générales
        </label>
        <textarea
          {...register('notes')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Notes optionnelles sur l'inspection"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Pièces à inspecter</h3>
        {vehicle.parts.map((part, index) => (
          <div
            key={part.id}
            className="border rounded-lg p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{part.name}</h4>
                {part.description && (
                  <p className="text-sm text-gray-500">{part.description}</p>
                )}
              </div>
              <Badge
                variant={
                  part.severity === 'critical'
                    ? 'destructive'
                    : part.severity === 'high'
                    ? 'warning'
                    : 'default'
                }
              >
                {part.severity}
              </Badge>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                État
              </label>
              <select
                {...register(`parts.${index}.status`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="good">Bon</option>
                <option value="warning">À surveiller</option>
                <option value="critical">Critique</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Notes
              </label>
              <textarea
                {...register(`parts.${index}.notes`)}
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Notes optionnelles sur cette pièce"
              />
            </div>

            <input
              type="hidden"
              {...register(`parts.${index}.id`)}
              value={part.id}
            />
          </div>
        ))}
      </div>

      {submitError && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-600">{submitError}</p>
        </div>
      )}

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="ml-3"
        >
          {isSubmitting ? 'Enregistrement...' : 'Enregistrer l\'inspection'}
        </Button>
      </div>
    </form>
  )
}
