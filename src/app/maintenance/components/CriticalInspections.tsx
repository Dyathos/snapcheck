import { prisma } from '@/lib/prisma';
import {
  WrenchScrewdriverIcon,
  ClipboardDocumentCheckIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

async function getCriticalStats() {
  const [inspectionCount, criticalCount] = await Promise.all([
    prisma.inspection.count(),
    prisma.part.count({
      where: {
        severity: 'critical',
      },
    }),
  ]);

  return {
    inspectionCount,
    criticalCount,
  };
}

export default async function CriticalInspections() {
  const stats = await getCriticalStats();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Inspections Critiques</h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <WrenchScrewdriverIcon className="h-8 w-8 mx-auto text-blue-500" />
          <div className="mt-2 text-2xl font-semibold">{stats.inspectionCount}</div>
          <div className="text-xs text-gray-500">Inspections Totales</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <ExclamationTriangleIcon className="h-8 w-8 mx-auto text-red-500" />
          <div className="mt-2 text-2xl font-semibold">{stats.criticalCount}</div>
          <div className="text-xs text-gray-500">Pièces Critiques</div>
        </div>
      </div>

      {/* Alertes critiques */}
      {stats.criticalCount > 0 && (
        <div className="space-y-4 mt-4">
          <h2 className="text-lg font-semibold">Alertes critiques</h2>
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <div className="flex">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  {stats.criticalCount} pièce{stats.criticalCount > 1 ? 's' : ''} critique{stats.criticalCount > 1 ? 's' : ''} nécessite{stats.criticalCount > 1 ? 'nt' : ''} une attention immédiate.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}