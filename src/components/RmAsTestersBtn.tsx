'use client';

import { appAction } from '@/actions/appActions/appAction';
import { Button } from './ui/button';

// export function TestersListWasAddedBtn({
export function RmAsTestersBtn({
  appId,
  userId,
}: {
  appId: string;
  userId: string;
}) {
  return (
    <Button
      onClick={() => {
        appAction.rmAsTesters({ appId, userId });
      }}
    >
      testers list was NOT added to gp console
    </Button>
  );
}
