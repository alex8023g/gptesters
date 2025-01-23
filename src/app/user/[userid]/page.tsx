import { appAction } from '@/actions/appActions/appAction';
import { AddAppForm } from '@/components/AddAppForm';
import { AppForTestList } from '@/components/AppForTestList/AppsForTestList';
import { UserAppsList } from '@/components/UserAppsList';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import _ from 'lodash';

export default async function UserPage({
  params,
}: {
  params: { userid: string };
}) {
  console.log(params.userid);

  const userWithHisApps = await prisma.user.findUnique({
    where: { id: params.userid },
    include: { userApps: true },
  });

  // const appsForTesting = await appAction.getAppsForTestind({
  //   userId: params.userid,
  // });

  if (!userWithHisApps) redirect('/');
  return (
    <main className='px-3'>
      <h1 className='font-bold'>UserPage</h1>
      <div>
        <span>ваш email: </span>
        <span>{userWithHisApps?.email}</span>
      </div>
      <div>
        <h2>добавьте приложение для тестирования</h2>
        <AddAppForm user={userWithHisApps} />
        <UserAppsList userWithApps={userWithHisApps} />
        {/* <AppForTestList
          userId={params.userid}
          appsForTesting={appsForTesting}
        /> */}
      </div>
    </main>
  );
}
