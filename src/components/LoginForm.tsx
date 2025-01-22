'use client';
import { userAction } from '@/actions/userActions/userAction';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  return (
    <>
      <Button
        className='mb-2'
        onClick={async () => {
          userAction.addUser();
        }}
      >
        sign up with google
      </Button>
      <div className='flex w-full max-w-sm items-center space-x-2'>
        <Input
          type='email'
          placeholder='login with email'
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Button
          // type='submit'
          onClick={async () => {
            const res = await userAction.login(email);
            console.log('res:', res);
          }}
        >
          login
        </Button>
      </div>
    </>
  );
}
