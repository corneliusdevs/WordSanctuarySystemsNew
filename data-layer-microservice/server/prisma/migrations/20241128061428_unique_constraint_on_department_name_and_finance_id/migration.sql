/*
  Warnings:

  - A unique constraint covering the columns `[department_name]` on the table `Departments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[finance_id]` on the table `Departments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Departments_department_name_key" ON "Departments"("department_name");

-- CreateIndex
CREATE UNIQUE INDEX "Departments_finance_id_key" ON "Departments"("finance_id");
