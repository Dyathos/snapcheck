// app/maintenance/page.tsx
import CriticalInspections from './components/CriticalInspections'
import MaintenanceTasks from './components/MaintenanceTasks'
import { protectedRoute } from "@/lib/protectedRoute"
import AddButton from '@/components/ui/AddButton'
import MaintenanceOverview from '@/components/dashboards/MaintenanceDashboard'

export default async function MaintenancePage() {
  const session = await protectedRoute(['Maintenance', 'Safety'])
  const isMaintenance = session.user.role === 'Maintenance'

  return (
    <div className="space-y-6">
      {isMaintenance && (
        <AddButton 
          href="/maintenance/new" 
          label="Ajouter une tâche" 
        />
      )}
      <CriticalInspections />
      <MaintenanceOverview />
      <MaintenanceTasks />
    </div>
  )
}