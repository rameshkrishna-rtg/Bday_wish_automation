/*
  Warnings:

  - You are about to drop the column `html` on the `EmailLogs` table. All the data in the column will be lost.
  - Added the required column `body` to the `EmailLogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmailLogs" DROP COLUMN "html",
ADD COLUMN     "body" TEXT NOT NULL;
