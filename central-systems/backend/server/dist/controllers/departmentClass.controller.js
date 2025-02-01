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
exports.getAllDepartmentClasses = exports.deleteDepartmentClassController = exports.getDepartmentClassByIdController = exports.updateDepartmentClassController = exports.createDepartmentClassController = void 0;
const getDataLayerAPI_endpoint_1 = require("../helpers/getDataLayerAPI_endpoint");
const createDepartmentClass_1 = require("../validators/createDepartmentClass");
const zod_1 = require("zod");
const createDepartmentClassController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = createDepartmentClass_1.CreateDepartmentClassSchema.parse(req.body);
        const data_Layer_Base_Api_Endpoint = (0, getDataLayerAPI_endpoint_1.get_Data_Layer_POSTGRESS_Api_Endpoint)();
        console.log("endpoint ", data_Layer_Base_Api_Endpoint);
        const createProfileResponse = yield fetch(`${data_Layer_Base_Api_Endpoint}/profiles/departments/class/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Object.assign({}, parsedBody)),
        });
        const response = yield createProfileResponse.json();
        console.log("create departmentClassController response", response.message);
        if (createProfileResponse.ok) {
            res.status(201).json({
                success: true,
                message: "Department type created",
            });
            return;
        }
        res.status(400).json({
            success: false,
            message: (response === null || response === void 0 ? void 0 : response.message) ? response.message : "Could not send create department type. Please try again later.",
        });
    }
    catch (err) {
        console.log(`createDepartmentClass controller encountered an err`, err);
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
exports.createDepartmentClassController = createDepartmentClassController;
//Update Department Class
const updateDepartmentClassController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = createDepartmentClass_1.UpdateDepartmentClassSchema.parse(req.body);
        const data_Layer_Base_Api_Endpoint = (0, getDataLayerAPI_endpoint_1.get_Data_Layer_POSTGRESS_Api_Endpoint)();
        console.log("endpoint ", data_Layer_Base_Api_Endpoint);
        const updateDepartmentClassResponse = yield fetch(`${data_Layer_Base_Api_Endpoint}/profiles/departments/class/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Object.assign({}, parsedBody)),
        });
        const response = yield updateDepartmentClassResponse.json();
        console.log("update departmentClassController response", response.message);
        if (updateDepartmentClassResponse.ok) {
            res.status(201).json({
                success: true,
                message: "Department type updated",
            });
            return;
        }
        res.status(400).json({
            success: false,
            message: (response === null || response === void 0 ? void 0 : response.message) ? response.message : "Could not send update department type. Please try again later.",
        });
    }
    catch (err) {
        console.log(`updateDepartmentClass controller encountered an err`, err);
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
exports.updateDepartmentClassController = updateDepartmentClassController;
// Get Department Class By Id
const getDepartmentClassByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = createDepartmentClass_1.DepartmentClassIdValidator.parse(req.body);
        const data_Layer_Base_Api_Endpoint = (0, getDataLayerAPI_endpoint_1.get_Data_Layer_POSTGRESS_Api_Endpoint)();
        console.log("endpoint ", data_Layer_Base_Api_Endpoint);
        const getDepartmentClassResponse = yield fetch(`${data_Layer_Base_Api_Endpoint}/profiles/departments/class/fetch/:departmentClassID`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Object.assign({}, parsedBody)),
        });
        const response = yield getDepartmentClassResponse.json();
        console.log("get departmentClassController response", response.message);
        if (getDepartmentClassResponse.ok) {
            res.status(201).json({
                success: true,
                message: "Department class retrieved",
            });
            return;
        }
        res.status(400).json({
            success: false,
            message: (response === null || response === void 0 ? void 0 : response.message) ? response.message : "Could not send get department type. Please try again later.",
        });
    }
    catch (err) {
        console.log(`getDepartmentClass controller encountered an err`, err);
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
exports.getDepartmentClassByIdController = getDepartmentClassByIdController;
//Delete Department Class
const deleteDepartmentClassController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = createDepartmentClass_1.DepartmentClassIdValidator.parse(req.body);
        const data_Layer_Base_Api_Endpoint = (0, getDataLayerAPI_endpoint_1.get_Data_Layer_POSTGRESS_Api_Endpoint)();
        console.log("endpoint ", data_Layer_Base_Api_Endpoint);
        const deleteDepartmentClassResponse = yield fetch(`${data_Layer_Base_Api_Endpoint}/profiles/departments/class/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Object.assign({}, parsedBody)),
        });
        const response = yield deleteDepartmentClassResponse.json();
        console.log("delete departmentClassController response", response.message);
        if (deleteDepartmentClassResponse.ok) {
            res.status(201).json({
                success: true,
                message: "Department type deleted",
            });
            return;
        }
        res.status(400).json({
            success: false,
            message: (response === null || response === void 0 ? void 0 : response.message) ? response.message : "Could not send delete department type. Please try again later.",
        });
    }
    catch (err) {
        console.log(`deleteDepartmentClass controller encountered an err`, err);
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
exports.deleteDepartmentClassController = deleteDepartmentClassController;
// Get All Department Class
const getAllDepartmentClasses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data_Layer_Base_Api_Endpoint = (0, getDataLayerAPI_endpoint_1.get_Data_Layer_POSTGRESS_Api_Endpoint)();
        console.log("endpoint ", data_Layer_Base_Api_Endpoint);
        const fetchProfileResponse = yield fetch(`${data_Layer_Base_Api_Endpoint}/profiles/departments/class/all`, {
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
                message: "All Department classes data fetched"
            });
            return;
        }
        res.status(500).json({
            success: false,
            data: null,
            message: "Could not send fetch Department classes. Please try again later.",
        });
    }
    catch (err) {
        console.log(`getAllDepartmentClasses controller encountered an err`, err);
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
            message: "Internal Server error. Could not fetch Department classes profiles. Please try again later.",
            data: null
        });
        return;
    }
});
exports.getAllDepartmentClasses = getAllDepartmentClasses;
