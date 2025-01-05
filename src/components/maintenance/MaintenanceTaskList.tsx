// src/components/maintenance/MaintenanceTaskList.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MaintenanceTask } from '@/types/models'

interface MaintenanceTaskListProps {
  tasks: MaintenanceTask[]
}

export default function MaintenanceTaskList({ tasks }: MaintenanceTaskListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tâches en cours</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="border rounded-lg p-4 space-y-2"
            >
              <div className="flex justify-between">
                <h3 className="font-medium">
                  {task.vehicle.brand} - {task.description}
                </h3>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  task.priority === 'critical' ? 'bg-red-100 text-red-800' :
                  task.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {task.priority}
                </span>
              </div>
              <p className="text-sm text-gray-500">{task.notes}</p>
              <div className="text-sm">
                <span>Status: {task.status}</span>
                {task.assignedTo && <span className="ml-4">Assigné à: {task.assignedTo}</span>}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
