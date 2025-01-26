"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addResourceAndPermissionToUserAccountController = exports.deleteResorceWithPermissionFromDbById = exports.getAllResourcesWithPermissionsFromDbController = exports.addResourceWithPermissionToDbController = void 0;
const zod_1 = require("zod");
const permissionsValidators_1 = require("../validators/permissions/permissionsValidators");
const prismaClients_1 = require("../../db_connections/prismaClients");
const accountsValidators_1 = require("../validators/accounts/accountsValidators");
const addResourceWithPermissionToDbController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = permissionsValidators_1.CreatePermissionInDbValidator.parse(req.body);
        // check if the resource with permission is registered in the system
        const existingPermission = yield prismaClients_1.mongoDbClient.resources.findFirst({
            where: {
                resource_name: parsedBody.resource_name,
                permission: parsedBody.permission_type,
            },
        });
        if (existingPermission) {
            res.status(409).json({
                success: false,
                message: "Permission exists!",
            });
            return;
        }
        const response = yield prismaClients_1.mongoDbClient.resources.create({
            data: {
                resource_name: parsedBody.resource_name,
                permission: parsedBody.permission_type,
            },
        });
        if (response) {
            res.status(201).json({
                success: true,
                message: "Permission created",
            });
            return;
        }
        res.status(500).json({
            success: false,
            message: "Oops something went wrong!",
        });
        return;
    }
    catch (err) {
        console.log(`addResourceWithPermissionToDbController  encountered an error `, err);
        if (err instanceof zod_1.ZodError) {
            res.status(400).json({
                success: false,
                error: err.errors,
                message: "Bad request",
            });
            return;
        }
        res.status(500).json({
            success: false,
            message: "Oops something went wrong",
        });
        return;
    }
});
exports.addResourceWithPermissionToDbController = addResourceWithPermissionToDbController;
const getAllResourcesWithPermissionsFromDbController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const permissions = yield prismaClients_1.mongoDbClient.resources.findMany();
        res.status(200).json({
            success: true,
            data: permissions,
        });
        return;
    }
    catch (err) {
        console.log(`getAllResourcesWithPermissionsFromDbController  encountered an error `, err);
        res.status(500).json({
            success: false,
            message: "Oops something went wrong!",
            data: null,
        });
        return;
    }
});
exports.getAllResourcesWithPermissionsFromDbController = getAllResourcesWithPermissionsFromDbController;
const deleteResorceWithPermissionFromDbById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = permissionsValidators_1.DeletePermissionFromDbValidator.parse(req.body);
        // check if the record to be deleted is in the database, else, refuse the delete request
        const isInDb = yield prismaClients_1.mongoDbClient.resources.findFirst({
            where: {
                resource_id: parsedBody.resource_id,
            },
        });
        if (!isInDb) {
            res.status(404).json({
                message: `Permission does not exist`,
            });
        }
        else {
            const result = yield prismaClients_1.mongoDbClient.resources.delete({
                where: {
                    resource_id: parsedBody.resource_id,
                },
            });
            if (result.resource_id === parsedBody.resource_id) {
                res.status(200).json({
                    success: true,
                    message: "Operation succesfull",
                });
                return;
            }
        }
        res.status(500).json({
            success: false,
            message: "Operation failed. Please Try again later",
            errorMessage: "Internal server error",
        });
    }
    catch (err) {
        console.log(`deleteResorceWithPermissionFromDbById controller encountered an error `, err);
        if (err instanceof zod_1.ZodError) {
            res.status(400).json({
                success: false,
                message: "Invalid resource_id field",
                errorMessage: err.errors,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: "Operation failed. Try again later",
                errorMessage: "Internal server error",
            });
        }
    }
});
exports.deleteResorceWithPermissionFromDbById = deleteResorceWithPermissionFromDbById;
const addResourceAndPermissionToUserAccountController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = permissionsValidators_1.AddPermissionToUserAccountProfile.parse(req.body);
        //    check if the resource and permission is registered in the system
        const permissionToGrantUser = yield prismaClients_1.mongoDbClient.resources.findFirst({
            where: {
                resource_name: parsedBody.resource_name,
                permission: parsedBody.permission_type,
            },
        });
        if (!permissionToGrantUser) {
            res.status(404).json({
                success: false,
                message: "No resource with such permission exists!",
            });
            return;
        }
        // get the userAccountProfile associated with the profile_id provided in request
        const existingUserAccountProfile = yield prismaClients_1.mongoDbClient.userAccountsProfile.findUnique({
            where: {
                profile_id: parsedBody.profile_id,
            },
        });
        if (!existingUserAccountProfile) {
            res.status(404).json({
                success: false,
                message: "No account Profile associate with this profile_id!",
            });
            return;
        }
        // parse the returned user Account profile to make sure the returned data is of the desired shape
        const parsedUserAccountProfile = accountsValidators_1.UserAccountProfileSchemaType.parse(existingUserAccountProfile); // this may throw a zod error if the existingUserAccountProfile is not of the expected shape
        const response = yield prismaClients_1.mongoDbClient.userAccountsProfile.update({
            where: {
                profile_id: parsedBody.profile_id,
            },
            data: {
                permissions: [
                    ...parsedUserAccountProfile.permissions,
                    {
                        resource_name: permissionToGrantUser.resource_name,
                        resource_id: permissionToGrantUser.resource_id,
                        permission: permissionToGrantUser.permission,
                    },
                ], // add a new permission to the existing permissions
            },
        });
        if (response) {
            res.status(201).json({
                success: true,
                message: "Permission Added to user account profile",
            });
            return;
        }
        res.status(500).json({
            success: false,
            message: "Oops something went wrong!",
        });
        return;
    }
    catch (err) {
        console.log(`addResourceAndPermissionToUserAccountController  encountered an error `, err);
        if (err instanceof zod_1.ZodError) {
            res.status(400).json({
                success: false,
                error: err.errors,
                message: "Bad request",
            });
            return;
        }
        res.status(500).json({
            success: false,
            message: "Oops something went wrong",
        });
        return;
    }
});
exports.addResourceAndPermissionToUserAccountController = addResourceAndPermissionToUserAccountController;
