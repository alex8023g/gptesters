'use client';

import { appAction } from '@/actions/appActions/appAction';

import { App } from '@prisma/client';
import { Checkbox } from './ui/checkbox';

import { twJoin } from 'tailwind-merge';

type Props = {
  app: App;
  userId: string;
};

export function HaveEnoughTestersCheckbox({ app, userId }: Props) {
  return (
    <div className='mb-2 flex items-center space-x-2'>
      <Checkbox
        id='enoughTestersChbx'
        checked={app.hasEnoughInstallations}
        onCheckedChange={(e: boolean) => {
          console.log(e);

          appAction.markAppHasEnoughInstalls({
            appId: app.id,
            userId,
            hasEnoughInstallations: e,
          });
        }}
      />
      <label
        htmlFor='enoughTestersChbx'
        className={twJoin(
          'text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
          app.hasEnoughInstallations && 'text-green-600',
        )}
      >
        I have enough testers
      </label>
    </div>
  );
}
