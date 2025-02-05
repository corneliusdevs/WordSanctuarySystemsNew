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
exports.getAllInstallationsProfiles = exports.deleteInstallationsProfileById = exports.getInstallationsProfileById = exports.updateInstallationsProfile = exports.createInstallationsProfile = void 0;
const createInstallationValidators_1 = require("../validators/createInstallationValidators");
const getDataLayerAPI_endpoint_1 = require("../helpers/getDataLayerAPI_endpoint");
const zod_1 = require("zod");
const createInstallationsProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = createInstallationValidators_1.CreateInstallationProfileSchema.parse(req.body);
        const data_Layer_Base_Api_Endpoint = (0, getDataLayerAPI_endpoint_1.get_Data_Layer_POSTGRESS_Api_Endpoint)();
        console.log("endpoint ", data_Layer_Base_Api_Endpoint);
        const createProfileResponse = yield fetch(`${data_Layer_Base_Api_Endpoint}/profiles/installations/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Object.assign({}, parsedBody)),
        });
        const response = yield createProfileResponse.json();
        console.log("create installation controller response", response.message);
        if (createProfileResponse.ok) {
            res.status(201).json({
                success: true,
                message: "Installation created",
            });
            return;
        }
        res.status(400).json({
            success: false,
            message: (response === null || response === void 0 ? void 0 : response.message) ? response.message : "Could not send create Installation. Please try again later.",
        });
    }
    catch (err) {
        console.log(`createInstallation controller encountered an err`, err);
        if (err instanceof zod_1.ZodError) {
            res.status(400).json({
                success: false,
                message: "Bad request",
                error: err.errors,
            });
            return;
        }
        res.status(500).json({
            success: false,
            message: "Internal Server error. Please try again later.",
        });
        return;
    }
});
exports.createInstallationsProfile = createInstallationsProfile;
//Update Installations
const updateInstallationsProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = createInstallationValidators_1.UpdateInstallationProfileSchema.parse(req.body);
        const data_Layer_Base_Api_Endpoint = (0, getDataLayerAPI_endpoint_1.get_Data_Layer_POSTGRESS_Api_Endpoint)();
        console.log("endpoint ", data_Layer_Base_Api_Endpoint);
        const updateProfileResponse = yield fetch(`${data_Layer_Base_Api_Endpoint}/profiles/installations/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Object.assign({}, parsedBody)),
        });
        const response = yield updateProfileResponse.json();
        console.log("update installation controller response", response.message);
        if (updateProfileResponse.ok) {
            res.status(201).json({
                success: true,
                message: "Installation created",
            });
            return;
        }
        res.status(400).json({
            success: false,
            message: (response === null || response === void 0 ? void 0 : response.message) ? response.message : "Could not send update Installation. Please try again later.",
        });
    }
    catch (err) {
        console.log(`updateInstallation controller encountered an err`, err);
        if (err instanceof zod_1.ZodError) {
            res.status(400).json({
                success: false,
                message: "Bad request",
                error: err.errors,
            });
            return;
        }
        res.status(500).json({
            success: false,
            message: "Internal Server error. Please try again later.",
        });
        return;
    }
});
exports.updateInstallationsProfile = updateInstallationsProfile;
// Get Installations by Id
const getInstallationsProfileById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = createInstallationValidators_1.InstallationIdValidator.parse(req.body);
        const data_Layer_Base_Api_Endpoint = (0, getDataLayerAPI_endpoint_1.get_Data_Layer_POSTGRESS_Api_Endpoint)();
        console.log("endpoint ", data_Layer_Base_Api_Endpoint);
        const getInstallationsProfileByIdResponse = yield fetch(`${data_Layer_Base_Api_Endpoint}/profiles/installations/fetch/:installationId`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Object.assign({}, parsedBody)),
        });
        const response = yield getInstallationsProfileByIdResponse.json();
        console.log("get installation controller response", response.message);
        if (getInstallationsProfileByIdResponse.ok) {
            res.status(201).json({
                success: true,
                message: "Installation Retrieved",
            });
            return;
        }
        res.status(400).json({
            success: false,
            message: (response === null || response === void 0 ? void 0 : response.message) ? response.message : "Could not send get Installation. Please try again later.",
        });
    }
    catch (err) {
        console.log(`getInstallation controller encountered an err`, err);
        if (err instanceof zod_1.ZodError) {
            res.status(400).json({
                success: false,
                message: "Bad request",
                error: err.errors,
            });
            return;
        }
        res.status(500).json({
            success: false,
            message: "Internal Server error. Please try again later.",
        });
        return;
    }
});
exports.getInstallationsProfileById = getInstallationsProfileById;
//Delete Installation
const deleteInstallationsProfileById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = createInstallationValidators_1.InstallationIdValidator.parse(req.body);
        const data_Layer_Base_Api_Endpoint = (0, getDataLayerAPI_endpoint_1.get_Data_Layer_POSTGRESS_Api_Endpoint)();
        console.log("endpoint ", data_Layer_Base_Api_Endpoint);
        const deleteInstallationsProfileResponse = yield fetch(`${data_Layer_Base_Api_Endpoint}/profiles/installations/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Object.assign({}, parsedBody)),
        });
        const response = yield deleteInstallationsProfileResponse.json();
        console.log("delete installation controller response", response.message);
        if (deleteInstallationsProfileResponse.ok) {
            res.status(201).json({
                success: true,
                message: "Installation deleted",
            });
            return;
        }
        res.status(400).json({
            success: false,
            message: (response === null || response === void 0 ? void 0 : response.message) ? response.message : "Could not send delete Installation. Please try again later.",
        });
    }
    catch (err) {
        console.log(`deleteInstallation controller encountered an err`, err);
        if (err instanceof zod_1.ZodError) {
            res.status(400).json({
                success: false,
                message: "Bad request",
                error: err.errors,
            });
            return;
        }
        res.status(500).json({
            success: false,
            message: "Internal Server error. Please try again later.",
        });
        return;
    }
});
exports.deleteInstallationsProfileById = deleteInstallationsProfileById;
const getAllInstallationsProfiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data_Layer_Base_Api_Endpoint = (0, getDataLayerAPI_endpoint_1.get_Data_Layer_POSTGRESS_Api_Endpoint)();
        console.log("endpoint ", data_Layer_Base_Api_Endpoint);
        const fetchProfileResponse = yield fetch(`${data_Layer_Base_Api_Endpoint}/profiles/installations/all`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const response = yield fetchProfileResponse.json();
        if (fetchProfileResponse.ok) {
            res.status(201).json({
                success: true,
                data: response,
                message: "All installations data fetched"
            });
            return;
        }
        res.status(500).json({
            success: false,
            data: null,
            message: "Could not send fetch installations profiles. Please try again later.",
        });
    }
    catch (err) {
        console.log(`getAllInstallationsProfiles controller encountered an err`, err);
        if (err instanceof zod_1.ZodError) {
            res.status(400).json({
                success: false,
                message: "Bad request",
                error: err.errors,
                data: null
            });
            return;
        }
        res.status(500).json({
            success: false,
            message: "Internal Server error. Could not fetch installations profiles. Please try again later.",
            data: null
        });
        return;
    }
});
exports.getAllInstallationsProfiles = getAllInstallationsProfiles;
