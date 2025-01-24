'use client';
import { App, TestingAppsUsers, User } from '@prisma/client';
import Link from 'next/link';
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
import {
  addAppforUserTesting,
  appInstalledByUser,
  getUserAppTesters,
} from '@/actions/appActions/appActions';
import { AppForTestItem } from './AppForTestItem';
import { useEffect, useState } from 'react';
import { revalidatePath } from 'next/cache';
import { appAction } from '@/actions/appActions/appAction';

type Props = {
  userId: string;
  appId: string;
  userAppTesters: TestingAppsUsers[];
  notUserAppList: App[];
  // userWithHisApp: User & { userApp: App | null };
  appsForTesting: (App & {
    author: User;
    testingAppsUsers: TestingAppsUsers[];
    authorAsUsersAppTester: TestingAppsUsers;
  })[];
};

export function AppForTestList({
  userId,
  appId,
  userAppTesters,
  appsForTesting,
  notUserAppList,
}: Props) {
  // const [userAppTestersSt, setUserAppTestersSt] = useState(userAppTesters);
  useEffect(() => {
    const interval = setInterval(async () => {
      const userAppTestersUpd = await appAction.getUserAppTesters(appId);
      const notUserAppListUpd = await appAction.getNotUserAppList(userId);
      if (
        JSON.stringify(userAppTestersUpd) !== JSON.stringify(userAppTesters) ||
        JSON.stringify(notUserAppListUpd) !== JSON.stringify(notUserAppList)
      ) {
        // setUserAppTestersSt(userAppTestersUpd);
        console.log('notUserAppListUpd:', notUserAppListUpd, notUserAppList);
        appAction.revalidatePathUser(`/user/${userId}`);
      }
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [userAppTesters, notUserAppList]);
  return (
    <>
      <h1 className='font-bold'>AppsForTestList:</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>user</TableHead>
            <TableHead>comment</TableHead>
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
