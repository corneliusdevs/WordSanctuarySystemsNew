import express, { Request, Response } from "express";

const app = express();

const PORT = process.env.PORT || 5005;

app.get("/", (req: Request, res: Response) => {
  res.send("hello, central-systems server running");
});

// Graceful shutdown - Disconnect Prisma Clients when the server shuts down
process.on("SIGINT", async () => {
  // console.log('Closing Prisma clients...');
  // await mongoDbClient.$disconnect();  // Disconnect MongoDB client
  // await postgresClient.$disconnect(); // Disconnect PostgreSQL client
  process;
});

app.listen(PORT, () => {
  console.log("central-systems server running on port ", PORT);
});
