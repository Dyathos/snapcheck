import "next-auth"
import { Role } from "@prisma/client"

declare module "next-auth" {
  interface User {
    id: string;
    role: Role
  }
  
  interface Session {
    user: User & {
      role: Role
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: Role
  }
}