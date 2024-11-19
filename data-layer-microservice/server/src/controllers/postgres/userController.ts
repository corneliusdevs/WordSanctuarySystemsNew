import { Request, Response } from 'express';
import { postgresClient } from '../../db_connections/prismaClients';


// Get users from PostgreSQL
export const getUsersFromPostgres = async (req: Request, res: Response) => {
  try {
    const users = await postgresClient.userPostgres.findMany(); // Query PostgreSQL
    res.status(200).json(users);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error fetching PostgreSQL users' });
  }
};

// Create a user in PostgreSQL
export const createUserInPostgres = async (req: Request, res: Response) => {
  try {
    console.log(req, req.body)
    // const { name, email } = req.body;
    const user = await postgresClient.userPostgres.create({
      // data: { name, email },
      data: {
        name: "John Doe",
        email: "johndoe@example.com"
    }
    });
    res.status(201).json(user);
  } catch (error) {
    console.log(error)

    res.status(500).json({ error: 'Error creating PostgreSQL user' });
  }
};
