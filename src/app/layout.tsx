// app/layout.tsx
'use client'

import './globals.css'
import AppLayout from '@/components/layout/AppLayout'
import NextAuthProvider from "@/components/providers/SessionProvider"

export default function RootLayout({ children, title, showBack, action, description }) {
  return (
    <html lang="fr">
      <body>
        <NextAuthProvider>
          <AppLayout {...{ title, showBack, action, description }}>
            {children}  {/* Les pages individuelles sont rendues ici */}
          </AppLayout>
        </NextAuthProvider>
      </body>
    </html>
  )
}