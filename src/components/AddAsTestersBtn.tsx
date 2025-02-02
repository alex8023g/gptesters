'use client';

import { appAction } from '@/actions/appActions/appAction';
import { Button } from './ui/button';

export function AddAsTestersBtn({
  appId,
  userId,
}: {
  appId: string;
  userId: string;
}) {
  return (
    <Button
      onClick={() => {
        appAction.addAsTester({ appId, userId });
      }}
    >
      testers list was added to gp console
    </Button>
  );
}
