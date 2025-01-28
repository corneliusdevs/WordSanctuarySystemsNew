"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prismaClients_1 = require("./db_connections/prismaClients");
const mongoDbRouter_1 = __importDefault(require("./routes/mongodb/mongoDbRouter"));
const postgresRouter_1 = __importDefault(require("./routes/postgres/postgresRouter"));
const kpi_router_1 = __importDefault(require("./routes/kpi/kpi.router"));
const accounts_router_1 = __importDefault(require("./routes/accounts/accounts.router"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
dotenv_1.default.config(); // allow us to use env variables
const PORT = process.env.PORT || 5000;
app.use(express_1.default.json()); // Middleware for parsing JSON bodies
app.get("/", (req, res) => {
    res.send("hello, database microservice running");
});
// Define routes for the app
app.use('/api/database/mongodb', mongoDbRouter_1.default);
app.use('/api/database/postgres', postgresRouter_1.default);
app.use('/api/kpi', kpi_router_1.default);
app.use('/api/accounts', accounts_router_1.default);
// Graceful shutdown - Disconnect Prisma Clients when the server shuts down
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Closing Prisma clients...');
    yield prismaClients_1.mongoDbClient.$disconnect(); // Disconnect MongoDB client
    yield prismaClients_1.postgresClient.$disconnect(); // Disconnect PostgreSQL client
    process.exit(0);
}));
app.listen(PORT, () => {
    console.log(`database microservice running on ${PORT}`);
});
