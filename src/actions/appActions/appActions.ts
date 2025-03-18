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
  await prisma.app.create({
    data: {
      name: app.name,
      url: app.url,
      userId,
    },
  });

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
  await prisma.testingAppsUsers.update({
    where: {
      appId_userId: {
        appId,
        userId,
      },
    },
    data: {
      isInstalled,
    },
  });

  const amountAppInstalled = await prisma.testingAppsUsers
    .findMany({
      where: { appId },
    })
    .then((appInstalled) => appInstalled.filter((app) => app.isInstalled));

  // console.log('🚀 ~ amountAppInstalled:', amountAppInstalled.length);
  if (amountAppInstalled.length >= 12) {
    await prisma.app.update({
      where: { id: appId },
      data: { hasTwelveInstallations: true },
    });
  } else {
    await prisma.app.update({
      where: { id: appId },
      data: { hasTwelveInstallations: false },
    });
  }

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
  await prisma.testingAppsUsers.create({
    data: {
      appId,
      userId,
      isInstalled: false,
    },
  });

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
  appId: string;
}) {
  const res = await prisma.app.findMany({
    where: {
      userId: { not: userId },
    },
    include: {
      author: true,
      // testingAppsUsers: true,
      testingAppsUsers: { where: { userId } },
    },
    orderBy: { createdAt: 'asc' },
  });
  const res2 = await Promise.all(
    res.map(async (app) => {
      const authorAsUsersAppTester = await prisma.testingAppsUsers.findUnique({
        where: {
          appId_userId: {
            userId: app.author.id,
            appId: appId,
          },
        },
      });

      return { ...app, authorAsUsersAppTester: authorAsUsersAppTester };
    }),
  );
  // console.dir(res2, { depth: Infinity });

  // return res2;
  return res2.filter(
    (app) =>
      (!app.hasEnoughInstallations && !app.hasTwelveInstallations) ||
      app.testingAppsUsers[0]?.isInstalled ||
      app.authorAsUsersAppTester?.isInstalled,
  );
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

export async function isNotAddedTesters(appId: string) {
  const userAppTesters = await prisma.testingAppsUsers.findMany({
    where: { appId },
  });

  return userAppTesters.some((item) => !item.addedAsTester);
}

export async function addAsTester({
  appId,
  userId,
}: {
  appId: string;
  userId: string;
}) {
  await prisma.testingAppsUsers.updateMany({
    where: {
      appId,
    },
    data: { addedAsTester: true },
  });
  revalidatePath(`/user/${userId}`, 'page');
}

export async function addUsersAsTesters({
  userId,
  appId,
}: {
  userId: string;
  appId: string;
}) {
  const allTesters = await prisma.user.findMany({
    where: { id: { not: userId } },
  });

  await prisma.testingAppsUsers.createMany({
    data: allTesters.map((user) => ({
      appId,
      userId: user.id,
    })),
    skipDuplicates: true,
  });
  revalidatePath(`/user/${userId}`, 'page');
}

export async function getAllTesterEmails({
  userId,
  // appId,
}: {
  userId: string;
  // appId: string;
}) {
  const allTesters = await prisma.user.findMany({
    where: { id: { not: userId } },
  });

  return allTesters.map((item) => item.email);
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
    // console.log('notUserAppListUpd:', notUserAppListUpd, notUserAppList);
    revalidatePath(`/user/${userId}`);
  }
}

export async function markAppHasEnoughInstalls({
  appId,
  userId,
  hasEnoughInstallations,
}: {
  appId: string;
  userId: string;
  hasEnoughInstallations: boolean;
}) {
  await prisma.app.update({
    where: { id: appId },
    data: {
      hasEnoughInstallations,
    },
  });
  revalidatePath(`/user/${userId}`);
}
export async function markAppTestCompleted({
  appId,
  userId,
  testCompleted,
}: {
  appId: string;
  userId: string;
  testCompleted: boolean;
}) {
  const res = await prisma.app.update({
    where: { id: appId },
    data: {
      testCompleted,
    },
  });
  console.log('🚀 ~ res:', res);
  revalidatePath(`/user/${userId}`);
}
