"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const kpi_controller_1 = require("../controllers/kpi.controller");
const kpiRouter = express_1.default.Router();
kpiRouter.post("/calculate", kpi_controller_1.calculateDepartmentKpi);
kpiRouter.get("/kpi/id/:departmentId");
exports.default = kpiRouter;
