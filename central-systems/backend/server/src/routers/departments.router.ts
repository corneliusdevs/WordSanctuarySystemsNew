import express from "express";
import departmentClassRouter from "./departmentClass.router";
import { createDepartmentController, 
    deleteDepartmentProfileById, 
    getAllDepartmentsProfiles, 
    getDepartmentProfileById
 } from "../controllers/department.controller";

const departmentsRouter = express.Router();
departmentsRouter.use("/class", departmentClassRouter);


departmentsRouter.get("/fetch/:departmentId", getDepartmentProfileById);
departmentsRouter.get("/all", getAllDepartmentsProfiles);
departmentsRouter.post("/create", createDepartmentController);
departmentsRouter.post("/update", deleteDepartmentProfileById);
departmentsRouter.post("/delete", deleteDepartmentProfileById);

export default departmentsRouter;
