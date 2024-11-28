import express from "express";

import { createDepartmentClass, deleteDepartmentClassById, getAllDepartmentClasses, getDepartmentClassById, updateDepartmentClassById } from "../../../controllers/postgres/departmentClassController";

const departmentClassRouter = express.Router();

departmentClassRouter.get("/fetch/:departmentClassID", getDepartmentClassById);

departmentClassRouter.get("/all", getAllDepartmentClasses);

departmentClassRouter.post("/create", createDepartmentClass);
departmentClassRouter.post("/update", updateDepartmentClassById);
departmentClassRouter.post("/delete", deleteDepartmentClassById);

export default departmentClassRouter;
