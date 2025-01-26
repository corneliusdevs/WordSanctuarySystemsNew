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
exports.updateDepartmentClassById = exports.deleteDepartmentClassById = exports.getAllDepartmentClasses = exports.getDepartmentClassById = exports.createDepartmentClass = void 0;
const createDepartmentalClassValidator_1 = require("../validators/createDepartmentalClassValidator");
const prismaClients_1 = require("../../db_connections/prismaClients");
const zod_1 = require("zod");
const library_1 = require("../../../prisma/generated-clients/postgres/runtime/library");
const createDepartmentClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const parsedBody = createDepartmentalClassValidator_1.CreateDepartmentClassSchema.parse(req.body);
        const createdProfile = yield prismaClients_1.postgresClient.departmentClass.create({
            data: parsedBody,
        });
        if (createdProfile) {
            res
                .status(201)
                .json({ message: "department class created successfully" });
        }
        else {
            throw new Error(`Could Not create department class. Try again later`);
        }
    }
    catch (err) {
        console.log("error creating department class ", err);
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
exports.createDepartmentClass = createDepartmentClass;
const getDepartmentClassById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let departmentClassID = "";
    try {
        const department_class_id = (_a = req.params) === null || _a === void 0 ? void 0 : _a.departmentClassID;
        departmentClassID = department_class_id;
        if (!department_class_id) {
            res.status(404).json({
                message: "Bad Request",
                errorMessage: "Invalid or non-existent department class id",
            });
        }
        else {
            const departmentClass = yield prismaClients_1.postgresClient.departmentClass.findUnique({
                where: {
                    department_class_id: department_class_id,
                },
            });
            if (departmentClass) {
                res.status(200).json({ departmentClass });
            }
            else {
                res.status(404).json({
                    message: "department class not found",
                    errorMessage: "Invalid or non-existent department class Id",
                });
            }
        }
    }
    catch (err) {
        console.log(`error fetching department class with id ${departmentClassID}`, err);
        res.status(500).json({
            message: `Could not fetch department class with id ${departmentClassID}`,
            errorMessage: "Internal Server Error",
        });
    }
});
exports.getDepartmentClassById = getDepartmentClassById;
const getAllDepartmentClasses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prismaClients_1.postgresClient.departmentClass.findMany();
        res.status(200).json({ departmentClasses: result });
    }
    catch (err) {
        console.log("error fetching all department classes", err);
        res.status(500).json({
            message: "Could not fetch department classes",
            errorMessage: "Internal Server Error",
        });
    }
});
exports.getAllDepartmentClasses = getAllDepartmentClasses;
const deleteDepartmentClassById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = createDepartmentalClassValidator_1.DepartmentClassIdValidator.parse(req.body);
        // check if the record to be deleted is in the database, else, refuse the delete request
        const isInDb = yield prismaClients_1.postgresClient.departmentClass.findUnique({
            where: {
                department_class_id: parsedBody.department_class_id,
            },
        });
        if (!((isInDb === null || isInDb === void 0 ? void 0 : isInDb.department_class_id) === parsedBody.department_class_id)) {
            res
                .status(404)
                .json({
                message: `department class with id ${parsedBody.department_class_id} does not exist`,
            });
        }
        else {
            const result = yield prismaClients_1.postgresClient.departmentClass.delete({
                where: {
                    department_class_id: parsedBody.department_class_id,
                },
            });
            if (result.department_class_id === parsedBody.department_class_id) {
                res.status(201).json({ message: "Operation succesfull" });
            }
        }
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            res.status(400).json({
                message: "Invalid department_class_id field",
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
exports.deleteDepartmentClassById = deleteDepartmentClassById;
const updateDepartmentClassById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const parsedBody = createDepartmentalClassValidator_1.UpdateDepartmentClassSchema.parse(req.body);
        const { department_class_id } = parsedBody, restProps = __rest(parsedBody, ["department_class_id"]);
        const existingProfile = yield prismaClients_1.postgresClient.departmentClass.findUnique({
            where: {
                department_class_id: department_class_id,
            },
        });
        if (!existingProfile) {
            res.status(400).json({ message: "department class does not exist" });
            res.end(); //end the response
        }
        else {
            const updatedProfile = yield prismaClients_1.postgresClient.departmentClass.update({
                where: {
                    department_class_id: department_class_id,
                },
                data: Object.assign({}, restProps),
            });
            if (updatedProfile) {
                res
                    .status(201)
                    .json({ message: "Updated department class successfully" });
                return;
            }
            else {
                throw new Error(`Could not update department class with id ${department_class_id}`);
            }
        }
    }
    catch (err) {
        console.log("update department class error ", err);
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
exports.updateDepartmentClassById = updateDepartmentClassById;
