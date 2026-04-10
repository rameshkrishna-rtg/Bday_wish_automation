/*
  Warnings:

  - You are about to drop the column `dob` on the `Friends` table. All the data in the column will be lost.
  - Added the required column `birthMonth` to the `Friends` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthday` to the `Friends` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Friends" DROP COLUMN "dob",
ADD COLUMN     "birthMonth" INTEGER NOT NULL,
ADD COLUMN     "birthday" INTEGER NOT NULL;
