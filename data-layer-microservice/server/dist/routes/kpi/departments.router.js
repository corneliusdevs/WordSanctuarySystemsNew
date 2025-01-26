"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const department_controller_1 = require("../../controllers/kpi/department.controller.");
const departmentsKpiRouter = express_1.default.Router();
departmentsKpiRouter.post("/snapshots/create", department_controller_1.createDepartmentSnapshot);
departmentsKpiRouter.post("/snapshots/clear", department_controller_1.clearDepartmentSnapshot);
departmentsKpiRouter.get("/snapshots", department_controller_1.getAllDepartmentsSnapShots);
departmentsKpiRouter.get("/snapshots/id/:department_id", department_controller_1.getDepartmentSnapshotById);
departmentsKpiRouter.get("/kpi/id/:department_id", department_controller_1.getDepartmentKpiResultById);
departmentsKpiRouter.post("/results/save", department_controller_1.saveDepartmentKpiResult);
exports.default = departmentsKpiRouter;
