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
exports.DepartmentSnapshotValidator = exports.DepartmentMemberArrayValidator = exports.DepartmentalIdValidator = exports.UpdateDepartmentProfileSchema = exports.CreateDepartmetalProfileSchema = void 0;
const general_1 = require("../../types/general");
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
            general_1.DeptMemberRole.ASSISTANT_HEAD_OF_DEPARTMENT,
            general_1.DeptMemberRole.EXECUTIVE_ASSISTANT,
            general_1.DeptMemberRole.EVANGELISM_ASSISTANT,
            general_1.DeptMemberRole.FINANCE_ASSISTANT,
            general_1.DeptMemberRole.HEAD_OF_DEPARTMENT,
            general_1.DeptMemberRole.MEMBER,
            general_1.DeptMemberRole.PRAYER_ASSISTANT,
            general_1.DeptMemberRole.WORKER,
        ]),
        profile_id: z.string(),
        leaderShipLevel: z.enum([
            general_1.Heirarchy.PASTOR,
            general_1.Heirarchy.MINISTER,
            general_1.Heirarchy.HOD,
            general_1.Heirarchy.ASSISTANT_HOD,
            general_1.Heirarchy.EXECUTIVE_ASSISTANT,
            general_1.Heirarchy.WORKER,
            general_1.Heirarchy.MEMBER,
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
            general_1.DeptMemberRole.ASSISTANT_HEAD_OF_DEPARTMENT,
            general_1.DeptMemberRole.EXECUTIVE_ASSISTANT,
            general_1.DeptMemberRole.EVANGELISM_ASSISTANT,
            general_1.DeptMemberRole.FINANCE_ASSISTANT,
            general_1.DeptMemberRole.HEAD_OF_DEPARTMENT,
            general_1.DeptMemberRole.MEMBER,
            general_1.DeptMemberRole.PRAYER_ASSISTANT,
            general_1.DeptMemberRole.WORKER,
        ]),
        profile_id: z.string(),
        leaderShipLevel: z.enum([
            general_1.Heirarchy.PASTOR,
            general_1.Heirarchy.MINISTER,
            general_1.Heirarchy.HOD,
            general_1.Heirarchy.ASSISTANT_HOD,
            general_1.Heirarchy.EXECUTIVE_ASSISTANT,
            general_1.Heirarchy.WORKER,
            general_1.Heirarchy.MEMBER,
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
exports.DepartmentMemberArrayValidator = z.array(z.object({
    role: z
        .enum([
        general_1.DeptMemberRole.ASSISTANT_HEAD_OF_DEPARTMENT,
        general_1.DeptMemberRole.EXECUTIVE_ASSISTANT,
        general_1.DeptMemberRole.EVANGELISM_ASSISTANT,
        general_1.DeptMemberRole.FINANCE_ASSISTANT,
        general_1.DeptMemberRole.HEAD_OF_DEPARTMENT,
        general_1.DeptMemberRole.MEMBER,
        general_1.DeptMemberRole.PRAYER_ASSISTANT,
        general_1.DeptMemberRole.WORKER,
    ])
        .optional(),
    profile_id: z.string().min(7, {
        message: "Invalid department member profile_Id",
    }),
    leaderShipLevel: z
        .enum([
        general_1.Heirarchy.PASTOR,
        general_1.Heirarchy.MINISTER,
        general_1.Heirarchy.HOD,
        general_1.Heirarchy.ASSISTANT_HOD,
        general_1.Heirarchy.EXECUTIVE_ASSISTANT,
        general_1.Heirarchy.WORKER,
        general_1.Heirarchy.MEMBER,
    ])
        .optional(),
}));
exports.DepartmentSnapshotValidator = z.object({
    department_id: z.string(),
    deptSnapShotId: z.string(),
    snapshots: z.array(z.object({
        department_id: z.string(),
        department_name: z.string(),
        department_type: z.string(),
        description: z.string(),
        finance_id: z.string(),
        installation_id: z.string(),
        members: z.array(z.object({
            role: z.enum([
                general_1.DeptMemberRole.ASSISTANT_HEAD_OF_DEPARTMENT,
                general_1.DeptMemberRole.EXECUTIVE_ASSISTANT,
                general_1.DeptMemberRole.EVANGELISM_ASSISTANT,
                general_1.DeptMemberRole.FINANCE_ASSISTANT,
                general_1.DeptMemberRole.HEAD_OF_DEPARTMENT,
                general_1.DeptMemberRole.MEMBER,
                general_1.DeptMemberRole.PRAYER_ASSISTANT,
                general_1.DeptMemberRole.WORKER,
            ]),
            profile_id: z.string(),
            leaderShipLevel: z.enum([
                general_1.Heirarchy.PASTOR,
                general_1.Heirarchy.MINISTER,
                general_1.Heirarchy.HOD,
                general_1.Heirarchy.ASSISTANT_HOD,
                general_1.Heirarchy.EXECUTIVE_ASSISTANT,
                general_1.Heirarchy.WORKER,
                general_1.Heirarchy.MEMBER,
            ]),
        })),
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
        createdAt: z.string(),
        modifiedAt: z.string(),
        snapShotDate: z.number(),
        snapShotId: z.string(),
    })),
});
