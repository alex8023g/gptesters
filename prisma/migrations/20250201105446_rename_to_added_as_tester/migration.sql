/*
  Warnings:

  - You are about to drop the column `addAsTester` on the `TestingAppsUsers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TestingAppsUsers" DROP COLUMN "addAsTester",
ADD COLUMN     "addedAsTester" BOOLEAN NOT NULL DEFAULT false;
