import { appAction } from '@/actions/appActions/appAction';
import { AddAppForm } from '@/components/AddAppForm';
import { AppForTestList } from '@/components/AppForTestList';
import { redirect } from 'next/navigation';
import { userAction } from '@/actions/userActions/userAction';
import Link from 'next/link';
import { ExportTesterListToCsvBtn } from '@/components/ExportTesterListToCsvBtn';
import { AddAsTestersBtn } from '@/components/AddAsTestersBtn';
import { TestingAppsUsers } from '@prisma/client';
import Image from 'next/image';
import { HasEnoughInstallationsSwitch } from '@/components/HasEnaughInstallationsSwitch';

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
    appId: userWithHisApp.userApp?.id,
  });

  const userAppTesters = await appAction.getUserAppTesters(
    userWithHisApp.userApp?.id,
  );

  const installsAmount = userAppTesters.reduce(
    (acc: number, item: TestingAppsUsers) => {
      if (item.isInstalled) {
        acc++;
      }
      return acc;
    },
    0,
  );

  const notUserAppList = await appAction.getNotUserAppList(userid);
  // console.log(userWithHisApp.id, 'notUserAppList:', notUserAppList);

  const allTestersEmails = await appAction.getAllTesterEmails({
    userId: userid,
    // appId: userWithHisApp.userApp.id,
  });

  const isNotAddedTesters = userWithHisApp.userApp
    ? await appAction.isNotAddedTesters(userWithHisApp.userApp.id)
    : null;
  // console.log('🚀 ~ isNotAddedTesters:', isNotAddedTesters);

  return (
    <main className='px-3'>
      {/* <h1 className=''>UserPage</h1> */}
      <div>
        <span>your email: </span>
        <span className='font-bold'>{userWithHisApp?.email}</span>
      </div>
      <div>
        {userWithHisApp.userApp ? (
          <>
            <div className='flex'>
              <div className='mr-1'>
                your app:{' '}
                <Link
                  href={userWithHisApp.userApp.url}
                  className='font-bold underline'
                >
                  {userWithHisApp.userApp.name}
                </Link>
                {/* <span>appId: {userWithHisApp.userApp.id}</span> */}
              </div>
              <div className=''>
                installed:
                <span className='px-1 font-bold'>{installsAmount}</span>
                times
              </div>
            </div>
            {/* <div className='flex space-x-2 py-2'>
              <span className=''>I need more testers</span>
              <Switch className='my-auto' />
              <span>I have enough testers</span>
            </div> */}
            <HasEnoughInstallationsSwitch
              app={userWithHisApp.userApp}
              userId={userid}
            />
            <p>export testers list to csv and add to google play console</p>
            <ExportTesterListToCsvBtn
              allTestersEmails={allTestersEmails}
              userId={userid}
              appId={userWithHisApp.userApp.id}
            />
            {isNotAddedTesters && (
              <>
                <p>
                  after testers list will be added to google play console push
                  the button
                </p>
                <AddAsTestersBtn
                  appId={userWithHisApp.userApp.id}
                  userId={userid}
                />
              </>
            )}
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
            <h2>add link to app from google play console</h2>
            <p>
              example:
              https://play.google.com/store/apps/details?id=todo.cap.v1.com
            </p>
            <AddAppForm user={userWithHisApp} />
            <Image
              src={'/img/testerspage.png'}
              width={1000}
              height={1000}
              alt='screenshot'
            />
          </>
        )}
      </div>
    </main>
  );
}
