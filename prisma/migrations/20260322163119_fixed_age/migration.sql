/*
  Warnings:

  - The `age` column on the `Candidate` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "age",
ADD COLUMN     "age" INTEGER;
