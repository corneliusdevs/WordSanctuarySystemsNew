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
exports.DeletePermissionFromDbValidator = exports.AddPermissionToUserAccountProfile = exports.CreatePermissionInDbValidator = exports.PermissionType = void 0;
const z = __importStar(require("zod"));
var PermissionType;
(function (PermissionType) {
    PermissionType["CREATE"] = "CREATE";
    PermissionType["READ"] = "READ";
    PermissionType["UPDATE"] = "UPDATE";
    PermissionType["DELETE"] = "DELETE";
})(PermissionType || (exports.PermissionType = PermissionType = {}));
exports.CreatePermissionInDbValidator = z.object({
    resource_name: z.string().min(3, {
        message: "resource_name must at least 3 characters long"
    }),
    permission_type: z.enum([PermissionType.CREATE, PermissionType.DELETE, PermissionType.READ, PermissionType.UPDATE])
});
exports.AddPermissionToUserAccountProfile = z.object({
    resource_name: z.string().min(3, {
        message: "resource_name must at least 3 characters long"
    }),
    profile_id: z.string().min(7, {
        message: "profile_id must at least 7 characters long"
    }), // Is used to find the userAccount associated this profile_id
    permission_type: z.enum([PermissionType.CREATE, PermissionType.DELETE, PermissionType.READ, PermissionType.UPDATE])
});
exports.DeletePermissionFromDbValidator = z.object({
    resource_id: z.string().min(7, {
        message: "Invalid resource Id"
    })
});
