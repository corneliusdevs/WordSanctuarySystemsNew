import express from 'express'
import { accessRequestController } from '../../controllers/accounts/accessRequest.controller'


 const authRouter = express.Router()

 authRouter.post("/access/request", accessRequestController)



export default authRouter 
