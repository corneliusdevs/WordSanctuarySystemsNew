import express, { Request, Response} from "express"
import { mongoDbClient, postgresClient } from "./db_connections/prismaClients"
import mongoDbRouter from "./routes/mongodb/mongoDbRouter"
import postgresRouter from "./routes/postgres/postgresRouter"
import kpiRouter from "./routes/kpi/kpi.router"
import accountsRouter from "./routes/kpi/accounts.router"
import dotenv from "dotenv"

const app = express()
dotenv.config() // allow us to use env variables

const PORT = process.env.PORT || 5000
app.use(express.json()); // Middleware for parsing JSON bodies

app.get("/", (req: Request, res: Response)=>{
    res.send("hello, database microservice running")
})

// Define routes for the app
app.use('/api/database/mongodb', mongoDbRouter);
app.use('/api/database/postgres', postgresRouter);
app.use('/api/kpi', kpiRouter)
app.use('/api/accounts', accountsRouter)

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