import { appAction } from '@/actions/appActions/appAction';
import { AddAppForm } from '@/components/AddAppForm';
import { AppForTestList } from '@/components/AppForTestList/AppsForTestList';
import { UserAppsList } from '@/components/UserAppsList';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import _ from 'lodash';
import { userAction } from '@/actions/userActions/userAction';
import Link from 'next/link';
import { getUserAppTesters } from '@/actions/appActions/appActions';

export const revalidate = 1;
export const dynamic = 'force-dynamic';

export default async function UserPage({
  params: { userid },
}: {
  params: { userid: string };
}) {
  const userWithHisApp = await userAction.getUserByIdWithApp(userid);
  if (!userWithHisApp) redirect('/');

  const appsForTesting = await appAction.getAppsForTestind({
    userId: userid,
    appId: userWithHisApp?.userApp?.id,
  });

  const userAppTesters = userWithHisApp?.userApp?.id
    ? await getUserAppTesters(userWithHisApp?.userApp?.id)
    : [];

  return (
    <main className='px-3'>
      <h1 className='font-bold'>UserPage</h1>
      <div>
        <span>your email: </span>
        <span>{userWithHisApp?.email}</span>
      </div>
      <div>
        {userWithHisApp.userApp ? (
          <>
            <h2>
              your application:{' '}
              <Link href={userWithHisApp.userApp.url} className='underline'>
                {userWithHisApp.userApp.name}
              </Link>
            </h2>
            <AppForTestList
              userId={userid}
              appId={userWithHisApp.userApp.id}
              userAppTesters={userAppTesters}
              // userWithHisApp={userWithHisApp}
              appsForTesting={appsForTesting}
            />
          </>
        ) : (
          <>
            <h2>добавьте приложение для тестирования</h2>
            <AddAppForm user={userWithHisApp} />
          </>
        )}
      </div>
    </main>
  );
}
