// src/app/maintenance/components/MaintenanceTasks.tsx
'use client'

import { useState, useEffect } from 'react'
import { MaintenanceTaskForm } from '@/components/maintenance/MaintenanceTaskForm'
import { MaintenanceTask, Inspection, MaintenanceTaskFormData } from '@/types/models'
import MaintenanceTaskList from '@/components/maintenance/MaintenanceTaskList'

export default function MaintenanceTasks() {
  const [tasks, setTasks] = useState<MaintenanceTask[]>([])
  const [inspections, setInspections] = useState<Inspection[]>([])

  useEffect(() => {
    fetchTasks()
    fetchInspections()
  }, [])

  const fetchTasks = async () => {
    const response = await fetch('/api/maintenance')
    const data = await response.json()
    setTasks(data)
  }

  const fetchInspections = async () => {
    const response = await fetch('/api/inspections')
    const data = await response.json()
    setInspections(data)
  }

  const handleSubmit = async (formData: MaintenanceTaskFormData, inspectionId: string) => {
    const inspection = inspections.find(i => i.id === inspectionId)
    if (!inspection) return

    const task = {
      vehicleId: inspection.vehicle.id,
      inspectionId: inspection.id,
      ...formData,
    }

    const response = await fetch('/api/maintenance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    })

    if (response.ok) {
      fetchTasks()
    }
  }

  return (
    <div className="space-y-6">
      <MaintenanceTaskForm 
        inspections={inspections}
        onSubmit={handleSubmit}
      />
      <MaintenanceTaskList tasks={tasks} />
    </div>
  )
}
