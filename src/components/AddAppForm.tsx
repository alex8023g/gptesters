'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User } from '@prisma/client';
import { useState } from 'react';
import { appAction } from '@/actions/appActions/appAction';
import { twJoin } from 'tailwind-merge';
import { Label } from './ui/label';

export function AddAppForm({ user }: { user: User }) {
  const [app, setApp] = useState<{
    name: string;
    url: string;
    isValid: boolean | undefined;
  }>({
    name: '',
    url: '',
    isValid: undefined,
  });
  return (
    <div className='mb-3 max-w-[700px] rounded-lg border p-3 shadow-md'>
      <p className='font-semibold'>add link to app from google play console</p>
      <div className='my-0 flex w-full items-center space-x-2'>
        <Input
          className={twJoin(
            app.isValid === false &&
              'border-red-500 focus-visible:ring-red-500',
          )}
          type='url'
          placeholder='link to App in Google play console'
          onChange={(e) => {
            setApp({ ...app, url: e.target.value, isValid: undefined });
          }}
        />
        <Button
          // type='submit'
          onClick={async () => {
            if (!app.url || !app.url.startsWith('https://play.google.com')) {
              setApp({ ...app, isValid: false });
              return;
            }

            const res = await appAction.addApp({ userId: user.id, app: app });
            if (res.ok) {
              setApp({ name: '', url: '', isValid: undefined });
            } else {
              setApp({ ...app, isValid: false });
            }
          }}
        >
          Add
        </Button>
        {/* <Button
          onClick={async () => {
            const app2 = { ...app };
            app2.name = faker.word.noun();
            app2.url = faker.internet.url();
            appAction.addApp({ userId: user.id, app: app2 });
            setApp({ name: '', url: '', isValid: undefined });
          }}
        >
          Add Faker App
        </Button> */}
      </div>
      <Label
        className={twJoin(
          'text-red-600',
          app.isValid === false ? '' : 'hidden',
        )}
      >
        url must be valid
      </Label>
      <p className=''>
        example: https://play.google.com/store/apps/details?id=todo.cap.v1.com
      </p>
    </div>
  );
}
