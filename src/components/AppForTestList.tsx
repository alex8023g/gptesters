'use client';
import { App, TestingAppsUsers, User } from '@prisma/client';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AppForTestItem } from './AppForTestItem';
import { useEffect } from 'react';
import { checkAndRevalidateUserPage } from '@/actions/appActions/appActions';

type Props = {
  userId: string;
  appId: string;
  userAppTesters: TestingAppsUsers[];
  notUserAppList: App[];
  // userWithHisApp: User & { userApp: App | null };
  appsForTesting: (App & {
    author: User;
    testingAppsUsers: TestingAppsUsers[];
    authorAsUsersAppTester: TestingAppsUsers | null;
  })[];
};

export function AppForTestList({
  userId,
  appId,
  userAppTesters,
  appsForTesting,
  notUserAppList,
}: Props) {
  useEffect(() => {
    const interval = setInterval(async () => {
      checkAndRevalidateUserPage({
        userId,
        appId,
        notUserAppList,
        userAppTesters,
      });
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [userAppTesters, notUserAppList, appId, userId]);
  return (
    <>
      <h1 className=''>AppsForTestList:</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>user</TableHead>
            <TableHead>comment</TableHead>
            {/* <TableHead>add as a tester to gpc</TableHead> */}
            <TableHead>app name</TableHead>
            <TableHead>app url</TableHead>
            <TableHead>become a tester</TableHead>
            <TableHead>comment</TableHead>
            <TableHead>app installed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appsForTesting.map((app) => (
            <AppForTestItem
              key={app.id}
              app={app}
              userId={userId}
              // userWithHisApp={userWithHisApp}
            />
          ))}
        </TableBody>
      </Table>
    </>
  );
}
