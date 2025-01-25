"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../../controllers/mongodb/userController");
const userRouter = express_1.default.Router();
// mongodb routes
userRouter.get('/', userController_1.getUsersFromMongo); // Get users from mongodb
userRouter.post('/', userController_1.createUserInMongo); // Create a user in mongodb
exports.default = userRouter;
