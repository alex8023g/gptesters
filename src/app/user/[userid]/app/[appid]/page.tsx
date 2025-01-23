import { appAction } from '@/actions/appActions/appAction';
import { userAction } from '@/actions/userActions/userAction';
import { AppForTestList } from '@/components/AppForTestList/AppsForTestList';

type Props = {
  params: { userid: string; appid: string };
};

export default async function AppPage({ params: { userid, appid } }: Props) {
  const user = await userAction.getUserById(userid);
  const userAppList = await appAction.getUserAppList(userid);
  const userAppIndex = userAppList.findIndex((app) => app.id === appid);
  const appsForTesting = await appAction.getAppsForTestind({
    userId: userid,
    userAppIndex,
    appId: appid,
  });

  const userAppTestersList = await appAction.getTestersByAppId(appid);

  return (
    <>
      <h1 className='font-bold'>AppPage</h1>
      <h2>
        user: <span className='font-bold'>{user?.email}</span>
      </h2>
      <h2>
        app: <span className='font-bold'>{userAppList[userAppIndex].name}</span>
      </h2>
      <AppForTestList userId={userid} appsForTesting={appsForTesting} />
    </>
  );
}
