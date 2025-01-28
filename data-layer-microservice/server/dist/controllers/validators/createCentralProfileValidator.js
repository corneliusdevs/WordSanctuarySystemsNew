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
exports.CentralIdValidator = exports.UpdateCentralProfileSchema = exports.CreateCentralProfileSchema = void 0;
const z = __importStar(require("zod"));
exports.CreateCentralProfileSchema = z.object({
    central_name: z.string().min(3, {
        message: "central_name must be at least 3 characters",
    }),
    finance_id: z.string().min(7, {
        message: "invalid finance_id field",
    }),
    description: z.string().min(3, {
        message: "description must be at least 3 characters",
    }),
    departments: z
        .array(z.object({
        department_id: z.string(),
        department_type: z.string(),
    }))
});
exports.UpdateCentralProfileSchema = z.object({
    central_id: z.string(),
    central_name: z
        .string()
        .min(3, {
        message: "central_name must be at least 3 characters",
    })
        .optional(),
    finance_id: z
        .string()
        .min(7, {
        message: "invalid finance_id field",
    })
        .optional(),
    description: z
        .string()
        .min(3, {
        message: "description must be at least 3 characters",
    })
        .optional(),
    departments: z
        .array(z.object({
        department_id: z.string(),
        department_type: z.string(),
    }))
        .optional(),
});
exports.CentralIdValidator = z.object({
    central_id: z.string().min(7, {
        message: "invalid central_id",
    }),
});
