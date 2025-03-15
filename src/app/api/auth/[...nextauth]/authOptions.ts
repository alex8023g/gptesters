import { prisma } from '@/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET)
  throw new Error(
    'GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be set in .env',
  );

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    /* 
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials , req ) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await fetch('/your/endpoint', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        });
        const user = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }), 
    */
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('🚀 ~ signIn ~ credentials:', credentials);
      console.log('🚀 ~ signIn ~ email:', email);
      console.log('🚀 ~ signIn ~ profile:', profile);
      console.log('🚀 ~ signIn ~ account:', account);
      console.log('🚀 ~ signIn ~ user:', user);

      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async session({ session, token, user }) {
      console.log('🚀 ~ session ~ user:', user);
      console.log('🚀 ~ session ~ token:', token);
      console.log('🚀 ~ session ~ session:', session);
      // Send properties to the client, like an access_token and user id from a provider.
      // session.accessToken = token.accessToken;
      session.user.id = user.id;

      return session;
    },
  },
};
