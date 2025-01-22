'use client';
import { addAppAction } from '@/actions/appActions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserApps } from '@/types/types';
import { User } from '@prisma/client';
import { useState } from 'react';
import { revalidatePath } from 'next/cache';
import { set } from 'react-hook-form';
import { faker } from '@faker-js/faker';

export function AddAppForm({ user }: { user: User }) {
  const [url, setUrl] = useState('');
  const [app, setApp] = useState({ name: '', url: '' });
  return (
    <div className='flex w-full max-w-sm items-center space-x-2'>
      <Input
        type='url'
        placeholder='link to App in Google play console'
        onChange={(e) => {
          setApp({ ...app, url: e.target.value });
        }}
      />
      <Button
        type='submit'
        onClick={async () => {
          const app2 = { ...app };
          if (!app.name) app2.name = faker.word.noun();
          if (!app.url) app2.url = faker.internet.url();
          addAppAction({ userId: user.id, app: app2 });
          setApp({ name: '', url: '' });
        }}
      >
        Add
      </Button>
    </div>
  );
}
