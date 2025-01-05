import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { prisma } from '@/lib/prisma';
import { ChevronRightIcon, PlusIcon } from '@heroicons/react/24/outline';

async function getVehicles() {
  try {
    console.log('Fetching vehicles...');
    const vehicles = await prisma.vehicle.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        parts: true,
      },
    });
    console.log('Vehicles found:', vehicles);
    return vehicles;
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return [];
  }
}

export async function VehiclesList() {
  const vehicles = await getVehicles();

  if (!vehicles || vehicles.length === 0) {
    console.log('No vehicles found');
    return (
      <div className="text-center py-12">
        <h3 className="mt-2 text-sm font-semibold text-gray-900">Aucun véhicule</h3>
        <p className="mt-1 text-sm text-gray-500">Commencez par ajouter un véhicule à votre parc.</p>
        <div className="mt-6">
          <Link
            href="/vehicles/new"
            className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Nouveau véhicule
          </Link>
        </div>
      </div>
    );
  }

  console.log('Rendering vehicles:', vehicles.length);
  return (
    <div className="divide-y divide-gray-200">
      {vehicles.map((vehicle) => {
        const criticalParts = vehicle.parts.filter(part => part.severity === 'critical').length;
        const status = criticalParts > 0 ? 'critical' : 'good';

        return (
          <Link
            key={vehicle.id}
            href={`/vehicles/${vehicle.id}`}
            className="block hover:bg-gray-50"
          >
            <div className="px-4 py-4 flex items-center">
              {vehicle.photo && (
                <img
                  src={vehicle.photo}
                  alt={`${vehicle.brand} ${vehicle.affectation}`} // Utilisation de 'affectation' pour le texte alternatif
                  className="w-16 h-16 rounded-md object-cover mr-4"
                />
              )}
              <div className="flex-grow">
                <h3 className="text-base font-semibold text-gray-900">
                  {vehicle.brand} {vehicle.affectation} {/* Affiche la marque et l'affectation */}
                </h3>
              </div>
              <div className="flex items-center">
                <Badge variant={status === 'critical' ? 'destructive' : 'default'}>
                  {criticalParts > 0 ? `${criticalParts} pièce${criticalParts > 1 ? 's' : ''} critique${criticalParts > 1 ? 's' : ''}` : 'OK'}
                </Badge>
                <ChevronRightIcon className="ml-4 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}