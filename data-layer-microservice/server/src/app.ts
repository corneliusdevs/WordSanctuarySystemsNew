import express, { Request, Response} from "express"
import { mongoDbClient, postgresClient } from "./db_connections/prismaClients"
import userRoutes from "./routes/userRoutes"

const app = express()
const PORT = process.env.PORT || 5000

app.get("/", (req: Request, res: Response)=>{
    res.send("hello, database microservice running")
})

// Define routes for the app
app.use('/users', userRoutes);

// Graceful shutdown - Disconnect Prisma Clients when the server shuts down
process.on('SIGINT', async () => {
    console.log('Closing Prisma clients...');
    await mongoDbClient.$disconnect();  // Disconnect MongoDB client
    await postgresClient.$disconnect(); // Disconnect PostgreSQL client
    process.exit(0);
  });

app.listen(PORT, ()=>{
    console.log(`database microservice running on ${PORT}`)
})