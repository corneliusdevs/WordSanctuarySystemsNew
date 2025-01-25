import express, { Request, Response} from "express"
import kpiRouter from "./routers/kpi.router"
import dotenv from "dotenv"


const app = express()
dotenv.config() // allows us to use the env variables
app.use(express.json()); // Middleware for parsing JSON bodies
const PORT = process.env.PORT || 5003
 
app.get("/", (req: Request, res: Response)=>{
    res.send("hello, kpi-backend microservice running")
})

app.use("/api/kpi", kpiRouter)





// Graceful shutdown - Disconnect Prisma Clients when the server shuts down
process.on('SIGINT', async () => {
    console.log('Shutting down microservice...');
    process.exit(0);
  });

app.listen(PORT, ()=>{
    console.log(`kpi-backend microservice running on ${PORT}`)
})