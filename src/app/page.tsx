import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

// export async function generateMetadata({
//   params: { userid },
// }: {
//   params: { userid: string };
// }) {
//   const userWithHisApp = await userAction.getUserByIdWithApp(userid);
//   return {
//     title: userWithHisApp?.email,
//   };
// }

export const revalidate = 1;
export const dynamic = 'force-dynamic';

// type Props = {
//   params: { userid: string };
// };

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(`/login`);
  } else {
    redirect(`/user/${session.user.id}`);
  }

  return <main className='p-3'>Home Page</main>;
}
