import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { Role, User } from "@/types";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          select: {
            id: true,
            email: true,
            password: true,
            firstName: true,
            lastName: true,
            role: true,
            department: true,
            badge: true,
            photo: true,
            phone: true
          }
        });

        // Log the retrieved user for debugging
        console.log('Retrieved User:', user);

        if (!user || !await bcrypt.compare(credentials.password, user.password)) {
          return null;
        }

        return {
          id: user.id.toString(),
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          name: `${user.firstName} ${user.lastName}`,
          role: user.role as Role,
          department: user.department,
          badge: user.badge,
          photo: user.photo,
          phone: user.phone
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.role = user.role;
        token.department = user.department;
        token.badge = user.badge;
        token.photo = user.photo;
        token.phone = user.phone;
      }
      // Log the token and user for debugging
      console.log('JWT Callback - Token:', token);
      console.log('JWT Callback - User:', user);
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = Number(token.id);
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.role = token.role as Role;
        session.user.department = token.department as string | null;
        session.user.badge = token.badge as string | null;
        session.user.photo = token.photo as string | null;
        session.user.phone = token.phone as string | null;
      }
      // Log the session and token for debugging
      console.log('Session Callback - Session:', session);
      console.log('Session Callback - Token:', token);
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60 // 24 hours
  },
  pages: {
    signIn: "/login",
    error: "/login"
  },
  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };