// components/layout/Header.tsx
'use client'

import { ChevronLeftIcon, PowerIcon } from '@heroicons/react/24/outline'
import { useRouter, usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

interface HeaderProps {
  title?: string  // Rendre le titre optionnel
  showBack?: boolean
  action?: React.ReactNode
  description?: string
}

export default function Header({ 
  title = "Mon Application",  // Titre par défaut
  showBack = false, 
  action, 
  description 
}: HeaderProps) {
  const router = useRouter()
  const pathname = usePathname()

  // Fonction pour déterminer le titre en fonction du chemin
  const getPageTitle = () => {
    switch(pathname) {
      case '/':
        return 'Accueil'
      case '/vehicles':
        return 'Véhicules'
      case '/inspections':
        return 'Inspections'
      case '/maintenance':
        return 'Maintenance'
      case '/settings':
        return 'Paramètres'
      case '/users':
        return 'Utilisateurs'
      default:
        return title
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={() => router.back()}
              className="p-1 -ml-1 rounded-full hover:bg-gray-50"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
          )}
          <h1 className="text-lg font-semibold">{title}</h1>
        </div>
        <div className="flex items-center gap-3">
          {action}
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="p-1 rounded-full hover:bg-gray-50"
            title="Se déconnecter"
          >
            <PowerIcon className="h-6 w-6 text-gray-500 hover:text-red-600" />
          </button>
        </div>
      </div>
      {description && (
        <div className="px-4 py-2 bg-gray-50">
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      )}
    </header>
  )
}