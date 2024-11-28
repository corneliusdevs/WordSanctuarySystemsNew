import express, {Request, Response} from "express"
import userRouter from "./userRouter"
import profilesRouter from "./profilesRouter"

const postgresRouter = express.Router()

postgresRouter.use("/users", userRouter)

postgresRouter.use("/profiles", profilesRouter)


export default postgresRouter