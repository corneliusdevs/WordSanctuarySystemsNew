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
exports.GivingNumberValidatorObj = exports.profileIdListValidator = exports.profileIdValidator = exports.EmailValidatorObj = exports.UpdateIndividualProfileSchema = exports.CreateIndividualProfileSchema = void 0;
const general_1 = require("../../types/general");
const z = __importStar(require("zod"));
// to validate the birthday field
const birthdayRegex = /^(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[0-2])$/;
exports.CreateIndividualProfileSchema = z.object({
    name: z.string().min(3, {
        message: "name must be at least 3 characters"
    }),
    surname: z.string().min(3, {
        message: "surname must be at least 3 characters"
    }),
    email: z.string().email(),
    installation_id: z.string().min(4, {
        message: "invalid installation_id field"
    }),
    giving_number: z.string().min(3, {
        message: "giving_number must be at least 3 characters"
    }),
    leadership_level: z.enum([general_1.Heirarchy.ASSISTANT_HOD, general_1.Heirarchy.EXECUTIVE_ASSISTANT, general_1.Heirarchy.HOD, general_1.Heirarchy.MEMBER, general_1.Heirarchy.MINISTER, general_1.Heirarchy.PASTOR, general_1.Heirarchy.WORKER]),
    lifeclass_topic: z.number(),
    lifeclass_teacher_profile_id: z.string().min(4, {
        message: "invalid lifeclass_teacher_profile_id field"
    }),
    mentor_profile_id: z.string().min(4, {
        message: "invalid mentor_profile_id field"
    }),
    signature: z.string(),
    departments: z.array(z.string()).min(1, {
        message: "departments field must have at least 1 element"
    }),
    passport: z.string(),
    phone_contact: z.string(),
    birthday: z.string().refine((val) => birthdayRegex.test(val)), // uses a regex to validate the birthday field
    centrals: z.array(z.string())
});
exports.UpdateIndividualProfileSchema = z.object({
    profile_id: z.string(),
    name: z.string().min(3, {
        message: "name must be at least 3 characters"
    }).optional(),
    surname: z.string().min(3, {
        message: "name must be at least 3 characters"
    }).optional(),
    email: z.string().email().optional(),
    installation_id: z.string().min(7, {
        message: "invalid installation_id field"
    }).optional(),
    giving_number: z.string().min(3, {
        message: "giving_number must be at least 3 characters"
    }).optional(),
    leadership_level: z.enum([general_1.Heirarchy.ASSISTANT_HOD, general_1.Heirarchy.EXECUTIVE_ASSISTANT, general_1.Heirarchy.HOD, general_1.Heirarchy.MEMBER, general_1.Heirarchy.MINISTER, general_1.Heirarchy.PASTOR, general_1.Heirarchy.WORKER]).optional(),
    lifeclass_topic: z.number().optional(),
    lifeclass_teacher_profile_id: z.string().min(7, {
        message: "invalid lifeclass_teacher_profile_id field"
    }).optional(),
    mentor_profile_id: z.string().min(4, {
        message: "invalid mentor_profile_id field"
    }).optional(),
    signature: z.string().optional(),
    departments: z.array(z.string()).min(1, {
        message: "departments field must have at least 1 element"
    }).optional(),
    passport: z.string().optional(),
    phone_contact: z.string().optional(),
    birthday: z.string().refine((val) => birthdayRegex.test(val)).optional(), // uses a regex to validate the birthday field
    centrals: z.array(z.string()).optional()
});
exports.EmailValidatorObj = z.object({
    email: z.string().email()
});
exports.profileIdValidator = z.object({
    profile_id: z.string().min(7, {
        message: "invalid profile_id"
    })
});
exports.profileIdListValidator = z.object({
    profile_ids: z.array(z.string().min(7, {
        message: "invalid profile_id"
    }))
});
exports.GivingNumberValidatorObj = z.object({
    givingNumber: z.string().min(1, {
        message: "Must be minimum of 1 character"
    })
});
