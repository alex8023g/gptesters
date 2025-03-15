'use client';
import { GoogleIcon } from '@/components/Icons/GoogleIcon';
import { signIn } from 'next-auth/react';

export function SignInBtn() {
  return (
    <button
      className='flex min-w-72 rounded-lg border px-5 py-3 shadow-md'
      onClick={() => signIn('google')}
    >
      <span className='mr-6'>
        <GoogleIcon />
      </span>
      <span className='font-semibold'>Continue with Google</span>
    </button>
  );
}
