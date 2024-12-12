import './globals.css'
import { Inter } from 'next/font/google'
import MobileNav from '@/components/layout/MobileNav'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CarCheck',
  description: 'Application de suivi des véhicules',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          {children}
          <MobileNav />
        </div>
      </body>
    </html>
  )
}
