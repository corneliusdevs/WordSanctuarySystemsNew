import express from 'express'
import { createAccessRequestController, getAllAccessRequests } from '../../controllers/accounts/accessRequest.controller'


 const authRouter = express.Router()

 authRouter.post("/access/request", createAccessRequestController)
 authRouter.post("/access/request/process", createAccessRequestController)
 authRouter.get("/access/requests/all", getAllAccessRequests)




export default authRouter 
