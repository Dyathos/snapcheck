'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MaintenanceTaskFormData } from '@/types/models'
import { Calendar } from '@/components/ui/calendar'

interface MaintenanceTaskFormProps {
  onSubmit: (data: MaintenanceTaskFormData) => Promise<void>
  inspections: Array<{
    id: string
    date: Date
    vehicle: {
      id: string
      brand: string
      affectation: string
    }
  }>
}

export function MaintenanceTaskForm({ onSubmit, inspections }: MaintenanceTaskFormProps) {
  const [formData, setFormData] = useState<MaintenanceTaskFormData>({
    description: '',
    priority: 'medium',
    status: 'pending',
    vehicleId: '',
    notes: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
    setFormData({
      description: '',
      priority: 'medium',
      status: 'pending',
      vehicleId: '',
      notes: '',
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nouvelle tâche de maintenance</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Inspection</Label>
            <Select
              value={formData.inspectionId}
              onValueChange={(value) => {
                const inspection = inspections.find(i => i.id === value)
                if (inspection) {
                  setFormData({
                    ...formData,
                    inspectionId: value,
                    vehicleId: inspection.vehicle.id
                  })
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une inspection" />
              </SelectTrigger>
              <SelectContent>
                {inspections?.map((inspection) => (
                  <SelectItem key={inspection.id} value={inspection.id}>
                    {inspection.vehicle.brand} - {inspection.vehicle.affectation} - {new Date(inspection.date).toLocaleDateString()}
                  </SelectItem>
                )) || <SelectItem disabled value="no-inspection">Aucune inspection disponible</SelectItem>}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Description</Label>
            <Input
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Date de début</Label>
              <Calendar
                date={formData.startDate}
                onDateChange={(date) => setFormData({ ...formData, startDate: date })}
                placeholder="Date de début"
              />
            </div>
            <div>
              <Label>Date de fin prévue</Label>
              <Calendar
                date={formData.endDate}
                onDateChange={(date) => setFormData({ ...formData, endDate: date })}
                placeholder="Date de fin"
              />
            </div>
          </div>

          <div>
            <Label>Priorité</Label>
            <Select
              value={formData.priority}
              onValueChange={(value: MaintenanceTaskFormData['priority']) => 
                setFormData({ ...formData, priority: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner la priorité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Faible</SelectItem>
                <SelectItem value="medium">Moyenne</SelectItem>
                <SelectItem value="high">Haute</SelectItem>
                <SelectItem value="critical">Critique</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Assigné à</Label>
            <Input
              value={formData.assignedTo}
              onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
            />
          </div>

          <div>
            <Label>Notes</Label>
            <Input
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <Button type="submit">Créer la tâche</Button>
        </form>
      </CardContent>
    </Card>
  )
}