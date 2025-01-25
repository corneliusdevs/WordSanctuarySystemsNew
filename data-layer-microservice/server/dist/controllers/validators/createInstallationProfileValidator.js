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
exports.extractProfileIds = exports.InstallationIdValidator = exports.UpdateInstallationProfileSchema = exports.CreateInstallationProfileSchema = void 0;
const general_1 = require("../../types/general");
const z = __importStar(require("zod"));
exports.CreateInstallationProfileSchema = z.object({
    name: z.string().min(3, {
        message: "name must be at least 3 characters",
    }),
    finance_id: z.string().min(4, {
        message: "invalid finance_id field",
    }),
    members: z
        .array(z.object({
        role: z.enum([
            general_1.InstallationMemberRoles.HEAD_OF_INSTALLATION,
            general_1.InstallationMemberRoles.HEAD_WORKER,
            general_1.InstallationMemberRoles.LEADER,
            general_1.InstallationMemberRoles.MEMBER,
            general_1.InstallationMemberRoles.MINISTER_IN_CHARGE,
            general_1.InstallationMemberRoles.WORKER,
        ]),
        profile_id: z.string().min(7, {
            message: "Invalid member profile_id",
        }),
    }))
        .min(1, {
        message: "Installations must have at least 1 member",
    }),
});
exports.UpdateInstallationProfileSchema = z.object({
    installation_id: z.string(),
    name: z.string().min(3, {
        message: "name must be at least 3 characters",
    }).optional(),
    finance_id: z.string().min(7, {
        message: "invalid finance_id field",
    }).optional(),
    members: z
        .array(z.object({
        role: z.enum([
            general_1.InstallationMemberRoles.HEAD_OF_INSTALLATION,
            general_1.InstallationMemberRoles.HEAD_WORKER,
            general_1.InstallationMemberRoles.LEADER,
            general_1.InstallationMemberRoles.MEMBER,
            general_1.InstallationMemberRoles.MINISTER_IN_CHARGE,
            general_1.InstallationMemberRoles.WORKER,
        ]),
        profile_id: z.string().min(7, {
            message: "Invalid member profile_id",
        }),
    }))
        .min(1, {
        message: "Installations must have at least 1 member",
    }).optional(),
});
exports.InstallationIdValidator = z.object({
    installation_id: z.string().min(7, {
        message: "invalid installation_id",
    }),
});
const extractProfileIds = (members) => {
    const profileIds = [];
    members.forEach((member) => {
        profileIds.push(member.profile_id);
    });
    return profileIds;
};
exports.extractProfileIds = extractProfileIds;
