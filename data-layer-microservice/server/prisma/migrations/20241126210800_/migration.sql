-- CreateEnum
CREATE TYPE "LeaderShipLevel" AS ENUM ('PASTOR', 'MINISTER', 'HOD', 'ASSISTANT_HOD', 'EXECUTIVE_ASSISTANT', 'WORKER', 'MEMBER');

-- CreateTable
CREATE TABLE "UserPostgres" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "UserPostgres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profiles" (
    "profileId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "giving_number" TEXT NOT NULL,
    "leadership_level" "LeaderShipLevel" NOT NULL,
    "lifeclass_topic" INTEGER NOT NULL,
    "lifeclass_teacher_profile_id" TEXT NOT NULL,
    "mentor_profile_id" TEXT NOT NULL,
    "signature" TEXT NOT NULL,
    "passport" TEXT NOT NULL,
    "birthday" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL,
    "installation_id" TEXT NOT NULL,
    "departments" TEXT[],
    "centrals" TEXT[],

    CONSTRAINT "Profiles_pkey" PRIMARY KEY ("profileId")
);

-- CreateTable
CREATE TABLE "Installations" (
    "installation_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "members" JSONB NOT NULL,
    "finance_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Installations_pkey" PRIMARY KEY ("installation_id")
);

-- CreateTable
CREATE TABLE "Departments" (
    "department_id" TEXT NOT NULL,
    "department_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "finance_id" TEXT NOT NULL,
    "members" JSONB NOT NULL,
    "dues_paid_per_individual" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL,
    "installation_id" TEXT NOT NULL,
    "central_id" TEXT NOT NULL,

    CONSTRAINT "Departments_pkey" PRIMARY KEY ("department_id")
);

-- CreateTable
CREATE TABLE "Centrals" (
    "central_id" TEXT NOT NULL,
    "central_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Centrals_pkey" PRIMARY KEY ("central_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPostgres_email_key" ON "UserPostgres"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profiles_email_key" ON "Profiles"("email");
