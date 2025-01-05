'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'

const schema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  description: z.string().optional(),
  icon: z.string().optional(),
  category: z.string().min(1, 'La catégorie est requise'),
  isRequired: z.boolean().default(false),
})

type FormData = z.infer<typeof schema>

const categories = [
  'Fluides',
  'Sécurité',
  'Éclairage',
  'Freins',
  'Contrôles',
  'Visibilité',
  'Équipement',
  'État général',
]

export function CreatePartDefault() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true)
  
      // Ajout de l'heure locale au moment de la soumission
      const currentTime = new Date().toISOString();
      console.log('Current local time:', currentTime);
  
      const response = await fetch('/api/parts/defaults/seed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...data, submittedAt: currentTime}), // Inclure l'heure de soumission
      })
  
      if (!response.ok) {
        throw new Error('Failed to create check-in item')
      }
  
      // Réinitialiser le formulaire et fermer le modal
      reset()
      setIsOpen(false)
  
      // Rafraîchir la page pour voir les changements
      window.location.reload()
    } catch (error) {
      console.error('Error creating check-in item:', error)
      alert('Une erreur est survenue lors de la création')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <Button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Annuler' : 'Ajouter un élément'}
      </Button>

      {isOpen && (
        <div className="mt-4 bg-white shadow rounded-lg p-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nom
              </label>
              <input
                type="text"
                {...register('name')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                {...register('description')}
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Icône
              </label>
              <input
                type="text"
                {...register('icon')}
                placeholder="🔧"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Catégorie
              </label>
              <select
                {...register('category')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('isRequired')}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Élément obligatoire
              </label>
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Création...' : 'Créer'}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
