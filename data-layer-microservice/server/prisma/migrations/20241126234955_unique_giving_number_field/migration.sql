/*
  Warnings:

  - The primary key for the `Profiles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `profileId` on the `Profiles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[giving_number]` on the table `Profiles` will be added. If there are existing duplicate values, this will fail.
  - The required column `profile_id` was added to the `Profiles` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Profiles" DROP CONSTRAINT "Profiles_pkey",
DROP COLUMN "profileId",
ADD COLUMN     "profile_id" TEXT NOT NULL,
ADD CONSTRAINT "Profiles_pkey" PRIMARY KEY ("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "Profiles_giving_number_key" ON "Profiles"("giving_number");
