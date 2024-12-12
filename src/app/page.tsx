import Link from 'next/link'
import Header from '@/components/layout/Header'
import { prisma } from '@/lib/prisma'
import {
  WrenchScrewdriverIcon,
  ClipboardDocumentCheckIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'

async function getStats() {
  const [vehicleCount, inspectionCount, criticalCount] = await Promise.all([
    prisma.vehicle.count(),
    prisma.inspection.count(),
    prisma.part.count({
      where: {
        severity: 'critical',
      },
    }),
  ])

  return {
    vehicleCount,
    inspectionCount,
    criticalCount,
  }
}

export default async function Home() {
  const stats = await getStats()

  return (
    <>
      <Header title="CarCheck" />
      
      <div className="p-4 pb-20">
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <WrenchScrewdriverIcon className="h-8 w-8 mx-auto text-blue-500" />
              <div className="mt-2 text-2xl font-semibold">{stats.vehicleCount}</div>
              <div className="text-xs text-gray-500">Véhicules</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <ClipboardDocumentCheckIcon className="h-8 w-8 mx-auto text-green-500" />
              <div className="mt-2 text-2xl font-semibold">{stats.inspectionCount}</div>
              <div className="text-xs text-gray-500">Inspections</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <ExclamationTriangleIcon className="h-8 w-8 mx-auto text-red-500" />
              <div className="mt-2 text-2xl font-semibold">{stats.criticalCount}</div>
              <div className="text-xs text-gray-500">Pièces critiques</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Actions rapides</h2>
            <div className="grid gap-4">
              <Link
                href="/vehicles/new"
                className="block bg-white rounded-lg shadow p-4 hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <WrenchScrewdriverIcon className="h-6 w-6 text-blue-500" />
                  <span className="ml-3">Ajouter un véhicule</span>
                </div>
              </Link>
              <Link
                href="/inspections/new"
                className="block bg-white rounded-lg shadow p-4 hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <ClipboardDocumentCheckIcon className="h-6 w-6 text-green-500" />
                  <span className="ml-3">Nouvelle inspection</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Critical Alerts */}
          {stats.criticalCount > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Alertes critiques</h2>
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <div className="flex">
                  <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />
                  <div className="ml-3">
                    <p className="text-sm text-red-700">
                      {stats.criticalCount} pièce{stats.criticalCount > 1 ? 's' : ''} critique{stats.criticalCount > 1 ? 's' : ''} nécessite{stats.criticalCount > 1 ? 'nt' : ''} une attention immédiate
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
