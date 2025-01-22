import { User } from '@prisma/client';
import Link from 'next/link';

export function UsersList({ users }: { users: User[] }) {
  console.log('users!:', users);
  return (
    <>
      <h1 className='font-bold'>UsersList:</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/user/${user.id}`}>{user.email}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
