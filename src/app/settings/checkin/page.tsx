import Header from '@/components/layout/Header';
import { prisma } from '@/lib/prisma';
import { CheckInItemList } from './CheckInItemList';
import { CreateCheckInItem } from './CreateCheckInItem';

export default async function CheckInSettingsPage() {
  const checkInItems = await prisma.checkInItem.findMany({
    orderBy: [
      {
        category: 'asc',
      },
      {
        name: 'asc',
      },
    ],
  });

  return (
    <>
      <Header
        title="Éléments d'inspection"
        description="Gérez la liste des éléments à vérifier lors des inspections quotidiennes."
      />

      <div className="p-4">
        <div className="max-w-7xl mx-auto space-y-6">
          <CreateCheckInItem />

          <div className="bg-white shadow rounded-lg">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium">Liste des éléments d'inspection</h2>
              <p className="text-sm text-gray-500">
                Les éléments standards ne peuvent pas être supprimés mais peuvent être
                désactivés si vous ne souhaitez pas les utiliser.
              </p>
            </div>
            <CheckInItemList items={checkInItems} />
          </div>
        </div>
      </div>
    </>
  );
}
