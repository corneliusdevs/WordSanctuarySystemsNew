import express from 'express'
import authRouter from '../accounts/auth.router'

 const accountsRouter = express.Router()

 accountsRouter.use("/auth", authRouter)



export default accountsRouter 
