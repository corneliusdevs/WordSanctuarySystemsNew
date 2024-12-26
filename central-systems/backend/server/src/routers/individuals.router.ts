import express from 'express'
import { createIndividualProfile } from '../controllers/individuals.controller'



 const individualsRouter = express.Router()

 individualsRouter.post("/create", createIndividualProfile)


export default individualsRouter 
