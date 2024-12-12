import Header from '@/components/layout/Header'
import { VehicleSelect } from '../components/VehicleSelect'

export default function NewInspectionPage() {
  return (
    <>
      <Header 
        title="Nouvelle Inspection"
        showBack
      />
      
      <div className="p-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white shadow-sm rounded-lg p-6">
            <VehicleSelect />
          </div>
        </div>
      </div>
    </>
  )
}
