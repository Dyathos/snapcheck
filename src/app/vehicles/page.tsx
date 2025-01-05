// app/vehicles/page.tsx
import { VehiclesList } from './components/VehiclesList'
import { protectedRoute } from "@/lib/protectedRoute"
import AddButton from '@/components/ui/AddButton'

export default async function VehiclesPage() {
  const session = await protectedRoute(['Inspecteur', 'Maintenance', 'Safety'])
  const isSafetyAndInspecteur = session.user.role === 'Safety' || session.user.role === 'Inspecteur';

  return (
    <div>
      {isSafetyAndInspecteur && (
        <AddButton 
          href="/vehicles/new" 
          label="Ajouter un véhicule" 
        />
      )}
      <VehiclesList />
    </div>
  )
}