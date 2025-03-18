import { appAction } from '@/actions/appActions/appAction';
import { AddAppForm } from '@/components/AddAppForm';
import { AppForTestList } from '@/components/AppForTestList';
import { redirect } from 'next/navigation';
import { userAction } from '@/actions/userActions/userAction';
import { ExportTesterListToCsvBtn } from '@/components/ExportTesterListToCsvBtn';
import { AddAsTestersBtn } from '@/components/AddAsTestersBtn';
import { TestingAppsUsers } from '@prisma/client';
import Image from 'next/image';
import { TestCompletedSwitch } from '@/components/TestCompletedSwitch';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { HaveEnoughTestersCheckbox } from '@/components/HaveEnoughTestersCheckbox';

export async function generateMetadata({
  params: { userid },
}: {
  params: { userid: string };
}) {
  const userWithHisApp = await userAction.getUserByIdWithApp(userid);
  return {
    title: userWithHisApp?.email,
  };
}

export const revalidate = 1;
export const dynamic = 'force-dynamic';

type Props = {
  params: { userid: string };
};

export default async function UserPage({ params: { userid } }: Props) {
  const session = await getServerSession(authOptions);
  console.log('🚀 ~ UserPage ~ session:', session);

  // if (!session) {
  //   redirect(`/`);
  // } else if (session.user.id !== userid) {
  //   redirect(`/user/${session.user.id}`);
  // }

  const userWithHisApp = await userAction.getUserByIdWithApp(userid);
  if (!userWithHisApp) redirect('/');

  if (!userWithHisApp.userApp) {
    return (
      <main className='p-3'>
        <p className='mb-3 font-semibold'>
          Select All countries, it`s important!
        </p>
        <Image
          className='mb-3 rounded-lg border shadow-md'
          src={'/img/countries.png'}
          width={700}
          height={300}
          alt='screenshot'
        />

        <AddAppForm user={userWithHisApp} />
        <Image
          className='rounded-lg border shadow-md'
          src={'/img/testerspage.png'}
          width={700}
          height={300}
          alt='screenshot'
        />
      </main>
    );
  }

  const appsForTesting = await appAction.getAppsForTesting({
    userId: userid,
    appId: userWithHisApp.userApp.id,
  });
  // const appsForTesting = userWithHisApp.userApp
  //   ? await appAction.getAppsForTesting({
  //       userId: userid,
  //       appId: userWithHisApp.userApp.id,
  //     })
  //   : [];

  const userAppTesters = await appAction.getUserAppTesters(
    userWithHisApp.userApp.id,
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

  const installUsers = userAppTesters.reduce(
    (acc: string[], item: TestingAppsUsers) => {
      if (item.isInstalled) {
        acc.push(item.userId);
      }
      return acc;
    },
    [],
  );
  console.log('🚀 ~ UserPage ~ installUsers:', installUsers);

  const notUserAppList = await appAction.getNotUserAppList(userid);
  // console.log(userWithHisApp.id, 'notUserAppList:', notUserAppList);

  const allTestersEmails = await appAction.getAllTesterEmails({
    userId: userid,
    // appId: userWithHisApp.userApp.id,
  });

  const isNotAddedTesters = await appAction.isNotAddedTesters(
    userWithHisApp.userApp.id,
  );

  // const isNotAddedTesters = userWithHisApp.userApp
  //   ? await appAction.isNotAddedTesters(userWithHisApp.userApp.id)
  //   : null;
  // console.log('🚀 ~ isNotAddedTesters:', isNotAddedTesters);

  return (
    <main className='p-3'>
      {/* <div>
        <span>your email: </span>
        <span className='font-bold'>{userWithHisApp.email} </span>
        <span>userId: </span>
        <span className='font-bold'>{userWithHisApp.id}</span>
        <div className='mr-1'>
          your app
          <Link
            href={userWithHisApp.userApp.url}
            className='pl-1 font-bold underline'
          >
            {userWithHisApp.userApp.name}
          </Link>
          <span> appId: {userWithHisApp.userApp.id}</span>
        </div>
      </div> */}
      <div className='mb-3 rounded-lg border p-3 shadow-md'>
        {/* <HasEnoughInstallationsSwitch
          app={userWithHisApp.userApp}
          userId={userid}
        /> */}

        <div className='mb-2'>
          your app installed:
          <span className='px-1 font-bold'>{installsAmount}</span>
          times
        </div>
        {!userWithHisApp.userApp.hasTwelveInstallations && (
          <HaveEnoughTestersCheckbox
            app={userWithHisApp.userApp}
            userId={userid}
          />
        )}
        <p>export testers list to csv and add to google play console</p>

        <ExportTesterListToCsvBtn
          allTestersEmails={allTestersEmails}
          userId={userid}
          appId={userWithHisApp.userApp.id}
        />
        {isNotAddedTesters && (
          <>
            <p>
              after testers list will be added to google play console push the
              button
            </p>
            <AddAsTestersBtn
              appId={userWithHisApp.userApp.id}
              userId={userid}
            />
          </>
        )}

        {!isNotAddedTesters && (
          <TestCompletedSwitch app={userWithHisApp.userApp} userId={userid} />
        )}
      </div>
      <AppForTestList
        userId={userid}
        appId={userWithHisApp.userApp.id}
        userAppTesters={userAppTesters}
        notUserAppList={notUserAppList}
        // userWithHisApp={userWithHisApp}
        appsForTesting={appsForTesting}
      />
    </main>
  );
}
