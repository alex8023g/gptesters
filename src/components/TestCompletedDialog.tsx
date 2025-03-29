'use client';
import { appAction } from '@/actions/appActions/appAction';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { App } from '@prisma/client';

type Props = {
  app: App;
  userId: string;
};

export function TestCompletedDialog({ app, userId }: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='outline'>my app test completed!</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Please confirm that yore app test completed
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. We will ask testers to remove your app
            from devices. You will be able to add another app for testing.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              appAction.markAppTestCompleted({
                appId: app.id,
                userId,
                testCompleted: true,
              });
            }}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
