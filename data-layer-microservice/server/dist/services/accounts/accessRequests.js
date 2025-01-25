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
exports.getAllAccessRequestsService = exports.saveAccessRequestService = void 0;
const prismaClients_1 = require("../../db_connections/prismaClients");
const saveAccessRequestService = (accessRequestDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const savedRequest = yield prismaClients_1.mongoDbClient.accessRequests.create({
            data: Object.assign(Object.assign({}, accessRequestDetails), { status: "PENDING", processed_by_profile_id: "UNKNOWN" }),
        });
        return savedRequest;
    }
    catch (err) {
        console.log("saveAccessRequestService encountered an error ", err);
        return null;
    }
});
exports.saveAccessRequestService = saveAccessRequestService;
const getAllAccessRequestsService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessRequests = yield prismaClients_1.mongoDbClient.accessRequests.findMany();
        return accessRequests;
    }
    catch (err) {
        console.log(`getAllAccessRequestsService encountered an error`, err);
    }
});
exports.getAllAccessRequestsService = getAllAccessRequestsService;
