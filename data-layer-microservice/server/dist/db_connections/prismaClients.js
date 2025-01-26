"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postgresClient = exports.mongoDbClient = void 0;
const mongo_1 = require("../../prisma/generated-clients/mongo");
const postgres_1 = require("../../prisma/generated-clients/postgres");
// create instances of prisma clients for each database
exports.mongoDbClient = new mongo_1.PrismaClient();
exports.postgresClient = new postgres_1.PrismaClient();
