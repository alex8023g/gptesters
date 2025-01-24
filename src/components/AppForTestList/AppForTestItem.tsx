import { App, TestingAppsUsers, User } from '@prisma/client';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '../ui/button';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';
import {
  addAppforUserTesting,
  appInstalledByUser,
} from '@/actions/appActions/appActions';
import { prisma } from '@/lib/prisma';
import { appAction } from '@/actions/appActions/appAction';

type Props = {
  app: App & {
    testingAppsUsers: TestingAppsUsers[];
    author: User;
    authorAsUsersAppTester: TestingAppsUsers;
  };
  userId: string;
  // userWithHisApp: User & { userApp: App | null };
};

export function AppForTestItem({ app, userId }: Props) {
  // console.log('app:', app);
  const isUserTester = app.testingAppsUsers?.find(
    (item) => item.userId === userId,
  );

  return (
    <TableRow key={app.id} className=''>
      <TableCell className=''>{app.author.email}</TableCell>
      <TableCell className='text-green-700'>
        {app.authorAsUsersAppTester?.userId && (
          <span className='inline-block'>is a your app tester</span>
        )}
        {app.authorAsUsersAppTester?.isInstalled && (
          <span className='inline-block'>installed your app</span>
        )}
      </TableCell>
      <TableCell className=''>{app.name}</TableCell>
      <TableCell>
        <Link href={app.url}>{app.url}</Link>
      </TableCell>
      <TableCell>
        {Boolean(isUserTester) ? (
          <Button
            disabled
            onClick={async () => {
              await addAppforUserTesting({
                appId: app.id,
                userId: userId,
              });
            }}
          >
            i'm a tester
          </Button>
        ) : (
          <Button
            onClick={async () => {
              await addAppforUserTesting({
                appId: app.id,
                userId: userId,
              });
            }}
          >
            become a tester
          </Button>
        )}
      </TableCell>
      {isUserTester && !isUserTester.isInstalled ? (
        <TableCell className='text-orange-600'>
          please install app on phone
        </TableCell>
      ) : isUserTester && isUserTester.isInstalled ? (
        <TableCell className='text-red-600'>please don't remove app</TableCell>
      ) : (
        <TableCell></TableCell>
      )}
      <TableCell>
        <Switch
          disabled={
            !app.testingAppsUsers.find((item) => item.userId === userId)
          }
          checked={isUserTester?.isInstalled}
          onCheckedChange={async (e) => {
            console.log('e:', e);
            await appInstalledByUser({
              appId: app.id,
              userId: userId,
              isInstalled: e,
            });
          }}
        />
      </TableCell>
    </TableRow>
  );
}
