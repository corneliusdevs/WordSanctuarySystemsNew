import express from 'express';
import { createUserInMongo, getUsersFromMongo } from '../controllers/mongodb/userController';
import { createUserInPostgres, getUsersFromPostgres } from '../controllers/postgres/userController';

const router = express.Router();

// MongoDB routes
router.get('/mongo', getUsersFromMongo); // Get users from MongoDB
router.post('/mongo', createUserInMongo); // Create a user in MongoDB

// PostgreSQL routes
router.get('/postgres', getUsersFromPostgres); // Get users from PostgreSQL
router.post('/postgres', createUserInPostgres); // Create a user in PostgreSQL

export default router;
