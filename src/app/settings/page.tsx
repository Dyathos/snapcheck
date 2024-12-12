import Header from '@/components/layout/Header'

export default function SettingsPage() {
  return (
    <>
      <Header title="Paramètres" />
      
      <div className="p-4 space-y-6">
        <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900">Général</h3>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Langue
                </label>
                <select
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Thème
                </label>
                <select
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="light">Clair</option>
                  <option value="dark">Sombre</option>
                  <option value="system">Système</option>
                </select>
              </div>
            </div>
          </div>

          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="notifications"
                    name="notifications"
                    type="checkbox"
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="notifications" className="font-medium text-gray-700">
                    Activer les notifications
                  </label>
                  <p className="text-gray-500">
                    Recevez des notifications pour les inspections à venir et les alertes importantes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900">À propos</h3>
            <div className="mt-4 text-sm text-gray-500">
              <p>CarCheck v1.0.0</p>
              <p className="mt-2">© 2024 CarCheck. Tous droits réservés.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
