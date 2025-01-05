import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

// Définition des permissions par route
const routePermissions = {
  '/vehicles': ['Safety'],
  '/maintenance': ['Maintenance', 'Safety'],
  '/inspections': ['Inspecteur', 'Maintenance', 'Safety']
}

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    // Trouve la route correspondante
    const route = Object.keys(routePermissions).find(route => 
      path.startsWith(route)
    )

    if (route) {
      const allowedRoles = routePermissions[route as keyof typeof routePermissions]
      if (!token?.role || !allowedRoles.includes(token.role)) {
        // Redirection vers la page d'accueil si non autorisé
        return NextResponse.redirect(new URL('/', req.url))
      }
    }

    // Continue la requête si autorisé
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token // Vérifie si l'utilisateur est connecté
    }
  }
)

export const config = {
  matcher: [
    '/vehicles/:path*',
    '/maintenance/:path*',
    '/inspections/:path*'
  ]
}