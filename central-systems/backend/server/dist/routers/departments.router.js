"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const departmentClass_router_1 = __importDefault(require("./departmentClass.router"));
const department_controller_1 = require("../controllers/department.controller");
const departmentsRouter = express_1.default.Router();
departmentsRouter.use("/class", departmentClass_router_1.default);
departmentsRouter.get("/fetch/:departmentId", department_controller_1.getDepartmentProfileById);
departmentsRouter.get("/all", department_controller_1.getAllDepartmentsProfiles);
departmentsRouter.post("/create", department_controller_1.createDepartmentController);
departmentsRouter.post("/update", department_controller_1.deleteDepartmentProfileById);
departmentsRouter.post("/delete", department_controller_1.deleteDepartmentProfileById);
exports.default = departmentsRouter;
