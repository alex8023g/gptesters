/*
  Warnings:

  - You are about to drop the `AppType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AppType" DROP CONSTRAINT "AppType_userId_fkey";

-- DropForeignKey
ALTER TABLE "TestingApps" DROP CONSTRAINT "TestingApps_appId_fkey";

-- DropTable
DROP TABLE "AppType";

-- CreateTable
CREATE TABLE "App" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "App_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "App" ADD CONSTRAINT "App_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestingApps" ADD CONSTRAINT "TestingApps_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
