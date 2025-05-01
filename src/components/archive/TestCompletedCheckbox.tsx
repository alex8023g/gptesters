'use client';

import { appAction } from '@/actions/appActions/appAction';
import { App } from '@prisma/client';
import { twJoin } from 'tailwind-merge';
import { Checkbox } from '@/components/ui/checkbox';

type Props = {
  app: App;
  userId: string;
};

export function TestCompletedCheckbox({ app, userId }: Props) {
  return (
    <div className='flex items-center space-x-2'>
      <Checkbox
        id='testCompletedChbx'
        className=''
        checked={app.testCompleted}
        onCheckedChange={(e: boolean) => {
          console.log(e);
          appAction.markAppTestCompleted({
            appId: app.id,
            userId,
            testCompleted: e,
          });
        }}
      />

      <label
        htmlFor='testCompletedChbx'
        className={twJoin(
          'text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
          app.testCompleted && 'text-green-600',
        )}
      >
        my app test completed!
      </label>
    </div>
  );
}
