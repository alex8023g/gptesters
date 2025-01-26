'use server';
import { prisma } from '@/lib/prisma';
import { App, TestingAppsUsers } from '@prisma/client';
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

export async function getAppsForTesting({
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
    orderBy: { createdAt: 'asc' },
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
  return prisma.app.findUnique({
    where: { id },
  });
}

export async function getUserAppList(id: string) {
  return prisma.app.findMany({
    where: { id },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getUserAppTesters(appId: string | undefined) {
  return prisma.testingAppsUsers.findMany({
    where: { appId },
  });
}

export async function getUserAppTestersEmails(appId: string | undefined) {
  const userAppTestersWithUserData = await prisma.testingAppsUsers.findMany({
    where: { appId },
    select: {
      user: {
        select: { email: true },
      },
    },
  });

  return userAppTestersWithUserData.map((item) => item.user.email);
}

export async function revalidatePathUser(userId: string) {
  revalidatePath(`/user/${userId}`, 'page');
}

type CheckAndRevalidateUserPageArg = {
  userId: string;
  appId: string;
  notUserAppList: App[];
  userAppTesters: TestingAppsUsers[];
};

export async function checkAndRevalidateUserPage({
  userId,
  appId,
  notUserAppList,
  userAppTesters,
}: CheckAndRevalidateUserPageArg) {
  const notUserAppListUpd = await prisma.app.findMany({
    where: { userId: { not: userId } },
  });

  const userAppTestersUpd = await prisma.testingAppsUsers.findMany({
    where: { appId },
  });

  if (
    JSON.stringify(userAppTestersUpd) !== JSON.stringify(userAppTesters) ||
    JSON.stringify(notUserAppListUpd) !== JSON.stringify(notUserAppList)
  ) {
    console.log('notUserAppListUpd:', notUserAppListUpd, notUserAppList);
    revalidatePath(`/user/${userId}`);
  }
}
