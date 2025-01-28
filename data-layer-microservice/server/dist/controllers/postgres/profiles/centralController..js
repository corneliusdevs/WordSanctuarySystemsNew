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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCentralProfileById = exports.updateCentralProfileById = exports.getCentralProfileById = exports.getAllCentralsProfiles = exports.createCentralProfile = void 0;
const zod_1 = require("zod");
const library_1 = require("../../../../prisma/generated-clients/postgres/runtime/library");
const prismaClients_1 = require("../../../db_connections/prismaClients");
const createCentralProfileValidator_1 = require("../../validators/createCentralProfileValidator");
const centralsService_1 = require("../../../services/centralsService");
const createCentralProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const parsedBody = createCentralProfileValidator_1.CreateCentralProfileSchema.parse(req.body);
        const createdProfile = yield prismaClients_1.postgresClient.centrals.create({
            data: parsedBody,
        });
        if (createdProfile) {
            // add the departmentId to the profiles of the members of the department
            const departmentsProfileIds = parsedBody.departments.map((dept) => dept.department_id);
            const addedDepartmentsResponse = yield (0, centralsService_1.addCentralToDepartmentsProfilesService)(departmentsProfileIds, createdProfile.central_id);
            //  if departments are successfully added,
            if (addedDepartmentsResponse.success) {
                res.status(201).json({ message: "Central  created successfully" });
                return;
            }
            else {
                res
                    .status(201)
                    .json({
                    message: "Profile created successfully. But central not added to the departments' profiles",
                });
                return;
            }
            // take the snapshot of the profile
        }
        else {
            throw new Error(`Could Not create central profile. Try again later`);
        }
    }
    catch (err) {
        console.log("error creating central profile ", err);
        if (err instanceof zod_1.ZodError) {
            res
                .status(400)
                .json({ message: "Invalid request body", errorMessage: err.errors });
        }
        else if (err instanceof library_1.PrismaClientKnownRequestError) {
            if (err.code === "P2002") {
                res.status(400).json({
                    message: `The ${(_a = err.meta) === null || _a === void 0 ? void 0 : _a.target} already exists`,
                    errorMessage: "Unique constraint failed",
                });
            }
        }
        else {
            res.status(500).json({
                message: "Operation failed. Please try again later",
                errorMessage: "Internal server error",
            });
        }
    }
});
exports.createCentralProfile = createCentralProfile;
const getAllCentralsProfiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prismaClients_1.postgresClient.centrals.findMany();
        res.status(200).json({ centrals: result });
    }
    catch (err) {
        console.log("error fetching all centrals profiles ", err);
        res.status(500).json({
            message: "Could not fetch centrals profiles",
            errorMessage: "Internal Server Error",
        });
    }
});
exports.getAllCentralsProfiles = getAllCentralsProfiles;
const getCentralProfileById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let centralID = "";
    try {
        const central_id = (_a = req.params) === null || _a === void 0 ? void 0 : _a.centralId;
        centralID = central_id;
        if (!central_id) {
            res.status(404).json({
                message: "Bad Request",
                errorMessage: "Invalid or non-existent central profile id",
            });
        }
        else {
            const profile = yield prismaClients_1.postgresClient.centrals.findUnique({
                where: {
                    central_id: central_id,
                },
            });
            if (profile) {
                res.status(200).json({ profile });
            }
            else {
                res.status(404).json({
                    message: "central profile not found",
                    errorMessage: "Invalid or non-existent central profile Id",
                });
            }
        }
    }
    catch (err) {
        console.log(`error fetching central profile with id ${centralID}`, err);
        res.status(500).json({
            message: `Could not fetch central profile with id ${centralID}`,
            errorMessage: "Internal Server Error",
        });
    }
});
exports.getCentralProfileById = getCentralProfileById;
const updateCentralProfileById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const parsedBody = createCentralProfileValidator_1.UpdateCentralProfileSchema.parse(req.body);
        const { central_id } = parsedBody, restProps = __rest(parsedBody, ["central_id"]);
        const existingProfile = yield prismaClients_1.postgresClient.centrals.findUnique({
            where: {
                central_id: central_id,
            },
        });
        if (!existingProfile) {
            res.status(400).json({ message: "central profile does not exist" });
        }
        else {
            const updatedProfile = yield prismaClients_1.postgresClient.centrals.update({
                where: {
                    central_id: central_id,
                },
                data: Object.assign({}, restProps),
            });
            if (updatedProfile) {
                res
                    .status(201)
                    .json({ message: "Updated central profile successfully" });
            }
            else {
                throw new Error(`Could not update central profile with id ${central_id}`);
            }
        }
    }
    catch (err) {
        console.log("update central profile error ", err);
        if (err instanceof zod_1.ZodError) {
            res
                .status(400)
                .json({ message: "Invalid inputs", errorMessage: err.errors });
        }
        else if (err instanceof library_1.PrismaClientKnownRequestError) {
            if (err.code === "P2002") {
                res.status(400).json({
                    message: `The ${(_a = err.meta) === null || _a === void 0 ? void 0 : _a.target} already exists`,
                    errorMessage: "Unique constraint failed",
                });
            }
        }
        else {
            res.status(500).json({
                message: "Operation failed. Try again later",
                errorMessage: "Internal server error",
            });
        }
    }
});
exports.updateCentralProfileById = updateCentralProfileById;
const deleteCentralProfileById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = createCentralProfileValidator_1.CentralIdValidator.parse(req.body);
        // check if the record to be deleted is in the database, else, refuse the delete request
        const isInDb = yield prismaClients_1.postgresClient.centrals.findUnique({
            where: {
                central_id: parsedBody.central_id,
            },
        });
        if (!((isInDb === null || isInDb === void 0 ? void 0 : isInDb.central_id) === parsedBody.central_id)) {
            res.status(404).json({
                message: `central with id ${parsedBody.central_id} does not exist`,
            });
        }
        else {
            const result = yield prismaClients_1.postgresClient.centrals.delete({
                where: {
                    central_id: parsedBody.central_id,
                },
            });
            if (result.central_id === parsedBody.central_id) {
                res.status(201).json({ message: "Operation succesfull" });
            }
        }
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            res.status(400).json({
                message: "Invalid central_id field",
                errorMessage: err.errors,
            });
        }
        else {
            res.status(500).json({
                message: "Operation failed. Try again later",
                errorMessage: "Internal server error",
            });
        }
    }
});
exports.deleteCentralProfileById = deleteCentralProfileById;
