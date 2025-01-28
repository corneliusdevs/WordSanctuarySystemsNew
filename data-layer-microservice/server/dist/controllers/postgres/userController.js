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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserInPostgres = exports.getUsersFromPostgres = void 0;
const prismaClients_1 = require("../../db_connections/prismaClients");
// Get users from PostgreSQL
const getUsersFromPostgres = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prismaClients_1.postgresClient.userPostgres.findMany(); // Query PostgreSQL
        res.status(200).json(users);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error fetching PostgreSQL users' });
    }
});
exports.getUsersFromPostgres = getUsersFromPostgres;
// Create a user in PostgreSQL
const createUserInPostgres = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { name, email } = req.body;
        const user = yield prismaClients_1.postgresClient.userPostgres.create({
            // data: { name, email },
            data: {
                name: "John Doe",
                email: "johndoe@example.com"
            }
        });
        res.status(201).json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error creating PostgreSQL user' });
    }
});
exports.createUserInPostgres = createUserInPostgres;
