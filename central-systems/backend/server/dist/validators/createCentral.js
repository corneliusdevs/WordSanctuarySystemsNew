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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CentralIdValidator = exports.CentralProfileByIdSchema = exports.UpdateCentralProfileSchema = exports.CreateCentralProfileSchema = void 0;
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
exports.CentralProfileByIdSchema = z.object({
    central_id: z
        .string()
        .min(7, {
        message: "Invalid central_id",
    }),
});
exports.CentralIdValidator = z.object({
    central_id: z.string().min(7, {
        message: "invalid central_id",
    }),
});
