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
exports.getInviteTokenController = exports.createInviteRequest = void 0;
const mailer_1 = require("../mailing/mailer");
const invitationRequestValidator_1 = require("../../controllers/validators/accounts/invitationRequestValidator");
const saveInvitationRequestService_1 = require("./saveInvitationRequestService");
const prismaClients_1 = require("../../db_connections/prismaClients");
const zod_1 = require("zod");
const saveTokenService_1 = require("../mailing/saveTokenService");
const createInviteRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = invitationRequestValidator_1.InvitationRequestValidator.parse(req.body);
        const response = yield (0, mailer_1.sendEmailWithCodeAndLink)(parsedBody.email, saveTokenService_1.TokenTypes.INVITATION);
        // save the invitation request
        const saveInvitationRequest = yield (0, saveInvitationRequestService_1.saveInvitationRequestSevice)(parsedBody.email, parsedBody.description);
        if (response) {
            res.status(200).json({
                success: true,
                message: "Invitation sent"
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
        console.log(`createInviteRequest controller encountered an error `, err);
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
exports.createInviteRequest = createInviteRequest;
const getInviteTokenController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = invitationRequestValidator_1.getInvitationTokenValidator.parse(req.body);
        const getInvitationToken = yield prismaClients_1.mongoDbClient.authTokens.findFirst({
            where: {
                email: parsedBody.email_of_invited,
                otp: parsedBody.otp,
                token: parsedBody.token
            }
        });
        if (getInvitationToken) {
            res.status(200).json({
                succes: true,
                data: getInvitationToken
            });
            return;
        }
        res.status(401).json({
            success: false,
            data: null
        });
        return;
    }
    catch (err) {
        console.log(`getInviteToken controller encountered an error `, err);
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
exports.getInviteTokenController = getInviteTokenController;
