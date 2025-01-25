import express from 'express'
import authRouter from './auth.router'
import { createInviteRequest, getInviteTokenController } from '../../services/accounts/inviteRequests'
import { addAccountToUserAccountProfileController } from '../../controllers/accounts/accounts.controller'

const accountsRouter = express.Router()

accountsRouter.use("/auth", authRouter)
accountsRouter.post("/invites/create", createInviteRequest)
accountsRouter.post("/invites/getInvite", getInviteTokenController)
accountsRouter.post("/add", addAccountToUserAccountProfileController)




export default accountsRouter 
