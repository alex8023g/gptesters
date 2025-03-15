import { userAction } from '@/actions/userActions/userAction';
import { LoginForm } from '@/components/LoginForm';
import { UsersList } from '@/components/UsersList';

export const revalidate = 0;

export default async function HomePage() {
  const users = await userAction.getAllUserList();
  // console.log('users:', users);
  return (
    <main className='flex h-full flex-col'>
      <div className='m-auto'>
        <LoginForm />
        <UsersList users={users} />
      </div>
    </main>
  );
}
