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
exports.deleteDepartmentProfileById = exports.getAllDepartmentsProfiles = exports.getDepartmentProfileById = exports.updateDepartmentController = exports.createDepartmentController = void 0;
const getDataLayerAPI_endpoint_1 = require("../helpers/getDataLayerAPI_endpoint");
const createDepartment_1 = require("../validators/createDepartment");
const zod_1 = require("zod");
const createDepartmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = createDepartment_1.CreateDepartmetalProfileSchema.parse(req.body);
        const data_Layer_Base_Api_Endpoint = (0, getDataLayerAPI_endpoint_1.get_Data_Layer_POSTGRESS_Api_Endpoint)();
        console.log("endpoint ", data_Layer_Base_Api_Endpoint);
        const createProfileResponse = yield fetch(`${data_Layer_Base_Api_Endpoint}/profiles/departments/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Object.assign({}, parsedBody)),
        });
        const response = yield createProfileResponse.json();
        console.log("create department Controller response", response.message);
        if (createProfileResponse.ok) {
            res.status(201).json({
                success: true,
                message: "Department created",
            });
            return;
        }
        res.status(400).json({
            success: false,
            message: (response === null || response === void 0 ? void 0 : response.message) ? response.message : "Could not send create department. Please try again later.",
        });
    }
    catch (err) {
        console.log(`createDepartment controller encountered an err`, err);
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
exports.createDepartmentController = createDepartmentController;
// Update Department Profile
const updateDepartmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = createDepartment_1.CreateDepartmetalProfileSchema.parse(req.body);
        const data_Layer_Base_Api_Endpoint = (0, getDataLayerAPI_endpoint_1.get_Data_Layer_POSTGRESS_Api_Endpoint)();
        console.log("endpoint ", data_Layer_Base_Api_Endpoint);
        const updateProfileResponse = yield fetch(`${data_Layer_Base_Api_Endpoint}/profiles/departments/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Object.assign({}, parsedBody)),
        });
        const response = yield updateProfileResponse.json();
        console.log("update department Controller response", response.message);
        if (updateProfileResponse.ok) {
            res.status(201).json({
                success: true,
                message: "Department updated",
            });
            return;
        }
        res.status(400).json({
            success: false,
            message: (response === null || response === void 0 ? void 0 : response.message) ? response.message : "Could not send update department. Please try again later.",
        });
    }
    catch (err) {
        console.log(`updateDepartment controller encountered an err`, err);
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
exports.updateDepartmentController = updateDepartmentController;
//Get Department Profile by ID
const getDepartmentProfileById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = createDepartment_1.DepartmentalIdValidator.parse(req.body);
        const data_Layer_Base_Api_Endpoint = (0, getDataLayerAPI_endpoint_1.get_Data_Layer_POSTGRESS_Api_Endpoint)();
        console.log("endpoint ", data_Layer_Base_Api_Endpoint);
        const createProfileResponse = yield fetch(`${data_Layer_Base_Api_Endpoint}/profiles/departments/fetch/:departmentId`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Object.assign({}, parsedBody)),
        });
        const response = yield createProfileResponse.json();
        console.log("get department Controller response", response.message);
        if (createProfileResponse.ok) {
            res.status(201).json({
                success: true,
                message: "Department retrieved",
            });
            return;
        }
        res.status(400).json({
            success: false,
            message: (response === null || response === void 0 ? void 0 : response.message) ? response.message : "Could not get department. Please try again later.",
        });
    }
    catch (err) {
        console.log(`getDepartment controller encountered an err`, err);
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
exports.getDepartmentProfileById = getDepartmentProfileById;
//Get All Department
const getAllDepartmentsProfiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data_Layer_Base_Api_Endpoint = (0, getDataLayerAPI_endpoint_1.get_Data_Layer_POSTGRESS_Api_Endpoint)();
        console.log("endpoint ", data_Layer_Base_Api_Endpoint);
        const fetchProfileResponse = yield fetch(`${data_Layer_Base_Api_Endpoint}/profiles/departments/all`, {
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
            });
            return;
        }
        res.status(500).json({
            success: false,
            data: null,
            message: "Could not send fetch departments profiles. Please try again later.",
        });
    }
    catch (err) {
        console.log(`getAllDepartmentsProfiles controller encountered an err`, err);
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
            message: "Internal Server error. Could not fetch departments profiles. Please try again later.",
        });
        return;
    }
});
exports.getAllDepartmentsProfiles = getAllDepartmentsProfiles;
//Delete Department 
const deleteDepartmentProfileById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = createDepartment_1.DepartmentalIdValidator.parse(req.body);
        const data_Layer_Base_Api_Endpoint = (0, getDataLayerAPI_endpoint_1.get_Data_Layer_POSTGRESS_Api_Endpoint)();
        console.log("endpoint ", data_Layer_Base_Api_Endpoint);
        const deleteProfileResponse = yield fetch(`${data_Layer_Base_Api_Endpoint}/profiles/departments/delete`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Object.assign({}, parsedBody)),
        });
        const response = yield deleteProfileResponse.json();
        console.log("get department Controller response", response.message);
        if (deleteProfileResponse.ok) {
            res.status(201).json({
                success: true,
                message: "Department deleted",
            });
            return;
        }
        res.status(400).json({
            success: false,
            message: (response === null || response === void 0 ? void 0 : response.message) ? response.message : "Could not send delete department. Please try again later.",
        });
    }
    catch (err) {
        console.log(`deleteDepartment controller encountered an err`, err);
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
exports.deleteDepartmentProfileById = deleteDepartmentProfileById;
