import { SignInBtn } from '@/components/SignInBtn';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]/authOptions';
import { redirect } from 'next/navigation';
import { LoginForm } from '@/components/LoginForm';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  if (session?.user.id) {
    redirect(`/user/${session.user.id}`);
  }

  return (
    <main className='flex h-full flex-col'>
      <div className='m-auto'>
        <LoginForm />
        {/* <UsersList users={users} /> */}
        <p>Welcome to gp testers!</p>
        <p>
          Here developers helps each other to pass test phase before deploy app
          to Google Play store.
        </p>
        <p>
          You become a tester for other developers&apos; apps, and other
          developers become testers for your app.
        </p>
        <p>
          Please sign up with the Google account that you will use for testing
          other developers applications (it&apos;s important)
        </p>
        <SignInBtn />
      </div>
    </main>
  );
}
