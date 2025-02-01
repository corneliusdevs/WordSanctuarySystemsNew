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
exports.DepartmentalIdValidator = exports.UpdateDepartmentProfileSchema = exports.CreateDepartmetalProfileSchema = void 0;
const types_1 = require("../types");
const z = __importStar(require("zod"));
exports.CreateDepartmetalProfileSchema = z.object({
    department_name: z.string().min(3, {
        message: "department_name must be at least 3 characters",
    }),
    department_type: z.string().min(3, {
        message: "department_type must be at least 3 characters",
    }),
    description: z.string().min(3, {
        message: "description must be at least 3 characters",
    }),
    finance_id: z.string().min(7, {
        message: "invalid finance_id field",
    }),
    installation_id: z.string().min(7, {
        message: "invalid installation_id field",
    }),
    members: z
        .array(z.object({
        role: z.enum([
            types_1.DeptMemberRole.ASSISTANT_HEAD_OF_DEPARTMENT,
            types_1.DeptMemberRole.EXECUTIVE_ASSISTANT,
            types_1.DeptMemberRole.EVANGELISM_ASSISTANT,
            types_1.DeptMemberRole.FINANCE_ASSISTANT,
            types_1.DeptMemberRole.HEAD_OF_DEPARTMENT,
            types_1.DeptMemberRole.MEMBER,
            types_1.DeptMemberRole.PRAYER_ASSISTANT,
            types_1.DeptMemberRole.WORKER,
        ]),
        profile_id: z.string(),
        leaderShipLevel: z.enum([
            types_1.Heirarchy.PASTOR,
            types_1.Heirarchy.MINISTER,
            types_1.Heirarchy.HOD,
            types_1.Heirarchy.ASSISTANT_HOD,
            types_1.Heirarchy.EXECUTIVE_ASSISTANT,
            types_1.Heirarchy.WORKER,
            types_1.Heirarchy.MEMBER,
        ]),
    }))
        .min(1, {
        message: "departments must have at least 1 member",
    }),
    dues_paid_per_individual: z.object({
        pastors: z.number(),
        ministers: z.number(),
        hod: z.number(),
        asst_hod: z.number(),
        executive_assistant: z.number(),
        worker: z.number(),
        member: z.number(),
    }),
    centrals: z.array(z.string()),
});
exports.UpdateDepartmentProfileSchema = z.object({
    department_id: z.string(),
    department_name: z
        .string()
        .min(3, {
        message: "department_name must be at least 3 characters",
    })
        .optional(),
    department_type: z
        .string()
        .min(3, {
        message: "department_type must be at least 3 characters",
    })
        .optional(),
    description: z
        .string()
        .min(3, {
        message: "description must be at least 3 characters",
    })
        .optional(),
    finance_id: z
        .string()
        .min(7, {
        message: "invalid finance_id field",
    })
        .optional(),
    installation_id: z
        .string()
        .min(7, {
        message: "invalid installation_id field",
    })
        .optional(),
    members: z
        .array(z.object({
        role: z.enum([
            types_1.DeptMemberRole.ASSISTANT_HEAD_OF_DEPARTMENT,
            types_1.DeptMemberRole.EXECUTIVE_ASSISTANT,
            types_1.DeptMemberRole.EVANGELISM_ASSISTANT,
            types_1.DeptMemberRole.FINANCE_ASSISTANT,
            types_1.DeptMemberRole.HEAD_OF_DEPARTMENT,
            types_1.DeptMemberRole.MEMBER,
            types_1.DeptMemberRole.PRAYER_ASSISTANT,
            types_1.DeptMemberRole.WORKER,
        ]),
        profile_id: z.string(),
        leaderShipLevel: z.enum([
            types_1.Heirarchy.PASTOR,
            types_1.Heirarchy.MINISTER,
            types_1.Heirarchy.HOD,
            types_1.Heirarchy.ASSISTANT_HOD,
            types_1.Heirarchy.EXECUTIVE_ASSISTANT,
            types_1.Heirarchy.WORKER,
            types_1.Heirarchy.MEMBER,
        ]),
    }))
        .min(1, {
        message: "departments must have at least 1 member",
    })
        .optional(),
    dues_paid_per_individual: z
        .object({
        pastors: z.number(),
        ministers: z.number(),
        hod: z.number(),
        asst_hod: z.number(),
        executive_assistant: z.number(),
        worker: z.number(),
        member: z.number(),
    })
        .optional(),
    centrals: z.array(z.string()).optional(),
});
exports.DepartmentalIdValidator = z.object({
    department_id: z.string().min(7, {
        message: "invalid department_id",
    }),
});
