import type { DefaultSession } from 'next-auth';
import type { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    user?: DefaultSession['user'] & {
      id: string;
      role: string;
    };
  }

  interface User {
    id: string;
    role: string;
    email: string;
    name: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    role?: string;
    accessToken?: string;
  }
}
