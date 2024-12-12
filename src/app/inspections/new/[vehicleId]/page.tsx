import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import { prisma } from '@/lib/prisma'
import { InspectionWizard } from '../../components/InspectionWizard'

export default async function NewVehicleInspectionPage({
  params,
}: {
  params: { vehicleId: string }
}) {
  const vehicle = await prisma.vehicle.findUnique({
    where: { id: params.vehicleId },
    include: {
      parts: true,
    },
  })

  if (!vehicle) {
    notFound()
  }

  return (
    <>
      <Header 
        title={`Inspection de ${vehicle.brand} ${vehicle.model}`}
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
  )
}
