import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { Role } from '@prisma/client';

const loginAliases: Record<string, string> = {
  admin: 'admin@mecarapid.com',
  owner: 'owner@mecarapid.com',
  office: 'office@mecarapid.com',
  mechanic: 'mechanic@mecarapid.com',
  mecanico: 'mechanic@mecarapid.com',
};

function resolveLoginIdentifier(identifier: string) {
  const normalized = identifier.trim().toLowerCase();
  return loginAliases[normalized] ?? normalized;
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Usuario', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Usuario y password son requeridos');
        }

        const email = resolveLoginIdentifier(credentials.username);

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          throw new Error('Usuario no encontrado');
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error('Password incorrecto');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          workshopId: user.workshopId,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.workshopId = (user as any).workshopId ?? null;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).workshopId = token.workshopId ?? null;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};

// Type extensions for NextAuth
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      role: Role;
      workshopId?: string | null;
    };
  }

  interface User {
    id: string;
    email: string;
    name?: string | null;
    role: Role;
    workshopId?: string | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: Role;
    workshopId?: string | null;
  }
}
