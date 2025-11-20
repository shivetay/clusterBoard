import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import Facebook from 'next-auth/providers/facebook';
import { loginSchema } from '@/lib/validations/auth.validation';

/**
 * NextAuth configuration
 *
 * Environment variables required:
 * - AUTH_SECRET: Secret for signing tokens
 * - GOOGLE_CLIENT_ID: Google OAuth client ID
 * - GOOGLE_CLIENT_SECRET: Google OAuth client secret
 * - FACEBOOK_CLIENT_ID: Facebook OAuth app ID
 * - FACEBOOK_CLIENT_SECRET: Facebook OAuth app secret
 */
export const authConfig: NextAuthConfig = {
  providers: [
    // Credentials Provider (Email/Password)
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          // Validate credentials
          const validationResult = loginSchema.safeParse(credentials);
          if (!validationResult.success) {
            return null;
          }

          const { email, password } = validationResult.data;

          // Call your login API
          const response = await fetch(
            `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/auth/login`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password }),
            },
          );

          const data = await response.json();

          if (!response.ok || !data.success) {
            return null;
          }

          // Return user object with token
          return {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role,
            accessToken: data.token,
          };
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      },
    }),

    // Google OAuth Provider
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),

    // Facebook OAuth Provider
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],

  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/auth/error',
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      // Handle OAuth sign-in
      if (account?.provider === 'google' || account?.provider === 'facebook') {
        // TODO: Create or update user in your database
        // const dbUser = await db.user.upsert({
        //   where: { email: user.email },
        //   update: { name: user.name, image: user.image },
        //   create: {
        //     email: user.email,
        //     name: user.name,
        //     image: user.image,
        //     role: 'user',
        //   },
        // });

        return true;
      }

      return true;
    },

    async jwt({ token, user, account }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || 'user';
        token.accessToken = (user as any).accessToken;
      }

      // OAuth providers
      if (account) {
        token.provider = account.provider;
        if (account.access_token) {
          token.accessToken = account.access_token;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        (session as any).accessToken = token.accessToken;
      }

      return session;
    },
  },

  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },

  secret: process.env.AUTH_SECRET,
  trustHost: true,
};
