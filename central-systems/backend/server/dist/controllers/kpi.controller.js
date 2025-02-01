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
exports.getDepartmentKpiById = exports.calculateDepartmentKpi = void 0;
const getDataLayerAPI_endpoint_1 = require("../helpers/getDataLayerAPI_endpoint");
const zod_1 = require("zod");
const kpi_validation_1 = require("../validators/kpi.validation");
const calculateDepartmentKpi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = kpi_validation_1.DepartmentKpiMetaData.parse(req.body);
        const data_Layer_Base_Api_Endpoint = (0, getDataLayerAPI_endpoint_1.get_Data_Layer_POSTGRESS_Api_Endpoint)();
        console.log("endpoint ", data_Layer_Base_Api_Endpoint);
        const calculateDepartmentKpiResponse = yield fetch(`${data_Layer_Base_Api_Endpoint}/departments/calculate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Object.assign({}, parsedBody)),
        });
        if (calculateDepartmentKpiResponse.ok) {
            res.status(201).json({
                success: true,
                message: "Departement kpi calculated",
            });
            return;
        }
        res.status(500).json({
            success: false,
            message: "Could not send calculate department kpi. Please try again later.",
        });
    }
    catch (err) {
        console.log(`calculateDepartmentKpi controller encountered an err`, err);
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
exports.calculateDepartmentKpi = calculateDepartmentKpi;
// Get Department Kpi by Id
const getDepartmentKpiById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = kpi_validation_1.DepartementKpiIdValidator.parse(req.body);
        const data_Layer_Base_Api_Endpoint = (0, getDataLayerAPI_endpoint_1.get_Data_Layer_POSTGRESS_Api_Endpoint)();
        console.log("endpoint ", data_Layer_Base_Api_Endpoint);
        const getDepartmentKpiResponse = yield fetch(`${data_Layer_Base_Api_Endpoint}/departments/kpi/id/:departmentId`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Object.assign({}, parsedBody)),
        });
        if (getDepartmentKpiResponse.ok) {
            res.status(201).json({
                success: true,
                message: "Departement kpi retrieved",
            });
            return;
        }
        res.status(500).json({
            success: false,
            message: "Could not send get department kpi. Please try again later.",
        });
    }
    catch (err) {
        console.log(`getDepartmentKpi controller encountered an err`, err);
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
exports.getDepartmentKpiById = getDepartmentKpiById;
