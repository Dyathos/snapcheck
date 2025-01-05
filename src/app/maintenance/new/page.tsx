import Header from '@/components/layout/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MaintenanceTaskForm } from '@/components/maintenance/MaintenanceTaskForm'

export default function NewMaintenancePage() {
  return (
    <>
      <Header 
        title="Nouvelle tâche de maintenance"
        showBack
      />
      
      <div className="p-4">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Créer une nouvelle tâche</CardTitle>
            </CardHeader>
            <CardContent>
              <MaintenanceTaskForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}