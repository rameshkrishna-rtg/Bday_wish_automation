/*
  Warnings:

  - You are about to drop the column `body` on the `EmailLogs` table. All the data in the column will be lost.
  - Added the required column `html` to the `EmailLogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmailLogs" DROP COLUMN "body",
ADD COLUMN     "html" TEXT NOT NULL;
