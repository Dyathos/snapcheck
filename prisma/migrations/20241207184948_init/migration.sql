/*
  Warnings:

  - You are about to drop the column `vehicle_id` on the `inspections` table. All the data in the column will be lost.
  - You are about to drop the column `photo_url` on the `parts` table. All the data in the column will be lost.
  - You are about to drop the column `health_status` on the `vehicles` table. All the data in the column will be lost.
  - You are about to drop the column `last_inspection` on the `vehicles` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `vehicles` table. All the data in the column will be lost.
  - Added the required column `mileage` to the `vehicles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model` to the `vehicles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plate_number` to the `vehicles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "inspection_vehicles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "inspection_id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "notes" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "inspection_vehicles_inspection_id_fkey" FOREIGN KEY ("inspection_id") REFERENCES "inspections" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "inspection_vehicles_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "inspection_parts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "inspection_vehicle_id" TEXT NOT NULL,
    "part_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'good',
    "notes" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "inspection_parts_inspection_vehicle_id_fkey" FOREIGN KEY ("inspection_vehicle_id") REFERENCES "inspection_vehicles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "inspection_parts_part_id_fkey" FOREIGN KEY ("part_id") REFERENCES "parts" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "check_in_items" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "category" TEXT NOT NULL,
    "isRequired" BOOLEAN NOT NULL DEFAULT false,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "check_in_parts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "vehicle_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "notes" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "check_in_parts_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "check_in_parts_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "check_in_items" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_inspections" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "inspector" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'in_progress',
    "notes" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_inspections" ("created_at", "date", "id", "inspector", "notes", "status") SELECT "created_at", "date", "id", "inspector", "notes", "status" FROM "inspections";
DROP TABLE "inspections";
ALTER TABLE "new_inspections" RENAME TO "inspections";
CREATE TABLE "new_parts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "vehicle_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'good',
    "severity" TEXT NOT NULL DEFAULT 'low',
    "description" TEXT,
    "category" TEXT,
    "icon" TEXT,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "parts_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_parts" ("created_at", "description", "id", "name", "severity", "status", "updated_at", "vehicle_id") SELECT "created_at", "description", "id", "name", "severity", "status", "updated_at", "vehicle_id" FROM "parts";
DROP TABLE "parts";
ALTER TABLE "new_parts" RENAME TO "parts";
CREATE TABLE "new_vehicles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "mileage" INTEGER NOT NULL,
    "plate_number" TEXT NOT NULL,
    "vin" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_vehicles" ("brand", "created_at", "id") SELECT "brand", "created_at", "id" FROM "vehicles";
DROP TABLE "vehicles";
ALTER TABLE "new_vehicles" RENAME TO "vehicles";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
