-- AlterTable
ALTER TABLE "vehicles" ADD COLUMN "healthStatus" TEXT;
ALTER TABLE "vehicles" ADD COLUMN "lastInspection" DATETIME;

-- CreateTable
CREATE TABLE "check_in_part_histories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "check_in_part_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "severity" TEXT,
    "description" TEXT,
    "inspector" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "check_in_part_histories_check_in_part_id_fkey" FOREIGN KEY ("check_in_part_id") REFERENCES "check_in_parts" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_check_in_parts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL,
    "notes" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vehicle_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    CONSTRAINT "check_in_parts_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "check_in_parts_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "check_in_items" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_check_in_parts" ("created_at", "id", "item_id", "notes", "status", "updated_at", "vehicle_id") SELECT "created_at", "id", "item_id", "notes", "status", "updated_at", "vehicle_id" FROM "check_in_parts";
DROP TABLE "check_in_parts";
ALTER TABLE "new_check_in_parts" RENAME TO "check_in_parts";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- RedefineIndex
DROP INDEX "sqlite_autoindex_default_parts_2";
CREATE UNIQUE INDEX "default_parts_name_key" ON "default_parts"("name");
