/*
  Warnings:

  - Added the required column `vehicleId` to the `maintenance_tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `maintenance_tasks` ADD COLUMN `assignedTo` VARCHAR(191) NULL,
    ADD COLUMN `endDate` DATETIME(3) NULL,
    ADD COLUMN `notes` VARCHAR(191) NULL,
    ADD COLUMN `priority` VARCHAR(191) NOT NULL DEFAULT 'medium',
    ADD COLUMN `startDate` DATETIME(3) NULL,
    ADD COLUMN `vehicleId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `maintenance_tasks` ADD CONSTRAINT `maintenance_tasks_vehicleId_fkey` FOREIGN KEY (`vehicleId`) REFERENCES `vehicles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
