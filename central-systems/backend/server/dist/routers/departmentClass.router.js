"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const departmentClass_controller_1 = require("../controllers/departmentClass.controller");
const departmentClassRouter = express_1.default.Router();
departmentClassRouter.get("/fetch/:departmentClassID", departmentClass_controller_1.getDepartmentClassByIdController);
departmentClassRouter.get("/all", departmentClass_controller_1.getAllDepartmentClasses);
departmentClassRouter.post("/create", departmentClass_controller_1.createDepartmentClassController);
departmentClassRouter.post("/update", departmentClass_controller_1.updateDepartmentClassController);
departmentClassRouter.post("/delete", departmentClass_controller_1.deleteDepartmentClassController);
exports.default = departmentClassRouter;
