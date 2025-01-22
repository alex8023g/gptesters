'use server';

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { faker } from '@faker-js/faker';

export async function login(email: string) {
  console.log(email);
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user) {
    redirect(`/user/${user.id}`);
  } else {
    return { message: 'no such user' };
  }
}

export async function addUser() {
  const user = await prisma.user.create({
    data: {
      email: faker.internet.email({ provider: 'gmail.com' }),
    },
  });
  redirect(`/user/${user.id}`);
}

export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
    }
  }
}
