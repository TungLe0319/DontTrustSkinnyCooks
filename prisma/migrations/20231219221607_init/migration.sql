/*
  Warnings:

  - You are about to drop the column `yield` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Recipe` DROP COLUMN `yield`,
    ADD COLUMN `public` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `yieldAmount` VARCHAR(191) NULL,
    MODIFY `description` MEDIUMTEXT NOT NULL;
