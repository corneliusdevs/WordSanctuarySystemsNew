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
exports.saveDepartmentKpiResult = exports.getDepartmentSnapshotById = exports.getDepartmentKpiResultById = exports.clearDepartmentSnapshot = exports.getAllDepartmentsSnapShots = exports.createDepartmentSnapshot = void 0;
const departmentService_1 = require("../../services/departmentService");
const createDepartmentProfileValidator_1 = require("../validators/createDepartmentProfileValidator");
const prismaClients_1 = require("../../db_connections/prismaClients");
const zod_1 = require("zod");
const mongodb_types_1 = require("../../types/mongodb_types");
const createDepartmentSnapshot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = createDepartmentProfileValidator_1.DepartmentalIdValidator.parse(req.body);
        const department_id = parsedBody.department_id;
        // get the snapshot
        const getDepartmentProfile = yield (0, departmentService_1.getDepartmentProfileByIdService)(department_id);
        if (getDepartmentProfile) {
            // save the snapshot
            const savedDepartentSnapShot = yield (0, departmentService_1.saveDepartmentSnapshotByIdService)(getDepartmentProfile);
            // create the snapshots of the members in the department.
            const createdMembersSnapshotsResponse = yield (0, departmentService_1.saveDepartmentMembersProfileSnapShotsService)(getDepartmentProfile === null || getDepartmentProfile === void 0 ? void 0 : getDepartmentProfile.members);
            // return the response
            res.status(201).json({
                message: "snapshots created successfully",
                data: savedDepartentSnapShot,
            });
        }
        else {
            res.status(400).json({
                message: "could not get department profile",
                data: "",
            });
        }
    }
    catch (err) {
        console.error(`could not process create department snapshot request: ${err}`);
        if (err instanceof zod_1.ZodError) {
            res.status(400).json({
                success: false,
                message: `Invalid Inputs`,
                error: err.errors,
            });
            return;
        }
        res.status(500).json({
            success: false,
            message: `could not process create department snapshot request. please try again later`,
            error: err,
        });
    }
});
exports.createDepartmentSnapshot = createDepartmentSnapshot;
const getAllDepartmentsSnapShots = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allDepartmentsSnapShots = yield (0, departmentService_1.getAllDepartmentsSnapShotsService)();
        res.status(200).json({
            departmentSnapshots: allDepartmentsSnapShots,
        });
    }
    catch (err) {
        console.error("could not get snapshots for all departments ", err);
        res.status(500).json({
            departmentSnapshots: null,
            message: "could not fetch all department snapshots",
        });
    }
});
exports.getAllDepartmentsSnapShots = getAllDepartmentsSnapShots;
const clearDepartmentSnapshot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { department_id } = createDepartmentProfileValidator_1.DepartmentalIdValidator.parse(req.body);
        const existingDepartmentSnapshot = yield prismaClients_1.mongoDbClient.departmentalSnapShots.findUnique({
            where: {
                department_id: department_id,
            },
        });
        if (!existingDepartmentSnapshot) {
            // if the snapshot for that department does not exist
            res.status(401).json({
                message: `department with id: ${department_id} does not exist`,
            });
            return;
        }
        const clearedDepartmentSnapshot = (yield (0, departmentService_1.clearDepartmentSnapshotService)(department_id)).data;
        if (clearedDepartmentSnapshot) {
            res.status(201).json({
                message: "cleared department snapshot",
                data: clearedDepartmentSnapshot,
            });
        }
        else {
            res.status(500).json({
                message: `could not clear snapshots for department with id ${department_id}. Please try again later`,
            });
        }
    }
    catch (err) {
        console.error(`could not clear snapshots of department`);
        res.status(500).json({
            message: `could not clear snapshots of department`,
        });
    }
});
exports.clearDepartmentSnapshot = clearDepartmentSnapshot;
const getDepartmentKpiResultById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request_params = req.params;
        if (!(request_params === null || request_params === void 0 ? void 0 : request_params.department_id)) {
            res.status(400).json({
                message: `Missing department_id in request parameters`,
            });
            return;
        }
        const { department_id } = req.params;
        const kpiResult = yield (0, departmentService_1.getDepartmentKpiResultByIdService)(department_id);
        res.status(200).json({
            data: kpiResult,
            message: "success",
        });
    }
    catch (err) {
        console.error(`could not fetch snapShot of department`);
        if (err instanceof zod_1.ZodError) {
            res.status(400).json({
                message: "Bad request",
                data: null,
                error: err.errors,
            });
            return;
        }
        res.status(500).json({
            message: "Internal server error. Please try again later",
            data: null,
            error: null,
        });
    }
});
exports.getDepartmentKpiResultById = getDepartmentKpiResultById;
const getDepartmentSnapshotById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { department_id } = req.params;
        const departmentSnapShot = yield prismaClients_1.mongoDbClient.departmentalSnapShots.findUnique({
            where: {
                department_id: department_id,
            },
        });
        res.status(200).json({
            data: departmentSnapShot,
            message: "success",
        });
    }
    catch (err) {
        console.error(`could not fetch snapShot of department`);
        if (err instanceof zod_1.ZodError) {
            res.status(400).json({
                message: "Bad request",
                data: null,
                error: err.errors,
            });
            return;
        }
        res.status(500).json({
            message: "Internal server error. Please try again later",
            data: null,
            error: null,
        });
    }
});
exports.getDepartmentSnapshotById = getDepartmentSnapshotById;
const saveDepartmentKpiResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = mongodb_types_1.SaveDeparmentKpiResultsInputValidator.parse(req.body);
        const savedResults = yield (0, departmentService_1.saveDepartmentKpiResultService)(parsedBody.kpi_parameters, parsedBody.kpi_results);
        console.log("saved results from db are ", savedResults);
        res.status(200).json({
            results: savedResults,
        });
    }
    catch (err) {
        console.error("could not save kpi results for all departments ", err);
        res.status(500).json({
            results: null,
            message: "could not save kpi results for department",
        });
    }
});
exports.saveDepartmentKpiResult = saveDepartmentKpiResult;
