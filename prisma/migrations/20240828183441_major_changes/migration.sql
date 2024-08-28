/*
  Warnings:

  - You are about to drop the column `comapanyLongUrl` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `jobs` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_userId_fkey";

-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "comapanyLongUrl",
DROP COLUMN "userId",
ADD COLUMN     "companyLogoUrl" TEXT,
ADD COLUMN     "postedById" TEXT;

-- CreateTable
CREATE TABLE "_AppliedJobs" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AppliedJobs_AB_unique" ON "_AppliedJobs"("A", "B");

-- CreateIndex
CREATE INDEX "_AppliedJobs_B_index" ON "_AppliedJobs"("B");

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_postedById_fkey" FOREIGN KEY ("postedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AppliedJobs" ADD CONSTRAINT "_AppliedJobs_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AppliedJobs" ADD CONSTRAINT "_AppliedJobs_B_fkey" FOREIGN KEY ("B") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
