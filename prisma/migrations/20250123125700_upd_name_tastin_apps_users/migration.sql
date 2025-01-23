/*
  Warnings:

  - You are about to drop the `TestingApps` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TestingApps" DROP CONSTRAINT "TestingApps_appId_fkey";

-- DropForeignKey
ALTER TABLE "TestingApps" DROP CONSTRAINT "TestingApps_userId_fkey";

-- DropTable
DROP TABLE "TestingApps";

-- CreateTable
CREATE TABLE "TestingAppsUsers" (
    "appId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isInstalled" BOOLEAN NOT NULL,

    CONSTRAINT "TestingAppsUsers_pkey" PRIMARY KEY ("appId","userId")
);

-- AddForeignKey
ALTER TABLE "TestingAppsUsers" ADD CONSTRAINT "TestingAppsUsers_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestingAppsUsers" ADD CONSTRAINT "TestingAppsUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
