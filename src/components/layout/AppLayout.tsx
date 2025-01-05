// components/layout/AppLayout.tsx
'use client'

import { useSession } from 'next-auth/react'
import Header from './Header'
import MobileNav from './MobileNav'

export default function AppLayout({ children, title, showBack }) {
  const { status } = useSession()

  // Si l'utilisateur n'est pas authentifié, afficher uniquement le contenu
  if (status !== 'authenticated') {
    return <>{children}</>
  }

  // Si l'utilisateur est authentifié, afficher le layout complet
  return (
    <div className="min-h-screen flex flex-col">
      <Header title={title} showBack={showBack} />
      <main className="flex-1 pb-16">
        {children}
      </main>
      <MobileNav />
    </div>
  )
}