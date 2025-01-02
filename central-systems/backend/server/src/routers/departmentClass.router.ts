import express from "express";
import { createDepartmentClassController, getAllDepartmentClasses } from "../controllers/departmentClass.controller";


const departmentClassRouter = express.Router();

// departmentClassRouter.get("/fetch/:departmentClassID", getDepartmentClassById);

departmentClassRouter.get("/all", getAllDepartmentClasses);

departmentClassRouter.post("/create", createDepartmentClassController);
// departmentClassRouter.post("/update", updateDepartmentClassById);
// departmentClassRouter.post("/delete", deleteDepartmentClassById);

export default departmentClassRouter;
