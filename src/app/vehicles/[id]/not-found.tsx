import Link from 'next/link'
import Header from '@/components/layout/Header'

export default function VehicleNotFound() {
  return (
    <>
      <Header
        title="Véhicule non trouvé"
        showBack
      />
      
      <div className="p-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Véhicule introuvable
          </h2>
          <p className="mt-2 text-gray-500">
            Désolé, le véhicule que vous recherchez n'existe pas ou a été supprimé.
          </p>
          <div className="mt-6">
            <Link
              href="/vehicles"
              className="text-blue-600 hover:text-blue-500"
            >
              Retour à la liste des véhicules
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
