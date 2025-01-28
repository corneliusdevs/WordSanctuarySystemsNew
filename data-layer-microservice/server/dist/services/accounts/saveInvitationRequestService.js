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
exports.saveInvitationRequestSevice = void 0;
const prismaClients_1 = require("../../db_connections/prismaClients");
const saveInvitationRequestSevice = (email, description) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const savedInvitationRequest = yield prismaClients_1.mongoDbClient.invitationRequets.create({
            data: {
                email,
                description
            }
        });
        return savedInvitationRequest;
    }
    catch (err) {
        console.log(`saveInvitationRequestSevice encountered an error `, err);
        return null;
    }
});
exports.saveInvitationRequestSevice = saveInvitationRequestSevice;
