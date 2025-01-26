import { appAction } from '@/actions/appActions/appAction';
import { AddAppForm } from '@/components/AddAppForm';
import { AppForTestList } from '@/components/AppForTestList';
import { redirect } from 'next/navigation';
import { userAction } from '@/actions/userActions/userAction';
import Link from 'next/link';
import { ExportTesterListToCsvBtn } from '@/components/ExportTesterListToCsvBtn';

export const revalidate = 1;
export const dynamic = 'force-dynamic';

export default async function UserPage({
  params: { userid },
}: {
  params: { userid: string };
}) {
  const userWithHisApp = await userAction.getUserByIdWithApp(userid);
  if (!userWithHisApp) redirect('/');

  const appsForTesting = await appAction.getAppsForTesting({
    userId: userid,
    appId: userWithHisApp?.userApp?.id,
  });

  const userAppTesters = await appAction.getUserAppTesters(
    userWithHisApp.userApp?.id,
  );
  const notUserAppList = await appAction.getNotUserAppList(userid);
  console.log(userWithHisApp.id, 'notUserAppList:', notUserAppList);

  const userAppTestersEmails = await appAction.getUserAppTestersEmails(
    userWithHisApp.userApp?.id,
  );

  return (
    <main className='px-3'>
      <h1 className=''>UserPage</h1>
      <div>
        <span>your email: </span>
        <span className='font-bold'>{userWithHisApp?.email}</span>
      </div>
      <div>
        {userWithHisApp.userApp ? (
          <>
            <h2 className='mb-3'>
              your application:{' '}
              <Link
                href={userWithHisApp.userApp.url}
                className='font-bold underline'
              >
                {userWithHisApp.userApp.name}
              </Link>
            </h2>
            <ExportTesterListToCsvBtn
              userAppTestersEmails={userAppTestersEmails}
            />
            <AppForTestList
              userId={userid}
              appId={userWithHisApp.userApp.id}
              userAppTesters={userAppTesters}
              notUserAppList={notUserAppList}
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
