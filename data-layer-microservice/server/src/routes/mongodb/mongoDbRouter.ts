import express, {Request, Response} from "express"
import userRouter from "./userRouter"

const mongoDbRouter = express.Router()

mongoDbRouter.use("/users", userRouter)


export default mongoDbRouter