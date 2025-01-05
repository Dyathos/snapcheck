/*
  Warnings:

  - You are about to drop the column `telephone` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `telephone`,
    ADD COLUMN `phone` VARCHAR(191) NULL;
