import { SignInBtn } from '@/components/SignInBtn';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]/authOptions';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  if (session?.user.id) {
    redirect(`/user/${session.user.id}`);
  }

  return (
    <main className='flex h-full flex-col'>
      <div className='m-auto space-y-2 p-4'>
        <p>Welcome to GP Testers!</p>
        <p>
          Here developers helps each other to pass test phase before deploy app
          to Google Play store.
        </p>
        <p>
          You become a tester for other developers&apos; apps, and other
          developers becomes testers for your app.
        </p>
        <p>
          Please{' '}
          <span className='font-bold'>
            sign up with the Google account that you will use for testing other
            developers applications{' '}
          </span>
          (it&apos;s important)
        </p>
        <SignInBtn />
      </div>
    </main>
  );
}
