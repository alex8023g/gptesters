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

type Props = {
  userId: string;
  appId: string;
  userAppTesters: TestingAppsUsers[];
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
}: Props) {
  const [userAppTestersSt, setUserAppTestersSt] = useState(userAppTesters);
  useEffect(() => {
    const interval = setInterval(async () => {
      const userAppTestersUpd = await getUserAppTesters(appId);
      if (
        JSON.stringify(userAppTestersUpd) !== JSON.stringify(userAppTestersSt)
      ) {
        setUserAppTestersSt(userAppTestersUpd);
        console.log('userAppTestersSt:', userAppTestersSt);
      }
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [userAppTestersSt]);
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
