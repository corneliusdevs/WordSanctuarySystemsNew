/*
  Warnings:

  - Changed the type of `departments` on the `Centrals` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Centrals" DROP COLUMN "departments",
ADD COLUMN     "departments" JSONB NOT NULL;
