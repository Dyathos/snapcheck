import Header from '@/components/layout/Header'
import VehicleForm from '../components/VehicleForm'

export default function NewVehiclePage() {
  return (
    <>
      <Header 
        title="Nouveau Véhicule"
        showBack 
      />
      <div className="p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-white shadow-sm rounded-lg p-6">
            <VehicleForm />
          </div>
        </div>
      </div>
    </>
  )
}
