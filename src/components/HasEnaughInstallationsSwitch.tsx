'use client';

import { appAction } from '@/actions/appActions/appAction';
import { Switch } from '@/components/ui/switch';
import { App } from '@prisma/client';

type Props = {
  app: App;
  userId: string;
};

export function HasEnoughInstallationsSwitch({ app, userId }: Props) {
  return (
    <div className='flex space-x-2 py-2'>
      <span className=''>I need more testers</span>
      <Switch
        className='my-auto'
        defaultChecked={app.hasEnoughInstallations}
        onCheckedChange={(e) => {
          console.log(e);
          appAction.markAppHasEnoughInstalls({
            appId: app.id,
            userId,
            hasEnoughInstallations: e,
          });
        }}
      />
      <span>I have enough testers</span>
    </div>
  );
}
