import { App, TestingAppsUsers, User } from '@prisma/client';
import { TableCell, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';

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
  // console.log('app:', app, userId);
  const testingAppsUser = app.testingAppsUsers[0];

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
      {/* <TableCell className=''>{app.name}</TableCell> */}
      <TableCell>
        {/* {Boolean(isUserTester) ? ( */}
        {Boolean(testingAppsUser?.addedAsTester) ? (
          <a href={app.url} target='_blank' className='underline'>
            {/* {app.url} */}app in Google Play
          </a>
        ) : (
          <span className='text-gray-400'>
            {/* {app.url} */}app in Google Play
          </span>
        )}
      </TableCell>
      {/* <TableCell>
        {testingAppsUser?.addedAsTester ? (
          <span>you added as a tester</span>
        ) : (
          <span className='text-gray-400'>
            you are Not added as a tester yet
          </span>
        )}
      </TableCell> */}
      {!testingAppsUser?.addedAsTester ? (
        <TableCell>
          <span className='text-gray-400'>
            you are Not added as a tester yet
          </span>
        </TableCell>
      ) : !testingAppsUser.isInstalled ? (
        <TableCell className='text-orange-600'>
          please install app on phone
        </TableCell>
      ) : app.testCompleted ? (
        <TableCell>please, remove app (test completed)</TableCell>
      ) : (
        <TableCell className='text-red-600'>
          please don&apos;t remove app
        </TableCell>
      )}
      <TableCell>
        <Switch
          disabled={!testingAppsUser?.addedAsTester}
          checked={testingAppsUser?.isInstalled}
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
