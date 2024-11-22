import express, { Request, Response} from "express"


const app = express()
const PORT = process.env.PORT || 5003

app.get("/", (req: Request, res: Response)=>{
    res.send("hello, kpi-backend microservice running")
})



// Graceful shutdown - Disconnect Prisma Clients when the server shuts down
process.on('SIGINT', async () => {
    // console.log('Closing Prisma clients...');
    // await mongoDbClient.$disconnect();  // Disconnect MongoDB client
    // await postgresClient.$disconnect(); // Disconnect PostgreSQL client
    process.exit(0);
  });

app.listen(PORT, ()=>{
    console.log(`kpi-backend microservice running on ${PORT}`)
})