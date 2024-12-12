import Header from '@/components/layout/Header'

export default function LoadingVehicle() {
  return (
    <>
      <Header
        title="Chargement..."
        showBack
      />
      
      <div className="p-4 space-y-6">
        <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>

          <div className="p-4">
            <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4" />
            <div className="space-y-2">
              <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-36 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>

          <div className="p-4">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4" />
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex justify-between items-start bg-gray-50 p-3 rounded-md"
                >
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-48 bg-gray-200 rounded animate-pulse" />
                  </div>
                  <div className="h-5 w-16 bg-gray-200 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
