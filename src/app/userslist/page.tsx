import { userAction } from '@/actions/userActions/userAction';
import { AddFakerUserBtn } from '@/components/AddFakerUserBtn';
import { UsersList } from '@/components/UsersList';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { Role } from '@prisma/client';

export const revalidate = 0;

export default async function UsersListPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(`/login`);
  }
  if (session.user.role !== Role.ADMIN) {
    redirect(`/user/${session.user.id}`);
  }
  const users = await userAction.getAllUserList();
  return (
    <main className='flex h-full flex-col'>
      <div className='m-auto'>
        <AddFakerUserBtn />
        <UsersList users={users} />
      </div>
    </main>
  );
}
