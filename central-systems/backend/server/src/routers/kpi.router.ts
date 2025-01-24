import express from "express"
import { calculateDepartmentKpi } from "../controllers/kpi.controller"

const kpiRouter = express.Router()

kpiRouter.post("/calculate", calculateDepartmentKpi)

kpiRouter.get("/kpi/id/:departmentId")

export default kpiRouter

