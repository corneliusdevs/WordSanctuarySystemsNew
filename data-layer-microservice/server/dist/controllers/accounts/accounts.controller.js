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
exports.addAccountToUserAccountProfileController = void 0;
const prismaClients_1 = require("../../db_connections/prismaClients");
const accountsValidators_1 = require("../validators/accounts/accountsValidators");
const zod_1 = require("zod");
const addAccountToUserAccountProfileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = accountsValidators_1.AddAccountToUserAccountProfileValidator.parse(req.body);
        //    check if the account is registered in the system
        const existingAccountProfile = yield prismaClients_1.mongoDbClient.userAccountsProfile.findUnique({
            where: {
                profile_id: parsedBody.profile_id,
            },
        });
        if (existingAccountProfile) {
            const parsedExistingAccountProfile = accountsValidators_1.UserAccountProfileSchemaType.parse(existingAccountProfile);
            const previousAccountsList = parsedExistingAccountProfile.accounts;
            const updatedAccountsList = previousAccountsList.includes(parsedBody.account_to_add_to_profile)
                ? previousAccountsList
                : [...previousAccountsList, parsedBody.account_to_add_to_profile];
            //   add the specified account to the user account profile
            const profileWithAccountAdded = yield prismaClients_1.mongoDbClient.userAccountsProfile.update({
                where: {
                    profile_id: parsedBody.profile_id,
                },
                data: {
                    accounts: updatedAccountsList,
                },
            });
            if (profileWithAccountAdded) {
                // send a response
                res.status(201).json({
                    success: true,
                    message: "Account added",
                });
                return;
            }
            res.status(500).json({
                success: false,
                message: "Operation failed",
            });
            return;
        }
        else {
            const updatedAccountProfile = yield prismaClients_1.mongoDbClient.userAccountsProfile.create({
                data: {
                    profile_id: parsedBody.profile_id,
                    accounts: [parsedBody.account_to_add_to_profile],
                    permissions: [],
                },
            });
            if (updatedAccountProfile) {
                // send a response
                res.status(201).json({
                    success: true,
                    message: "Account added",
                });
                return;
            }
        }
        res.status(500).json({
            success: false,
            message: "Oops something went wrong!",
        });
        return;
    }
    catch (err) {
        console.log(`addAccountToUserAccountProfileController  encountered an error `, err);
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
exports.addAccountToUserAccountProfileController = addAccountToUserAccountProfileController;
