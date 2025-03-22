import { userAction } from '@/actions/userActions/userAction';
import { AddFakerUserBtn } from '@/components/AddFakerUserBtn';
import { UsersList } from '@/components/UsersList';

export const revalidate = 0;

export default async function HomePage() {
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
