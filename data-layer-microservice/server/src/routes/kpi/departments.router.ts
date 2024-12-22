import express from "express"
import { clearDepartmentSnapshot, createDepartmentSnapshot, getAllDepartmentsSnapShots, getDepartmentKpiResultById, getDepartmentSnapshotById, saveDepartmentKpiResult } from "../../controllers/kpi/department.controller."


const departmentsKpiRouter = express.Router()

departmentsKpiRouter.post("/snapshots/create", createDepartmentSnapshot)
departmentsKpiRouter.post("/snapshots/clear", clearDepartmentSnapshot)
departmentsKpiRouter.get("/snapshots", getAllDepartmentsSnapShots)
departmentsKpiRouter.get("/snapshots/id/:department_id", getDepartmentSnapshotById)

departmentsKpiRouter.get("/kpi/id/:department_id", getDepartmentKpiResultById)

departmentsKpiRouter.post("/results/save", saveDepartmentKpiResult)


export default departmentsKpiRouter