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
  const res = await prisma.testingAppsUsers.updateMany({
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
  const res = await prisma.testingAppsUsers.create({
    data: {
      appId,
      userId,
      isInstalled: false,
    },
  });
  console.log('res:', res);
  revalidatePath(`/user/${userId}`);
}

export async function getNotUserAppList(userId: string | undefined) {
  return prisma.app.findMany({
    where: { userId: { not: userId } },
  });
}

export async function getAppsForTestind({
  userId,
  appId,
}: {
  userId: string;
  appId: string | undefined;
}) {
  const res = await prisma.app.findMany({
    where: {
      userId: { not: userId },
    },
    include: {
      author: true,
      testingAppsUsers: true,
    },
    orderBy: { createdAt: 'desc' },
  });
  const res2 = await Promise.all(
    res.map(async (app) => {
      const authorAsUsersAppTester = await prisma.testingAppsUsers.findMany({
        where: {
          userId: app.author.id,
          appId: appId,
        },
      });
      return { ...app, authorAsUsersAppTester: authorAsUsersAppTester[0] };
    }),
  );
  console.log('res2!!!');
  console.dir(res2, { depth: Infinity });
  return res2;
}

export async function getAppById(id: string) {
  return await prisma.app.findUnique({
    where: { id },
  });
}

export async function getUserAppList(id: string) {
  return await prisma.app.findMany({
    where: { id },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getUserAppTesters(appId: string | undefined) {
  return await prisma.testingAppsUsers.findMany({
    where: { appId },
  });
}

export async function revalidatePathUser(userId: string) {
  revalidatePath(`/user/${userId}`, 'page');
}
