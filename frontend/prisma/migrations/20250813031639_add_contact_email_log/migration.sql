-- AlterTable
ALTER TABLE `ContactMessage` ADD COLUMN `emailSentCount` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `lastEmailSentAt` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `ContactEmailLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `messageId` INTEGER NOT NULL,
    `to` VARCHAR(191) NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `bodyPreview` VARCHAR(191) NULL,
    `success` BOOLEAN NOT NULL,
    `error` VARCHAR(191) NULL,
    `providerMessageId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `ContactEmailLog_messageId_createdAt_idx`(`messageId`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ContactEmailLog` ADD CONSTRAINT `ContactEmailLog_messageId_fkey` FOREIGN KEY (`messageId`) REFERENCES `ContactMessage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
