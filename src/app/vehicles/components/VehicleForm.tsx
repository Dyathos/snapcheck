'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'

const vehicleSchema = z.object({
  brand: z.string().min(1, 'La marque est requise'),
  model: z.string().min(1, 'Le modèle est requis'),
  year: z.string().transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val > 1900 && val <= new Date().getFullYear(), {
      message: "L'année doit être valide"
    }),
  mileage: z.string().transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: 'Le kilométrage doit être un nombre positif'
    }),
  plateNumber: z.string().min(1, "La plaque d'immatriculation est requise"),
  vin: z.string().optional(),
})

type VehicleFormData = z.infer<typeof vehicleSchema>

export default function VehicleForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
  })

  async function onSubmit(data: VehicleFormData) {
    try {
      const response = await fetch('/api/vehicles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          year: data.year.toString(),
          mileage: data.mileage.toString(),
        }),
      })

      if (!response.ok) {
        throw new Error('Erreur réseau')
      }

      router.push('/vehicles')
      router.refresh()
    } catch (error) {
      console.error('Error creating vehicle:', error)
      setError('root', {
        type: 'manual',
        message: 'Une erreur est survenue lors de la création du véhicule.',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="brand">Marque</Label>
          <Input
            id="brand"
            type="text"
            {...register('brand')}
            error={errors.brand?.message}
          />
        </div>

        <div>
          <Label htmlFor="model">Modèle</Label>
          <Input
            id="model"
            type="text"
            {...register('model')}
            error={errors.model?.message}
          />
        </div>

        <div>
          <Label htmlFor="year">Année</Label>
          <Input
            id="year"
            type="number"
            {...register('year')}
            error={errors.year?.message}
          />
        </div>

        <div>
          <Label htmlFor="mileage">Kilométrage</Label>
          <Input
            id="mileage"
            type="number"
            {...register('mileage')}
            error={errors.mileage?.message}
          />
        </div>

        <div>
          <Label htmlFor="plateNumber">Plaque d'immatriculation</Label>
          <Input
            id="plateNumber"
            type="text"
            {...register('plateNumber')}
            error={errors.plateNumber?.message}
          />
        </div>

        <div>
          <Label htmlFor="vin">Numéro de série (VIN)</Label>
          <Input
            id="vin"
            type="text"
            {...register('vin')}
            error={errors.vin?.message}
          />
        </div>
      </div>

      {errors.root && (
        <div className="text-sm text-red-500">{errors.root.message}</div>
      )}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Création...' : 'Créer le véhicule'}
      </Button>
    </form>
  )
}
