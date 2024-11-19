import express, {Request, Response} from "express"
import userRouter from "./userRouter"

const postgresRouter = express.Router()

postgresRouter.use("/users", userRouter)


export default postgresRouter