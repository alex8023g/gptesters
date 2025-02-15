import { App, TestingAppsUsers, User } from '@prisma/client';
import { TableCell, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';

import { appAction } from '@/actions/appActions/appAction';

type Props = {
  app: App & {
    testingAppsUsers: TestingAppsUsers[];
    author: User;
    authorAsUsersAppTester: TestingAppsUsers | null;
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
      <TableCell className=''>
        {app.authorAsUsersAppTester?.addedAsTester ? (
          app.authorAsUsersAppTester?.isInstalled ? (
            <span className='inline-block text-green-700'>
              installed your app
            </span>
          ) : (
            <span className='inline-block text-gray-400'>
              added as your app tester
            </span>
          )
        ) : (
          <span className='inline-block text-orange-500'>
            not added as a tester yet
          </span>
        )}
        {/* {app.authorAsUsersAppTester?.isInstalled && (
          <span className='inline-block text-green-700'>
            installed your app
          </span>
        )} */}
      </TableCell>
      {/* <TableCell>
        <Switch />
      </TableCell> */}
      <TableCell className=''>{app.name}</TableCell>
      <TableCell>
        {Boolean(isUserTester) ? (
          <Link href={app.url} className='underline'>
            {app.url}
          </Link>
        ) : (
          <span className='text-gray-400'>{app.url}</span>
        )}
      </TableCell>
      <TableCell>
        {/* {Boolean(isUserTester) ? (
          <Button
            disabled
            onClick={async () => {
              await addAppforUserTesting({
                appId: app.id,
                userId: userId,
              });
            }}
          >
            i&apos;m a tester
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
        )} */}
        {Boolean(isUserTester) ? (
          <span>you added as a tester</span>
        ) : (
          <span className='text-gray-400'>you Not added as a tester yet</span>
        )}
      </TableCell>
      {isUserTester && !isUserTester.isInstalled ? (
        <TableCell className='text-orange-600'>
          please install app on phone
        </TableCell>
      ) : isUserTester && isUserTester.isInstalled ? (
        <TableCell className='text-red-600'>
          please don&apos;t remove app
        </TableCell>
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
            // console.log('e:', e);
            await appAction.appInstalledByUser({
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
