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
exports.AccessRequestFormSchemaValidator = void 0;
const z = __importStar(require("zod"));
const mongo_1 = require("../../../../prisma/generated-clients/mongo");
exports.AccessRequestFormSchemaValidator = z.object({
    name: z.string(),
    surname: z.string(),
    leadership_level: z.enum([
        mongo_1.LeaderShipLevel.ASSISTANT_HOD,
        mongo_1.LeaderShipLevel.EXECUTIVE_ASSISTANT,
        mongo_1.LeaderShipLevel.HOD,
        mongo_1.LeaderShipLevel.MINISTER,
        mongo_1.LeaderShipLevel.PASTOR,
        mongo_1.LeaderShipLevel.WORKER,
        mongo_1.LeaderShipLevel.MEMBER,
    ]),
    email: z.string().email(),
    profile_id: z.string(),
    phone_contact: z.string(),
    access_details: z.string(), // what kind of access is needed?
    reasons_for_access: z.string(), // a description on the purpose the access is needed for
});
