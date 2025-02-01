"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const individuals_router_1 = __importDefault(require("./individuals.router"));
const departments_router_1 = __importDefault(require("./departments.router"));
const installations_router_1 = __importDefault(require("./installations.router"));
const centrals_router_1 = __importDefault(require("./centrals.router"));
const profilesRouter = express_1.default.Router();
profilesRouter.use("/individuals", individuals_router_1.default);
profilesRouter.use("/departments", departments_router_1.default);
profilesRouter.use("/installations", installations_router_1.default);
profilesRouter.use("/centrals", centrals_router_1.default);
exports.default = profilesRouter;
