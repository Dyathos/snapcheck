// app/inspections/page.tsx
import { InspectionsList } from './components/InspectionsList'
import { protectedRoute } from "@/lib/protectedRoute"
import AddButton from '@/components/ui/AddButton'

export default async function InspectionsPage() {
  const session = await protectedRoute(['Inspecteur', 'Maintenance'])
  const isInspecteur = session.user.role === 'Inspecteur'

  return (
    <div>
      {isInspecteur && (
        <AddButton 
          href="/inspections/new" 
          label="Ajouter une inspection" 
        />
      )}
      <InspectionsList />
    </div>
  )
}