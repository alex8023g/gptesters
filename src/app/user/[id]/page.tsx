import { AddAppForm } from '@/components/AddAppForm';
import { AppsForTestList } from '@/components/AppsForTestList';
import { UserAppsList } from '@/components/UserAppsList';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default async function UserPage({ params }: { params: { id: string } }) {
  console.log(params.id);

  const userApps = await prisma.user.findUnique({
    where: { id: params.id },
    include: { apps: true },
  });

  const allApps = await prisma.app.findMany({});

  console.log('userApps:', userApps, 'allApps', allApps);

  if (!userApps) redirect('/');
  return (
    <main className='px-3'>
      <h1>UserPage</h1>
      <div>
        <span>ваш email: </span>
        <span>{userApps?.email}</span>
      </div>
      <div>
        <h2>добавьте приложение для тестирования</h2>
        <AddAppForm user={userApps} />
        <UserAppsList userApps={userApps} />
        <AppsForTestList
          allApps={allApps.filter((app) => app.userId !== params.id)}
        />
      </div>
    </main>
  );
}
