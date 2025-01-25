"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const departmentClassController_1 = require("../../../controllers/postgres/departmentClassController");
const departmentClassRouter = express_1.default.Router();
departmentClassRouter.get("/fetch/:departmentClassID", departmentClassController_1.getDepartmentClassById);
departmentClassRouter.get("/all", departmentClassController_1.getAllDepartmentClasses);
departmentClassRouter.post("/create", departmentClassController_1.createDepartmentClass);
departmentClassRouter.post("/update", departmentClassController_1.updateDepartmentClassById);
departmentClassRouter.post("/delete", departmentClassController_1.deleteDepartmentClassById);
exports.default = departmentClassRouter;
