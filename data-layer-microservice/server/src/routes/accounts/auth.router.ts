import express from 'express'
import { createAccessRequestController, getAllAccessRequests } from '../../controllers/accounts/accessRequest.controller'
import { getLoginCredentailsController, loginRequestController } from '../../controllers/accounts/login.controller'


 const authRouter = express.Router()

 authRouter.post("/access/request", createAccessRequestController)

 authRouter.post("/request/login", loginRequestController)

 authRouter.post("/request/login/getCredentials", getLoginCredentailsController)
//  authRouter.post("/access/request/process", createAccessRequestController)
 authRouter.get("/access/requests/all", getAllAccessRequests)




export default authRouter 
