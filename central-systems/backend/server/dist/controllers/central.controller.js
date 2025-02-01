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
exports.getAllCentralsProfilesControler = exports.getCentralProfileByIdControler = exports.deleteCentralProfileByIdController = exports.updateCentralProfileByIdController = exports.createCentralProfileController = void 0;
const createCentral_1 = require("../validators/createCentral");
const getDataLayerAPI_endpoint_1 = require("../helpers/getDataLayerAPI_endpoint");
const zod_1 = require("zod");
const createCentralProfileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = createCentral_1.CreateCentralProfileSchema.parse(req.body);
        const data_Layer_Base_Api_Endpoint = (0, getDataLayerAPI_endpoint_1.get_Data_Layer_POSTGRESS_Api_Endpoint)();
        console.log("endpoint ", data_Layer_Base_Api_Endpoint);
        const createProfileResponse = yield fetch(`${data_Layer_Base_Api_Endpoint}/profiles/centrals/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Object.assign({}, parsedBody)),
        });
        const response = yield createProfileResponse.json();
        console.log("createCentralProfileController response", response.message);
        if (createProfileResponse.ok) {
            res.status(201).json({
                success: true,
                message: "Central created",
            });
            return;
        }
        res.status(400).json({
            success: false,
            message: (response === null || response === void 0 ? void 0 : response.message) ? response.message : "Could not create central. Please try again later.",
        });
    }
    catch (err) {
        console.log(`createCentralProfileController  encountered an err`, err);
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
exports.createCentralProfileController = createCentralProfileController;
// UPDATE CENTRAL
const updateCentralProfileByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = createCentral_1.UpdateCentralProfileSchema.parse(req.body);
        const data_Layer_Base_Api_Endpoint = (0, getDataLayerAPI_endpoint_1.get_Data_Layer_POSTGRESS_Api_Endpoint)();
        console.log("endpoint ", data_Layer_Base_Api_Endpoint);
        const updateProfileResponse = yield fetch(`${data_Layer_Base_Api_Endpoint}/profiles/centrals/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Object.assign({}, parsedBody)),
        });
        const response = yield updateProfileResponse.json();
        console.log("updateCentralProfileController response", response.message);
        if (updateProfileResponse.ok) {
            res.status(201).json({
                success: true,
                message: "Central updated",
            });
            return;
        }
        res.status(400).json({
            success: false,
            message: (response === null || response === void 0 ? void 0 : response.message) ? response.message : "Could not update central. Please try again later.",
        });
    }
    catch (err) {
        console.log(`updateCentralProfileController  encountered an err`, err);
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
exports.updateCentralProfileByIdController = updateCentralProfileByIdController;
//DELETE CENTRAL
const deleteCentralProfileByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { central_id } = createCentral_1.CentralProfileByIdSchema.parse(req.params);
        const data_Layer_Base_Api_Endpoint = (0, getDataLayerAPI_endpoint_1.get_Data_Layer_POSTGRESS_Api_Endpoint)();
        console.log("endpoint ", data_Layer_Base_Api_Endpoint);
        const deleteProfileResponse = yield fetch(`${data_Layer_Base_Api_Endpoint}/profiles/centrals/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ central_id }),
        });
        const response = yield deleteProfileResponse.json();
        console.log("deleteCentralProfileController response", response.message);
        if (deleteProfileResponse.ok) {
            res.status(201).json({
                success: true,
                message: "Central deleted",
            });
            return;
        }
        res.status(400).json({
            success: false,
            message: (response === null || response === void 0 ? void 0 : response.message) ? response.message : "Could not delete central. Please try again later.",
        });
    }
    catch (err) {
        console.log(`deleteCentralProfileController  encountered an err`, err);
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
exports.deleteCentralProfileByIdController = deleteCentralProfileByIdController;
//GET CENTRAL BY ID
const getCentralProfileByIdControler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { central_id } = createCentral_1.CentralProfileByIdSchema.parse(req.params);
        const data_Layer_Base_Api_Endpoint = (0, getDataLayerAPI_endpoint_1.get_Data_Layer_POSTGRESS_Api_Endpoint)();
        console.log("endpoint ", data_Layer_Base_Api_Endpoint);
        const getProfileResponse = yield fetch(`${data_Layer_Base_Api_Endpoint}/profiles/centrals/fetch/:centralId`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ central_id }),
        });
        const response = yield getProfileResponse.json();
        console.log("getCentralProfileController response", response.message);
        if (getProfileResponse.ok) {
            res.status(201).json({
                success: true,
                message: "Central Retrieved",
            });
            return;
        }
        res.status(400).json({
            success: false,
            message: (response === null || response === void 0 ? void 0 : response.message) ? response.message : "Could not get all central. Please try again later.",
        });
    }
    catch (err) {
        console.log(`getCentralProfileController  encountered an err`, err);
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
exports.getCentralProfileByIdControler = getCentralProfileByIdControler;
//GET ALL CENTRALS
const getAllCentralsProfilesControler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data_Layer_Base_Api_Endpoint = (0, getDataLayerAPI_endpoint_1.get_Data_Layer_POSTGRESS_Api_Endpoint)();
        console.log("endpoint ", data_Layer_Base_Api_Endpoint);
        const getAllProfileResponse = yield fetch(`${data_Layer_Base_Api_Endpoint}/profiles/centrals/all`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const response = yield getAllProfileResponse.json();
        console.log("getAllCentralProfileController response", response.message);
        if (getAllProfileResponse.ok) {
            res.status(201).json({
                success: true,
                message: "All Central Retrieved",
            });
            return;
        }
        res.status(400).json({
            success: false,
            message: (response === null || response === void 0 ? void 0 : response.message) ? response.message : "Could not get all central. Please try again later.",
        });
    }
    catch (err) {
        console.log(`getAllCentralProfileController  encountered an err`, err);
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
exports.getAllCentralsProfilesControler = getAllCentralsProfilesControler;
