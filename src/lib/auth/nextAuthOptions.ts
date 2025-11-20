import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import {
  createAccessToken,
  createOrUpdateSocialUser,
  userRepository,
  validateCredentials,
} from './userService';

const providers: NextAuthOptions['providers'] = [
  CredentialsProvider({
    id: 'credentials',
    name: 'Credentials',
    credentials: {
      email: { label: 'Email', type: 'email', placeholder: 'john@company.com' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials) {
      if (!credentials) {
        return null;
      }

      const user = await validateCredentials({
        email: credentials.email,
        password: credentials.password,
      });

      return user ?? null;
    },
  }),
];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  );
}

if (process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET) {
  providers.push(
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  );
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60, // 1 hour
  },
  pages: {
    signIn: '/login',
  },
  providers,
  callbacks: {
    async signIn({ account, user }) {
      if (
        account &&
        (account.provider === 'google' || account.provider === 'facebook')
      ) {
        if (!user.email) {
          return false;
        }

        await createOrUpdateSocialUser({
          name: user.name ?? user.email.split('@')[0],
          email: user.email,
          provider: account.provider as 'google' | 'facebook',
          providerAccountId: account.providerAccountId ?? user.email,
        });
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user?.email) {
        const existing =
          (await userRepository.findByEmail(user.email)) ??
          (token.sub ? await userRepository.findById(token.sub) : null);

        if (existing) {
          token.sub = existing.id;
          token.name = existing.name;
          token.email = existing.email;
          token.role = existing.role;
          token.accessToken = await createAccessToken({
            id: existing.id,
            name: existing.name,
            email: existing.email,
            role: existing.role,
            createdAt: existing.createdAt,
            updatedAt: existing.updatedAt,
          });
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.role = (token.role as string) ?? 'user';
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      } else {
        session.user = {
          id: token.sub as string,
          role: (token.role as string) ?? 'user',
          email: token.email as string,
          name: token.name as string,
        };
      }
      if (token.accessToken && typeof token.accessToken === 'string') {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
};
