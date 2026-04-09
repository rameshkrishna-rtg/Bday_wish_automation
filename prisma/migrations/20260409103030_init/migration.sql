-- CreateEnum
CREATE TYPE "Status" AS ENUM ('SUCCESS', 'FAILED');

-- CreateTable
CREATE TABLE "EmailLogs" (
    "id" SERIAL NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "attachments" TEXT,
    "status" "Status" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailLogs_pkey" PRIMARY KEY ("id")
);
