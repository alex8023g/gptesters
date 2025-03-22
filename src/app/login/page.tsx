import { SignInBtn } from '@/components/SignInBtn';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className='grid min-h-svh grid-cols-1 lg:grid-cols-2'>
      <div className='flex flex-col gap-4 p-6 md:p-10'>
        <div className='flex flex-1 items-center justify-center'>
          <div className='w-full max-w-lg space-y-4'>
            <p className='text-center text-2xl font-bold'>
              Welcome to GP Testers!
            </p>
            <p className='text-justify'>
              Here developers helps each other to pass test phase before deploy
              app to Google Play store.
            </p>
            <p className='text-justify'>
              You become a tester for other developers&apos; apps, and other
              developers becomes testers for your app.
            </p>
            <p className='text-justify'>
              Please{' '}
              <span className='font-bold'>
                sign up with the Google account that you will use for testing
                other developers applications{' '}
              </span>
              (it&apos;s important)
            </p>
            <SignInBtn />
          </div>
        </div>
      </div>
      <div className='/hidden relative h-52 lg:flex lg:h-auto lg:bg-muted'>
        <Image
          src='/img/android.svg'
          alt='Image'
          className='/w-full absolute inset-0 m-auto h-full object-cover dark:brightness-[0.2] dark:grayscale lg:h-auto'
          height={400}
          width={400}
        />
      </div>
    </div>
  );
}
