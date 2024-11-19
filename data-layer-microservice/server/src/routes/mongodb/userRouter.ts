import express from "express"
import { createUserInMongo, getUsersFromMongo } from "../../controllers/mongodb/userController";

const userRouter = express.Router()

// mongodb routes
userRouter.get('/', getUsersFromMongo); // Get users from mongodb
userRouter.post('/', createUserInMongo); // Create a user in mongodb

export default userRouter
