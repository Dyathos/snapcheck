import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { Role } from "@prisma/client"

export async function protectedRoute(allowedRoles?: Role[]) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  if (allowedRoles && !allowedRoles.includes(session.user.role)) {
    redirect('/')
  }

  return session
}