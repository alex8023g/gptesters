import { SignInBtn } from '@/components/SignInBtn';

export default async function HomePage() {
  // console.log('users:', users);
  return (
    <main className='flex h-full flex-col'>
      <div className='m-auto'>
        {/* <LoginForm />
        <UsersList users={users} /> */}
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
