import { App, TestingApps, User } from '@prisma/client';
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

type Props = {
  app: App & { usersTesting: TestingApps[]; author: User };
  userId: string;
};

export function AppForTestItem({ app, userId }: Props) {
  const isUserTester = app.usersTesting.find((item) => item.userId === userId);
  return (
    <TableRow key={app.id} className=''>
      <TableCell className=''>{app.author.email}</TableCell>
      <TableCell className=''>{app.name}</TableCell>
      <TableCell>
        <Link href={app.url}>{app.url}</Link>
      </TableCell>
      <TableCell>
        {Boolean(isUserTester) ? (
          <Button
            disabled
            onClick={async () => {
              await addAppforUserTesting({ appId: app.id, userId });
            }}
          >
            i'm a tester
          </Button>
        ) : (
          <Button
            onClick={async () => {
              await addAppforUserTesting({ appId: app.id, userId });
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
          disabled={!app.usersTesting.find((item) => item.userId === userId)}
          checked={isUserTester?.isInstalled}
          onCheckedChange={async (e) => {
            console.log('e:', e);
            await appInstalledByUser({
              appId: app.id,
              userId,
              isInstalled: e,
            });
          }}
        />
      </TableCell>
    </TableRow>
  );
}
