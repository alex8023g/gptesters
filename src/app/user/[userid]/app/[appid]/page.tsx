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
  });
  return (
    <>
      <h1>AppPage</h1>
      <h2>user: {user?.email}</h2>
      <h2>app: {userAppList[userAppIndex].name}</h2>
      <AppForTestList userId={userid} appsForTesting={appsForTesting} />
    </>
  );
}
