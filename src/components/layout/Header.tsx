'use client'

import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

interface HeaderProps {
  title: string
  showBack?: boolean
  action?: React.ReactNode
  description?: string
}

export default function Header({ title, showBack = false, action, description }: HeaderProps) {
  const router = useRouter()

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
        {action && <div>{action}</div>}
      </div>
    </header>
  )
}
