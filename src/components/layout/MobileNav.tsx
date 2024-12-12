'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  HomeIcon,
  ClipboardDocumentCheckIcon,
  WrenchScrewdriverIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline'
import {
  HomeIcon as HomeIconSolid,
  ClipboardDocumentCheckIcon as ClipboardDocumentCheckIconSolid,
  WrenchScrewdriverIcon as WrenchScrewdriverIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid,
} from '@heroicons/react/24/solid'
import { cn } from '@/lib/utils'

const navItems = [
  {
    name: 'Accueil',
    href: '/',
    icon: HomeIcon,
    activeIcon: HomeIconSolid,
  },
  {
    name: 'Véhicules',
    href: '/vehicles',
    icon: WrenchScrewdriverIcon,
    activeIcon: WrenchScrewdriverIconSolid,
  },
  {
    name: 'Inspections',
    href: '/inspections',
    icon: ClipboardDocumentCheckIcon,
    activeIcon: ClipboardDocumentCheckIconSolid,
  },
  {
    name: 'Plus',
    href: '/settings',
    icon: Cog6ToothIcon,
    activeIcon: Cog6ToothIconSolid,
  },
]

export default function MobileNav() {
  const pathname = usePathname()

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
