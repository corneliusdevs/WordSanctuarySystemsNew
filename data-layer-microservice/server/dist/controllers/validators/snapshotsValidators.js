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
exports.IndividualProfilesSnapshotValidator = void 0;
const z = __importStar(require("zod"));
const general_1 = require("../../types/general");
exports.IndividualProfilesSnapshotValidator = z.object({
    profile_id: z.string(),
    profileSnapShotId: z.string(),
    snapshots: z.array(z.object({
        profile_id: z.string(),
        name: z.string().min(3, {
            message: "name must be at least 3 characters",
        }),
        surname: z.string().min(3, {
            message: "surname must be at least 3 characters",
        }),
        email: z.string().email(),
        installation_id: z.string().min(4, {
            message: "invalid installation_id field",
        }),
        giving_number: z.string().min(3, {
            message: "giving_number must be at least 3 characters",
        }),
        leadership_level: z.enum([
            general_1.Heirarchy.ASSISTANT_HOD,
            general_1.Heirarchy.EXECUTIVE_ASSISTANT,
            general_1.Heirarchy.HOD,
            general_1.Heirarchy.MEMBER,
            general_1.Heirarchy.MINISTER,
            general_1.Heirarchy.PASTOR,
            general_1.Heirarchy.WORKER,
        ]),
        lifeclass_topic: z.number(),
        lifeclass_teacher_profile_id: z.string().min(4, {
            message: "invalid lifeclass_teacher_profile_id field",
        }),
        mentor_profile_id: z.string().min(4, {
            message: "invalid mentor_profile_id field",
        }),
        signature: z.string(),
        departments: z.array(z.string()).min(1, {
            message: "departments field must have at least 1 element",
        }),
        passport: z.string(),
        birthday: z.string(),
        centrals: z.array(z.string()),
        snapShotDate: z.number(),
        snapShotId: z.string(),
    })),
});
