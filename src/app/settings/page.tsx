"use client";

import { Cog, User, ClipboardCheck, LogOut, ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

const settingsSections = [
  {
    id: 'profile',
    label: 'Mon Profil',
    href: '/settings/me',
    icon: User,
  },
  {
    id: 'checkin',
    label: 'Pièces',
    href: '/settings/checkin',
    icon: ClipboardCheck,
  },
  {
    id: 'preferences',
    label: 'Préférences',
    href: '/settings/preferences',
    icon: Cog,
  },
];

export default function SettingsLayout() {
  const pathname = usePathname();

  return (
    <div>
      <div className="divide-y divide-gray-200">
        {settingsSections.map((section) => {
          const Icon = section.icon;
          const isActive = pathname === section.href;

          return (
            <Link
              key={section.id}
              href={section.href}
              className="block hover:bg-gray-50"
            >
              <div className="px-4 py-4 flex justify-between items-center">
                <div className="ml-4 flex gap-2 items-center">
                  <Icon className={`h-5 w-5 ${
                    isActive ? 'text-blue-500' : 'text-gray-500'
                  }`} />
                  <h3 className="text-base font-semibold text-gray-900">
                    {section.label}
                  </h3>
                </div>
                <div className="flex items-center">
                  <ChevronRightIcon className="ml-4 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </Link>
          );
        })}

        <button
          onClick={() => signOut()}
          className="w-full"
        >
          <div className="px-4 py-4 flex justify-between items-center hover:bg-red-50">
            <div className="ml-4 flex items-center gap-2">
              <LogOut className="h-5 w-5 text-red-500" />
              <h3 className="text-base font-semibold text-red-600">
                Déconnexion
              </h3>
            </div>
            <div className="flex items-center">
              <ChevronRightIcon className="h-5 w-5 text-red-400" />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}