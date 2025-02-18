import express from "express";
import {
  createDepartmentProfile,
  deleteDepartmentProfileById,
  getAllDepartmentsProfiles,
  getDepartmentAndDeptMembersProfiles,
  getDepartmentProfileById,
  updateDepartmentProfileById,
} from "../../../controllers/postgres/profiles/departmentController";
import departmentClassRouter from "./departmentClass.router";

const departmentsRouter = express.Router();
departmentsRouter.use("/class", departmentClassRouter);
departmentsRouter.get("/fetch/:departmentId", getDepartmentProfileById);
departmentsRouter.get("/all", getAllDepartmentsProfiles);
departmentsRouter.get(
  "/profile-and-members-details/:departmentId",
  getDepartmentAndDeptMembersProfiles
);
departmentsRouter.post("/create", createDepartmentProfile);
departmentsRouter.post("/update", updateDepartmentProfileById);
departmentsRouter.post("/delete", deleteDepartmentProfileById);

export default departmentsRouter;
