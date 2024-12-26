import express from "express"
import individualsRouter from "./individuals.router"
import departmentsRouter from "./departments.router"
import installationsRouter from "./installations.router"


const profilesRouter = express.Router()

profilesRouter.use("/individuals", individualsRouter)

profilesRouter.use("/departments", departmentsRouter)

profilesRouter.use("/installations", installationsRouter)

// profilesRouter.use("/centrals", centralsRouter)


export default profilesRouter