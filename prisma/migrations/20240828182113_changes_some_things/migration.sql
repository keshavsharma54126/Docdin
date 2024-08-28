/*
  Warnings:

  - You are about to drop the column `college` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `fellowship` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `residency` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "college",
DROP COLUMN "fellowship",
DROP COLUMN "residency",
ADD COLUMN     "organization" BOOLEAN;

-- AlterTable
ALTER TABLE "jobs" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
