import { UserWithApps } from '@/types/types';
import Link from 'next/link';

export function UserAppsList({ userWithApps }: { userWithApps: UserWithApps }) {
  return (
    <>
      <h2 className='font-bold'>UserAppsList:</h2>
      <ul>
        {userWithApps.userApps.map((app) => (
          <li key={app.id}>
            <Link href={`/user/${userWithApps.id}/app/${app.id}`}>
              {app.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
