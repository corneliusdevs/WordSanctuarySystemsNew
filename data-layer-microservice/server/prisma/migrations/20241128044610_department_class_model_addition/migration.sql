-- CreateTable
CREATE TABLE "DepartmentClass" (
    "department_class_id" TEXT NOT NULL,
    "department_Class_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DepartmentClass_pkey" PRIMARY KEY ("department_class_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DepartmentClass_department_Class_name_key" ON "DepartmentClass"("department_Class_name");
