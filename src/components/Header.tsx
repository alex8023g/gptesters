'use client';
import { Session } from 'next-auth';
import { UserMenuAvatar } from './UserMenuAvatar';
import { usePathname } from 'next/navigation';
import { twJoin } from 'tailwind-merge';

type Props = {
  session: Session | null;
};

export function Header({ session }: Props) {
  // const session = await getServerSession(authOptions);
  const pathname = usePathname();
  console.log('🚀 ~ Header ~ pathname:', pathname);

  return (
    <header
      className={twJoin(
        'sticky left-0 top-0 z-10 border-b bg-opacity-20 bg-clip-padding py-2 backdrop-blur-lg backdrop-filter',
        pathname === '/login' ? 'hidden' : '',
      )}
    >
      {/* <div className='mx-auto flex px-5 sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px]'> */}
      <div className='mx-auto flex px-4 sm:px-6 xl:max-w-none xl:px-8'>
        {/* <Image
          className='dark:invert'
          src='/logo.svg'
          alt='Next.js logo'
          width={110}
          height={50}
          priority
        /> */}
        <span className='text-lg font-bold'>GP Testers</span>
        <UserMenuAvatar session={session} />
      </div>
    </header>
  );
}
