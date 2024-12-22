import express from "express"
import departmentsKpiRouter from "./departmentsKpi.router"

const kpiRouter = express.Router()

kpiRouter.use("/departments", departmentsKpiRouter)


export default kpiRouter