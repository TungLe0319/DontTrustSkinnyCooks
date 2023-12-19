-- AlterTable
ALTER TABLE `Recipe` MODIFY `description` LONGTEXT NOT NULL,
    MODIFY `ingredients` LONGTEXT NOT NULL,
    MODIFY `directions` LONGTEXT NOT NULL;
