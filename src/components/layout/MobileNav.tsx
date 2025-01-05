'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  HomeIcon,
  ClipboardDocumentCheckIcon,
  WrenchScrewdriverIcon,
  Cog6ToothIcon,
  UserIcon
} from '@heroicons/react/24/outline'
import {
  HomeIcon as HomeIconSolid,
  ClipboardDocumentCheckIcon as ClipboardDocumentCheckIconSolid,
  WrenchScrewdriverIcon as WrenchScrewdriverIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid,
  UserIcon as UserIconSolid
} from '@heroicons/react/24/solid'
import { cn } from '@/lib/utils'
import { useSession } from 'next-auth/react'

const navItemsByRole = {
  'Safety': [
    { name: 'Accueil', href: '/', icon: HomeIcon, activeIcon: HomeIconSolid },
    { name: 'Inventaire', href: '/inventory', icon: WrenchScrewdriverIcon, activeIcon: WrenchScrewdriverIconSolid },
    { name: 'Utilisateurs', href: '/users', icon: UserIcon, activeIcon: UserIconSolid },
    { name: 'Paramètres', href: '/settings', icon: Cog6ToothIcon, activeIcon: Cog6ToothIconSolid },
  ],
  'Maintenance': [
    { name: 'Accueil', href: '/', icon: HomeIcon, activeIcon: HomeIconSolid },
    { name: 'Tâches', href: '/maintenance', icon: WrenchScrewdriverIcon, activeIcon: WrenchScrewdriverIconSolid },
    { name: 'Véhicules', href: '/vehicles', icon: WrenchScrewdriverIcon, activeIcon: WrenchScrewdriverIconSolid },
    { name: 'Paramètres', href: '/settings', icon: Cog6ToothIcon, activeIcon: Cog6ToothIconSolid },
  ],
  'Inspecteur': [
    { name: 'Accueil', href: '/', icon: HomeIcon, activeIcon: HomeIconSolid },
    { name: 'Inspections', href: '/inspections', icon: ClipboardDocumentCheckIcon, activeIcon: ClipboardDocumentCheckIconSolid },
    { name: 'Véhicules', href: '/vehicles', icon: WrenchScrewdriverIcon, activeIcon: WrenchScrewdriverIconSolid },
    { name: 'Paramètres', href: '/settings', icon: Cog6ToothIcon, activeIcon: Cog6ToothIconSolid },
  ]
}

export default function MobileNav() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const role = session?.user?.role || 'Safety'  // Par défaut, utiliser Safety si aucun rôle

  const navItems = navItemsByRole[role] || []

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="grid h-16 max-w-lg grid-cols-4 mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = isActive ? item.activeIcon : item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800',
                isActive && 'text-blue-600 dark:text-blue-500'
              )}
            >
              <Icon
                className={`h-6 w-6 ${
                  isActive ? 'text-blue-600' : 'text-gray-500'
                }`}
              />
              <span
                className={`mt-1 text-xs ${
                  isActive ? 'text-blue-600 font-medium' : 'text-gray-500'
                }`}
              >
                {item.name}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
