import express from 'express'
import { invitationRequestController, submitAccessRequestController, verifyInvitationRequestController } from '../controllers/auth.controller'



 const authRouter = express.Router()

 authRouter.post("/access/request/submit", submitAccessRequestController)

 authRouter.post("/access/request/process", )

 authRouter.post("/invitations/request/submit", invitationRequestController)

 authRouter.post("/invitations/request/verify", verifyInvitationRequestController)

//  authRouter.get("/access/requests/all", getAllAccessRequests)




export default authRouter 
