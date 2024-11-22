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
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5003;
app.get("/", (req, res) => {
    res.send("hello, kpi-backend microservice running");
});
// Graceful shutdown - Disconnect Prisma Clients when the server shuts down
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    // console.log('Closing Prisma clients...');
    // await mongoDbClient.$disconnect();  // Disconnect MongoDB client
    // await postgresClient.$disconnect(); // Disconnect PostgreSQL client
    process.exit(0);
}));
app.listen(PORT, () => {
    console.log(`kpi-backend microservice running on ${PORT}`);
});
