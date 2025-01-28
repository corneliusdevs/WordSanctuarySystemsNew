"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../../controllers/postgres/userController");
const userRouter = express_1.default.Router();
// PostgreSQL routes
userRouter.get('/', userController_1.getUsersFromPostgres); // Get users from PostgreSQL
userRouter.post('/', userController_1.createUserInPostgres); // Create a user in PostgreSQL
exports.default = userRouter;
