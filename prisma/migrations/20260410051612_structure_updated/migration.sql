/*
  Warnings:

  - You are about to drop the column `to` on the `EmailLogs` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `EmailLogs` table. All the data in the column will be lost.
  - Added the required column `friend_id` to the `EmailLogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmailLogs" DROP COLUMN "to",
DROP COLUMN "updatedAt",
ADD COLUMN     "friend_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Friends" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Friends_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Friends_email_key" ON "Friends"("email");

-- AddForeignKey
ALTER TABLE "EmailLogs" ADD CONSTRAINT "EmailLogs_friend_id_fkey" FOREIGN KEY ("friend_id") REFERENCES "Friends"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
