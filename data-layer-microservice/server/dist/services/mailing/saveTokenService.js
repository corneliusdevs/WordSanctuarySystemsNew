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
exports.saveTokenService = exports.TokenTypes = void 0;
const prismaClients_1 = require("../../db_connections/prismaClients");
var TokenTypes;
(function (TokenTypes) {
    TokenTypes["INVITATION"] = "INVITATION";
    TokenTypes["LOGIN"] = "LOGIN";
})(TokenTypes || (exports.TokenTypes = TokenTypes = {}));
const saveTokenService = (recipientEmail, token, expiration, otpCode, tokenType) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const savedToken = yield prismaClients_1.mongoDbClient.authTokens.create({
            data: {
                email: recipientEmail,
                token,
                expiration,
                otp: otpCode,
                token_type: tokenType
            }
        });
        return savedToken;
    }
    catch (err) {
        console.log(`saveTokenService encountered an error `, err);
        return null;
    }
});
exports.saveTokenService = saveTokenService;
