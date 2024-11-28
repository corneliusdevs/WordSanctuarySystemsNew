import express from "express"
import { createUserInPostgres, getUsersFromPostgres } from "../../controllers/postgres/userController";

const userRouter = express.Router()

// PostgreSQL routes
userRouter.get('/', getUsersFromPostgres); // Get users from PostgreSQL
userRouter.post('/', createUserInPostgres); // Create a user in PostgreSQL

export default userRouter
