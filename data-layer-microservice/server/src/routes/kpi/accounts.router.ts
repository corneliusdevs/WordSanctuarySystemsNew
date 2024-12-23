import express from 'express'
import authRouter from '../accounts/auth.router'
import { createInviteRequest } from '../../services/accounts/inviteRequests'

 const accountsRouter = express.Router()

 accountsRouter.use("/auth", authRouter)
 accountsRouter.post("/invites/create", createInviteRequest)



export default accountsRouter 
