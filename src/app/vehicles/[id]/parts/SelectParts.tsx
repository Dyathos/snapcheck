'use client'

import { useState } from 'react'
import { DefaultPart, Part } from '@prisma/client'
import { Button } from '@/components/ui/Button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'
import IconPicker from './IconPicker'

type PartSeverity = 'critical' | 'high' | 'medium' | 'low'

interface SelectedPart {
  id: string
  name: string
  icon: string
  category: string
  description?: string | null
  severity: PartSeverity
  status?: string
  isDefault?: boolean
}

interface SelectPartsProps {
  vehicleId: string
  defaultParts: DefaultPart[]
  existingParts?: Part[]
}

const SelectParts = ({ vehicleId, defaultParts, existingParts = [] }: SelectPartsProps) => {
  const router = useRouter()
  
  // Initialiser les pièces sélectionnées avec les pièces existantes
  const [selectedParts, setSelectedParts] = useState<SelectedPart[]>(
    existingParts.map((part) => ({
      id: part.id,
      name: part.name,
      icon: part.icon || '🔧',
      category: part.category || 'Autre',
      description: part.description,
      severity: (part.severity as PartSeverity) || 'low',
      status: part.status || 'good',
      isDefault: part.isDefault,
    }))
  )

  const [showNewPartDialog, setShowNewPartDialog] = useState(false)
  const [newPart, setNewPart] = useState({
    name: '',
    icon: '🔧',
    category: '',
    description: '',
  })

  const togglePart = (part: DefaultPart) => {
    const isSelected = selectedParts.some((p) => p.name === part.name)
    if (isSelected) {
      setSelectedParts(selectedParts.filter((p) => p.name !== part.name))
    } else {
      setSelectedParts([...selectedParts, {
        id: part.id,
        name: part.name,
        icon: part.icon,
        category: part.category,
        description: part.description,
        severity: 'low',
        status: 'good',
        isDefault: true,
      }])
    }
  }

  const updatePartSeverity = (partId: string, severity: PartSeverity) => {
    setSelectedParts(
      selectedParts.map((part) =>
        part.id === partId ? { ...part, severity } : part
      )
    )
  }

  const handleNewPartSubmit = () => {
    const customPart: SelectedPart = {
      id: `custom-${Date.now()}`,
      name: newPart.name,
      icon: newPart.icon,
      category: newPart.category,
      description: newPart.description,
      severity: 'low',
      status: 'good',
      isDefault: false,
    }
    setSelectedParts([...selectedParts, customPart])
    setShowNewPartDialog(false)
    setNewPart({ name: '', icon: '🔧', category: '', description: '' })
  }

  const handleSave = async () => {
    try {
      const partsToSave = selectedParts.map(part => ({
        name: part.name,
        icon: part.icon,
        category: part.category,
        description: part.description || '',
        severity: part.severity,
        status: part.status || 'good',
        isDefault: part.isDefault || false,
      }))

      console.log('Sending parts:', partsToSave)

      const response = await fetch(`/api/vehicles/${vehicleId}/parts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ parts: partsToSave }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Server error:', errorData)
        throw new Error(errorData.error || 'Failed to save parts')
      }

      router.refresh()
    } catch (error) {
      console.error('Error saving parts:', error)
      // Ici vous pouvez ajouter une notification d'erreur pour l'utilisateur
    }
  }

  const getPartsByCategory = () => {
    const categories = defaultParts
      .map((part) => part.category)
      .filter((category, index, self) => self.indexOf(category) === index); // Filtrer les catégories uniques
    return categories.map((category) => ({
      category,
      parts: defaultParts.filter((part) => part.category === category),
    }))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {getPartsByCategory().map(({ category, parts }) => (
          <div key={category} className="space-y-2">
            <h3 className="font-semibold">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {parts.map((part) => {
                const isSelected = selectedParts.some((p) => p.name === part.name)
                const selectedPart = selectedParts.find((p) => p.name === part.name)

                return (
                  <div
                    key={part.id}
                    className={`p-4 rounded-lg border ${
                      isSelected ? 'border-primary bg-primary/5' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{part.icon}</span>
                        <div>
                          <p className="font-medium">{part.name}</p>
                          <p className="text-sm text-gray-500">{part.description}</p>
                        </div>
                      </div>
                      <Button
                        variant={isSelected ? "secondary" : "outline"}
                        size="sm"
                        onClick={() => togglePart(part)}
                      >
                        {isSelected ? 'Retirer' : 'Ajouter'}
                      </Button>
                    </div>
                    {isSelected && (
                      <div className="mt-4">
                        <Label htmlFor={`severity-${part.id}`}>Criticité</Label>
                        <Select
                          value={selectedPart?.severity}
                          onValueChange={(value: PartSeverity) => updatePartSeverity(part.id, value)}
                        >
                          <SelectTrigger id={`severity-${part.id}`}>
                            <SelectValue placeholder="Sélectionner la criticité" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Faible</SelectItem>
                            <SelectItem value="medium">Moyenne</SelectItem>
                            <SelectItem value="high">Haute</SelectItem>
                            <SelectItem value="critical">Critique</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center pt-6 border-t">
        <Dialog open={showNewPartDialog} onOpenChange={setShowNewPartDialog}>
          <DialogTrigger asChild>
            <Button variant="outline">Ajouter une pièce personnalisée</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nouvelle pièce</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nom</Label>
                <Input
                  id="name"
                  value={newPart.name}
                  onChange={(e) => setNewPart({ ...newPart, name: e.target.value })}
                />
              </div>
              <div>
                <Label>Icône</Label>
                <IconPicker
                  value={newPart.icon}
                  onChange={(icon) => setNewPart({ ...newPart, icon: icon.value })}
                />
              </div>
              <div>
                <Label htmlFor="category">Catégorie</Label>
                <Input
                  id="category"
                  value={newPart.category}
                  onChange={(e) => setNewPart({ ...newPart, category: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newPart.description}
                  onChange={(e) => setNewPart({ ...newPart, description: e.target.value })}
                />
              </div>
              <Button onClick={handleNewPartSubmit} disabled={!newPart.name || !newPart.category}>
                Ajouter
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <Button onClick={handleSave}>Enregistrer les modifications</Button>
      </div>
    </div>
  )
}

export default SelectParts
