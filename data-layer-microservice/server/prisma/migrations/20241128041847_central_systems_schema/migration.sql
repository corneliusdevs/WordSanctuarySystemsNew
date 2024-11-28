/*
  Warnings:

  - Added the required column `finance_id` to the `Centrals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modifiedAt` to the `Centrals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department_type` to the `Departments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Centrals" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "departments" TEXT[],
ADD COLUMN     "finance_id" TEXT NOT NULL,
ADD COLUMN     "modifiedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Departments" ADD COLUMN     "department_type" TEXT NOT NULL;
