// eslint-disable-next-line
import NextAuth, { type DefaultSession, type DefaultUser } from 'next-auth';
import { Role } from '@prisma/client';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      name: string;
      role: Role;
    };
  }
  interface User extends DefaultUser {
    role: Role; // the user will now have the property
  }
}
