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
exports.processAccessRequest = exports.getAllAccessRequests = exports.createAccessRequestController = void 0;
const accessRequestValidator_1 = require("../validators/accounts/accessRequestValidator");
const zod_1 = require("zod");
const accessRequests_1 = require("../../services/accounts/accessRequests");
const createAccessRequestController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = accessRequestValidator_1.AccessRequestFormSchemaValidator.parse(req.body);
        const savedAccessRequest = yield (0, accessRequests_1.saveAccessRequestService)(parsedBody);
        if (savedAccessRequest) {
            res.status(200).json({
                success: true,
                message: "Your request has been submitted and will be processed shortly",
            });
            return;
        }
        res.status(500).json({
            success: false,
            message: "Could not process access request",
        });
        return;
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            console.log(`createAccessRequestController encountered an error `, err);
            res.status(400).json({
                message: "Bad request",
                error: err.errors,
            });
            return;
        }
        console.log(`accessRequestController encountered an error `, err);
        res.status(500).json({
            message: "Could not process request. Please try again later",
        });
    }
});
exports.createAccessRequestController = createAccessRequestController;
const getAllAccessRequests = (Rreq, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const access_requests = yield (0, accessRequests_1.getAllAccessRequestsService)();
        res.status(200).json({
            success: true,
            data: access_requests,
        });
        return;
    }
    catch (err) {
        console.log(`getAccessRequests controller encountered an error `, err);
        res.status(500).json({
            success: false,
            data: null,
            message: "Could not get all access requests",
        });
        return;
    }
});
exports.getAllAccessRequests = getAllAccessRequests;
const processAccessRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (err) {
    }
});
exports.processAccessRequest = processAccessRequest;
