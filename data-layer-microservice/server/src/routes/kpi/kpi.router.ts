import express from 'express'
import departmentsKpiRouter from './departments.router'
import individualProfilesRouter from './individualsProfiles.router'

 const kpiRouter = express.Router()

 kpiRouter.use("/departments", departmentsKpiRouter)

 kpiRouter.use("/individuals", individualProfilesRouter)


export default kpiRouter 
