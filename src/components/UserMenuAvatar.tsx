'use client';
import { signIn, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { Session } from 'next-auth';
import { UserCircleIconCustom } from './Icons/UserCircleIconCustom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';

type Props = {
  session: Session | null;
};
export function UserMenuAvatar({ session }: Props) {
  const pathname = usePathname();
  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className='border-0 ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
        >
          <button className='ml-auto pr-0'>
            <UserCircleIconCustom color='grey' />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='' side='bottom'>
          <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => signOut()}>
            <span className='mr-auto inline-block'>Sign out</span>
            <LogOut />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  } else if (pathname !== '/login') {
    return (
      <>
        <Button className='ml-auto' onClick={() => signIn('google')}>
          Sign in
        </Button>
        {/* <Button asChild className='ml-auto'>
          <Link href='/login'>Sign in</Link>
        </Button> */}
      </>
    );
  }
}
