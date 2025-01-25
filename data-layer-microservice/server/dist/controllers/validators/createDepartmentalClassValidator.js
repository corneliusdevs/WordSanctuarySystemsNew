"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentClassIdValidator = exports.UpdateDepartmentClassSchema = exports.CreateDepartmentClassSchema = void 0;
const z = __importStar(require("zod"));
exports.CreateDepartmentClassSchema = z.object({
    department_class_name: z.string().min(3, {
        message: "department_Class_name must be at least 3 characters",
    }),
    description: z.string().min(3, {
        message: "description must be at least 3 characters",
    }),
});
exports.UpdateDepartmentClassSchema = z.object({
    department_class_id: z.string(),
    department_Class_name: z
        .string()
        .min(3, {
        message: "department_Class_name must be at least 3 characters",
    })
        .optional(),
    description: z
        .string()
        .min(3, {
        message: "description must be at least 3 characters",
    })
        .optional(),
});
exports.DepartmentClassIdValidator = z.object({
    department_class_id: z.string().min(7, {
        message: "invalid department_class_id",
    }),
});
