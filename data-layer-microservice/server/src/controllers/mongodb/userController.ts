import { Request, Response } from 'express';
import { mongoDbClient } from '../../db_connections/prismaClients';

// Get users from MongoDB
export const getUsersFromMongo = async (req: Request, res: Response) => {
  try {
    const users = await mongoDbClient.userMongo.findMany(); // Query MongoDB
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching MongoDB users' });
  }
};


// Create a user in MongoDB
export const createUserInMongo = async (req: Request, res: Response) => {
  console.log(req, req.body)
  try {
    // const { name, email } = req.body;
    const user = await mongoDbClient.userMongo.create({
      // data: { name, email },
      data: {
        name: "John Doe",
        email: "johndoe@example.com"
    }
    });
    res.status(201).json(user);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error creating MongoDB user' });
  }
};


