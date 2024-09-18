/*
  Warnings:

  - Added the required column `fieldOfStudy` to the `Education` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Education" ADD COLUMN     "fieldOfStudy" TEXT NOT NULL;
