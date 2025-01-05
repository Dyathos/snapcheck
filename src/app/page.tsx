"use client"

import { useSession } from "next-auth/react"
import { Role } from "@prisma/client"
import AdminDashboard from "@/components/dashboards/SafetyDashboard"
import MaintenanceDashboard from "@/components/dashboards/MaintenanceDashboard"
import InspecteurDashboard from "@/components/dashboards/InspecteurDashboard"
import LoginPage from "./login/page"

export default function Home() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div>Chargement...</div>
  }

  if (status === "unauthenticated") {
    return <LoginPage />
  }

  switch(session?.user?.role) {
    case 'Safety':
      return <InspecteurDashboard />
    case 'Maintenance':
      return <MaintenanceDashboard />
    case 'Inspecteur':
      return <InspecteurDashboard />
    default:
      return <div>Accès non autorisé</div>
  }
}