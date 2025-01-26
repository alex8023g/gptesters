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
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user;
}

export async function getAllUserList() {
  return prisma.user.findMany();
}

export async function getUserByIdWithApp(id: string) {
  return prisma.user.findUnique({
    where: { id },
    include: { userApp: true },
  });
}
