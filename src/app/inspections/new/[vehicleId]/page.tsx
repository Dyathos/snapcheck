import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import { prisma } from '@/lib/prisma';
import { InspectionWizard } from '../../components/InspectionWizard';

export default async function NewVehicleInspectionPage({
  params,
}: {
  params: { vehicleId: string }
}) {
  // Await the params to ensure they are resolved
  const { vehicleId } = await params;

  // Fetch the vehicle from the database
  const vehicle = await prisma.vehicle.findUnique({
    where: { id: vehicleId },
    include: {
      parts: true,
    },
  });

  // If the vehicle is not found, trigger a 404 page
  if (!vehicle) {
    notFound();
  }

  // Render the component if the vehicle is found
  return (
    <>
      <Header 
        title={`Inspection de ${vehicle.brand} ${vehicle.affectation}`}
        showBack
      />
      
      <div className="p-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white shadow-sm rounded-lg p-6">
            <InspectionWizard vehicle={vehicle} />
          </div>
        </div>
      </div>
    </>
  );
}