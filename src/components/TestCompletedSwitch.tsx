'use client';

import { appAction } from '@/actions/appActions/appAction';
import { Switch } from '@/components/ui/switch';
import { App } from '@prisma/client';

type Props = {
  app: App;
  userId: string;
};

export function TestCompletedSwitch({ app, userId }: Props) {
  return (
    <div className='flex space-x-2 py-2'>
      <span className=''>my app test in process</span>
      <Switch
        className='my-auto'
        defaultChecked={app.testCompleted}
        onCheckedChange={(e) => {
          console.log(e);
          appAction.markAppTestCompleted({
            appId: app.id,
            userId,
            testCompleted: e,
          });
        }}
      />
      <span>my app test completed</span>
    </div>
  );
}
