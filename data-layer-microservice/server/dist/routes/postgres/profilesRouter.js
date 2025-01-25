"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const individual_router_1 = __importDefault(require("./profiles/individual.router"));
const department_router_1 = __importDefault(require("./profiles/department.router"));
const installation_router_1 = __importDefault(require("./profiles/installation.router"));
const central_router_1 = __importDefault(require("./profiles/central.router"));
const profilesRouter = express_1.default.Router();
profilesRouter.use("/individuals", individual_router_1.default);
profilesRouter.use("/departments", department_router_1.default);
profilesRouter.use("/installations", installation_router_1.default);
profilesRouter.use("/centrals", central_router_1.default);
exports.default = profilesRouter;
