import { LoginForm } from '@/components/LoginForm';
import { UsersList } from '@/components/UsersList';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';

export default async function HomePage() {
  const users = await prisma.user.findMany({});
  console.log('users:', users);
  return (
    <main className='flex h-full flex-col'>
      <div className='m-auto'>
        <LoginForm />
        <UsersList users={users} />
      </div>
    </main>
  );
}
