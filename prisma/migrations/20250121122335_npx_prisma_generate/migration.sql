/*
  Warnings:

  - Made the column `userId` on table `App` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "App" DROP CONSTRAINT "App_userId_fkey";

-- AlterTable
ALTER TABLE "App" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "App" ADD CONSTRAINT "App_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
