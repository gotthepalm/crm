/*
  Warnings:

  - You are about to drop the column `currency` on the `Vacancy` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Candidate" ADD COLUMN     "age" TEXT,
ADD COLUMN     "skills" TEXT;

-- AlterTable
ALTER TABLE "Vacancy" DROP COLUMN "currency";
