import Link from 'next/link'
import Header from '@/components/layout/Header'
import { PlusIcon } from '@heroicons/react/24/outline'
import { VehiclesList } from './components/VehiclesList'

export default function VehiclesPage() {
  return (
    <>
      <Header 
        title="Véhicules" 
        action={
          <Link
            href="/vehicles/new"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
          >
            <PlusIcon className="h-5 w-5 mr-1" />
            <span>Ajouter</span>
          </Link>
        }
      />
      
      <div className="p-4 space-y-4">
        <VehiclesList />
      </div>
    </>
  )
}
