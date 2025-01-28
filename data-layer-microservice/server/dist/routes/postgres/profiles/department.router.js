"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const departmentController_1 = require("../../../controllers/postgres/profiles/departmentController");
const departmentClass_router_1 = __importDefault(require("./departmentClass.router"));
const departmentsRouter = express_1.default.Router();
departmentsRouter.use("/class", departmentClass_router_1.default);
departmentsRouter.get("/fetch/:departmentId", departmentController_1.getDepartmentProfileById);
departmentsRouter.get("/all", departmentController_1.getAllDepartmentsProfiles);
departmentsRouter.post("/create", departmentController_1.createDepartmentProfile);
departmentsRouter.post("/update", departmentController_1.updateDepartmentProfileById);
departmentsRouter.post("/delete", departmentController_1.deleteDepartmentProfileById);
exports.default = departmentsRouter;
