import express from "express";
import { 
    createDepartmentClassController, 
    deleteDepartmentClassController, 
    getAllDepartmentClasses, 
    getDepartmentClassByIdController, 
    updateDepartmentClassController } from "../controllers/departmentClass.controller";


const departmentClassRouter = express.Router();

departmentClassRouter.get("/fetch/:departmentClassID", getDepartmentClassByIdController);

departmentClassRouter.get("/all", getAllDepartmentClasses);

departmentClassRouter.post("/create", createDepartmentClassController);
departmentClassRouter.post("/update", updateDepartmentClassController);
departmentClassRouter.post("/delete", deleteDepartmentClassController);

export default departmentClassRouter;
