'use server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

type Arg = {
  userId: string;
  app: {
    name: string;
    url: string;
  };
};

export async function addAppAction({ userId, app }: Arg) {
  const res = await prisma.app.create({
    data: {
      name: app.name,
      url: app.url,
      userId,
    },
  });
  console.log('res:', res);
  revalidatePath(`/user/${userId}`);
}
