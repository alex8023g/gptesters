/*
  Warnings:

  - Added the required column `addAsTester` to the `TestingAppsUsers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TestingAppsUsers" ADD COLUMN     "addAsTester" BOOLEAN NOT NULL;
