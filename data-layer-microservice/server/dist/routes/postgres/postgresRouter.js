"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter_1 = __importDefault(require("./userRouter"));
const profilesRouter_1 = __importDefault(require("./profilesRouter"));
const postgresRouter = express_1.default.Router();
postgresRouter.use("/users", userRouter_1.default);
postgresRouter.use("/profiles", profilesRouter_1.default);
exports.default = postgresRouter;
