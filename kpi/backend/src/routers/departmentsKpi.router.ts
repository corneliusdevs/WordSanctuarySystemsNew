import express from "express"
import { calculateDepartmentKpi, getDepartmentKpiById } from "../controllers/department.controller"


const departmentsKpiRouter = express.Router()

departmentsKpiRouter.get("/kpi/id/:departmentId", getDepartmentKpiById)

departmentsKpiRouter.post("/calculate", calculateDepartmentKpi)



export default departmentsKpiRouter