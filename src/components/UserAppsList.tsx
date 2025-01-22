import { UserWithApps } from '@/types/types';

export function UserAppsList({ userWithApps }: { userWithApps: UserWithApps }) {
  return (
    <>
      <h2 className='font-bold'>UserAppsList:</h2>
      <ul>
        {userWithApps.userApps.map((app) => (
          <li key={app.id}>{app.name}</li>
        ))}
      </ul>
    </>
  );
}
