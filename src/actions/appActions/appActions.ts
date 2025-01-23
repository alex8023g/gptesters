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

export async function getAppsForTestind({
  userId,
  userAppIndex,
  appId,
}: {
  userId: string;
  userAppIndex: number;
  appId: string;
}) {
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

  const userAppTesters = await prisma.testingApps.findMany({
    where: { appId },
    // include: { user: true },
  });

  console.dir(res, { depth: Infinity });
  const authorsList = new Set<string>();
  res.forEach((app) => authorsList.add(app.author.id));
  console.log('authorList:', authorsList);

  let res2 = Array.from(authorsList).map((authorId) => {
    const authorAppList = res.filter((app) => app.author.id === authorId);
    const userAppTester = userAppTesters.find(
      (appTesting) => appTesting.userId === authorId,
    );
    return { ...authorAppList[userAppIndex], userAppTester };
  });

  res2 = res2.filter((item) => item.id);
  console.dir(res2, { depth: Infinity });
  return res2;
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

export async function getTestersByAppId(appId: string) {
  return await prisma.testingApps.findMany({
    where: { appId },
  });
}
