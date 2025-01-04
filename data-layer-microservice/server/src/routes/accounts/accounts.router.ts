import express from 'express'
import authRouter from './auth.router'
import { createInviteRequest, getInviteTokenController } from '../../services/accounts/inviteRequests'

 const accountsRouter = express.Router()

 accountsRouter.use("/auth", authRouter)
 accountsRouter.post("/invites/create", createInviteRequest)
 accountsRouter.post("/invites/getInvite", getInviteTokenController)



export default accountsRouter 
