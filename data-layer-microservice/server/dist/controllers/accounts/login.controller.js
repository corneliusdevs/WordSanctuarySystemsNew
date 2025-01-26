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
exports.getLoginCredentailsController = exports.loginRequestController = void 0;
const createIndividualProfileValidator_1 = require("../validators/createIndividualProfileValidator");
const mailer_1 = require("../../services/mailing/mailer");
const saveTokenService_1 = require("../../services/mailing/saveTokenService");
const zod_1 = require("zod");
const prismaClients_1 = require("../../db_connections/prismaClients");
const invitationRequestValidator_1 = require("../validators/accounts/invitationRequestValidator");
const loginRequestController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = createIndividualProfileValidator_1.EmailValidatorObj.parse(req.body);
        const response = yield (0, mailer_1.sendLoginCredentialsToEmailService)(parsedBody.email, saveTokenService_1.TokenTypes.LOGIN);
        if (response) {
            res.status(200).json({
                success: true,
                message: "Login credentials sent"
            });
            return;
        }
        res.status(500).json({
            success: false,
            message: "Oops something went wrong"
        });
        return;
    }
    catch (err) {
        console.log(`loginRequestController  encountered an error `, err);
        if (err instanceof zod_1.ZodError) {
            res.status(400).json({
                success: false,
                error: err.errors,
                message: "Bad request"
            });
            return;
        }
        res.status(500).json({
            success: false,
            message: "Oops something went wrong"
        });
        return;
    }
});
exports.loginRequestController = loginRequestController;
const getLoginCredentailsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = invitationRequestValidator_1.getLoginCredentailsValidator.parse(req.body);
        const loginCredentials = yield prismaClients_1.mongoDbClient.authTokens.findFirst({
            where: {
                email: parsedBody.email,
                otp: parsedBody.otp,
            }
        });
        //   get profile_id of the user
        const profile = yield prismaClients_1.postgresClient.profiles.findUnique({
            where: {
                email: parsedBody.email
            }
        });
        if (loginCredentials) {
            res.status(200).json({
                success: true,
                data: Object.assign(Object.assign({}, loginCredentials), { profile_details: profile }),
            });
            return;
        }
        res.status(401).json({
            success: false,
            data: null,
        });
        return;
    }
    catch (err) {
        console.log(`getLoginCredentailsController  encountered an error `, err);
        if (err instanceof zod_1.ZodError) {
            res.status(400).json({
                success: false,
                error: err.errors,
                message: "Bad request"
            });
            return;
        }
        res.status(500).json({
            success: false,
            message: "Oops something went wrong",
            data: null
        });
        return;
    }
});
exports.getLoginCredentailsController = getLoginCredentailsController;
