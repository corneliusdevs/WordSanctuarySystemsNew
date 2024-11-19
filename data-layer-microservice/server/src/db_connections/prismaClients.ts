import { PrismaClient as MongoDbPrismaClient } from "../../prisma/generated-clients/mongo"

import { PrismaClient as PostgresPrismaClient } from "../../prisma/generated-clients/postgres"

// create instances of prisma clients for each database
export const mongoDbClient = new MongoDbPrismaClient();
export const postgresClient = new PostgresPrismaClient();