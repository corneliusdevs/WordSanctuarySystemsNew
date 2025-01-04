import express from 'express'
import { createIndividualProfile, getAllIndividualsProfile } from '../controllers/individuals.controller'



 const individualsRouter = express.Router()

 individualsRouter.post("/create", createIndividualProfile)

 individualsRouter.get("/fetch/all", getAllIndividualsProfile)



export default individualsRouter 
