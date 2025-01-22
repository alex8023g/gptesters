import { UserApps } from '@/types/types';

export function UserAppsList({ userApps }: { userApps: UserApps }) {
  return (
    <>
      <h2 className='font-bold'>UserAppsList:</h2>
      <ul>
        {userApps.apps.map((app) => (
          <li key={app.id}>{app.name}</li>
        ))}
      </ul>
    </>
  );
}
