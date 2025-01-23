'use server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

type AddAppActionArg = {
  userId: string;
  app: {
    name: string;
    url: string;
  };
};

export async function addAppAction({ userId, app }: AddAppActionArg) {
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

type AppInstalledByUserArg = {
  appId: string;
  userId: string;
  isInstalled: boolean;
};

export async function appInstalledByUser({
  appId,
  userId,
  isInstalled,
}: AppInstalledByUserArg) {
  const res = await prisma.testingApps.updateMany({
    where: {
      appId,
      userId,
    },
    data: {
      isInstalled,
    },
  });
  console.log('res:', res);
  revalidatePath(`/user/${userId}`);
}

type AddAppforUserTestingArg = {
  appId: string;
  userId: string;
};

export async function addAppforUserTesting({
  appId,
  userId,
}: AddAppforUserTestingArg) {
  const res = await prisma.testingApps.create({
    data: {
      appId,
      userId,
      isInstalled: false,
    },
  });
  console.log('res:', res);
  revalidatePath(`/user/${userId}`);
}

export async function getAppsForTestind({ userId }: { userId: string }) {
  const res = await prisma.app.findMany({
    where: {
      userId: { not: userId },
    },
    include: {
      author: true,
      usersTesting: true,
    },
    orderBy: { createdAt: 'desc' },
  });
  console.dir(res);
  return res;
}

export async function getAppById(id: string) {
  return await prisma.app.findUnique({
    where: { id },
  });
}

export async function getUserAppList(userId: string) {
  return await prisma.app.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
}
