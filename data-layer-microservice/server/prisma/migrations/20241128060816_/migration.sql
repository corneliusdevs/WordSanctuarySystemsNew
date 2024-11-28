/*
  Warnings:

  - You are about to drop the column `central_id` on the `Departments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Departments" DROP COLUMN "central_id",
ADD COLUMN     "centrals" TEXT[];
