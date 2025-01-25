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
exports.deleteDepartmentProfileById = exports.updateDepartmentProfileById = exports.getAllDepartmentsProfiles = exports.getDepartmentProfileById = exports.createDepartmentProfile = void 0;
const prismaClients_1 = require("../../../db_connections/prismaClients");
const createDepartmentProfileValidator_1 = require("../../validators/createDepartmentProfileValidator");
const zod_1 = require("zod");
const library_1 = require("../../../../prisma/generated-clients/postgres/runtime/library");
const departmentService_1 = require("../../../services/departmentService");
const createDepartmentProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const parsedBody = createDepartmentProfileValidator_1.CreateDepartmetalProfileSchema.parse(req.body);
        // check if the department_type is a valid department class before creating it, else decline the request
        const result = yield prismaClients_1.postgresClient.departmentClass.findUnique({
            where: {
                department_class_id: parsedBody.department_type,
            },
        });
        if (!result) {
            res.status(400).json({
                message: "Invalid department type",
                errorMessage: `department_type must correspond to an existing department_class_id`,
            });
        }
        else {
            // Validate that all centrals exist
            const centralsExist = yield prismaClients_1.postgresClient.centrals.findMany({
                where: {
                    central_id: {
                        in: parsedBody.centrals,
                    },
                },
            });
            // If the number of found centrals does not match the number of centrals in the request,
            // it means some central IDs do not exist.
            if (centralsExist.length !== parsedBody.centrals.length) {
                const nonExistentCentrals = parsedBody.centrals.filter((centralId) => !centralsExist.some((central) => central.central_id === centralId));
                res.status(400).json({
                    message: "Invalid central IDs",
                    errorMessage: `The following central IDs do not exist: ${nonExistentCentrals.join(", ")}`,
                });
            }
            else {
                // create the profile
                const createdProfile = yield prismaClients_1.postgresClient.departments.create({
                    data: parsedBody,
                });
                if (createdProfile) {
                    // add the departmentId to the profiles of the members of the department
                    const membersProfileIds = parsedBody.members.map(member => member.profile_id);
                    const addedMembersResponse = yield (0, departmentService_1.addDepartmentToMembersProfilesService)(membersProfileIds, createdProfile.department_id);
                    //  if members are successfully added,
                    if (addedMembersResponse.success) {
                        res.status(201).json({ message: "Profile created successfully" });
                    }
                    else {
                        res.status(201).json({ message: "Profile created successfully. But department not added to the members profile" });
                    }
                    // take the snapshot of the profile
                    const createdSnaphsot = yield (0, departmentService_1.createDepartmentSnapshotByIdService)(createdProfile.department_id);
                    console.log("department snapshot taken");
                    return;
                    return;
                }
                else {
                    throw new Error(`Could Not create department profile. Try again later`);
                }
            }
        }
    }
    catch (err) {
        console.log("error creating department profile ", err);
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
exports.createDepartmentProfile = createDepartmentProfile;
const getDepartmentProfileById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let departmentId = "";
    try {
        const department_id = (_a = req.params) === null || _a === void 0 ? void 0 : _a.departmentId;
        if (!department_id) {
            res.status(404).json({
                message: "Bad Request",
                errorMessage: "Invalid or non-existent  department_id",
            });
        }
        else {
            const profile = yield prismaClients_1.postgresClient.departments.findUnique({
                where: {
                    department_id: department_id,
                },
            });
            if (profile) {
                res.status(200).json({ profile });
            }
            else {
                res.status(404).json({
                    message: "Departmental profile not found",
                    errorMessage: "Invalid or non-existent department_id",
                });
            }
        }
    }
    catch (err) {
        console.log(`error fetching department profile with id ${departmentId}`, err);
        res.status(500).json({
            message: `Could not fetch department profile with id ${departmentId}`,
            errorMessage: "Internal Server Error",
        });
    }
});
exports.getDepartmentProfileById = getDepartmentProfileById;
// get all the profiles
const getAllDepartmentsProfiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prismaClients_1.postgresClient.departments.findMany();
        res.status(200).json({ departmentProfiles: result });
    }
    catch (err) {
        console.log("error fetching all departmetal profiles ", err);
        res.status(500).json({
            message: "Could not fetch department profiles",
            errorMessage: "Internal Server Error",
        });
    }
});
exports.getAllDepartmentsProfiles = getAllDepartmentsProfiles;
const updateDepartmentProfileById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const parsedBody = createDepartmentProfileValidator_1.UpdateDepartmentProfileSchema.parse(req.body);
        const { department_id } = parsedBody, restProps = __rest(parsedBody, ["department_id"]);
        const existingProfile = yield prismaClients_1.postgresClient.departments.findUnique({
            where: {
                department_id: department_id,
            },
        });
        if (!existingProfile) {
            res.status(400).json({ message: "Department profile does not exist" });
            return;
        }
        else {
            const updatedProfile = yield prismaClients_1.postgresClient.departments.update({
                where: {
                    department_id: department_id,
                },
                data: Object.assign({}, restProps),
            });
            if (updatedProfile) {
                res
                    .status(201)
                    .json({ message: "Updated department profile successfully" });
                // take the snapshot of the department
                const createdSnaphsot = yield (0, departmentService_1.createDepartmentSnapshotByIdService)(updatedProfile.department_id);
                console.log("department snapshot taken");
                return;
            }
            else {
                throw new Error(`Could not update department profile with id ${department_id}`);
            }
        }
    }
    catch (err) {
        console.log("update department profile error ", err);
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
exports.updateDepartmentProfileById = updateDepartmentProfileById;
const deleteDepartmentProfileById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = createDepartmentProfileValidator_1.DepartmentalIdValidator.parse(req.body);
        // check if the record to be deleted is in the database, else, refuse the delete request
        const isInDb = yield prismaClients_1.postgresClient.departments.findUnique({
            where: {
                department_id: parsedBody.department_id,
            },
        });
        if (!((isInDb === null || isInDb === void 0 ? void 0 : isInDb.department_id) === parsedBody.department_id)) {
            res.status(404).json({
                message: `department with id ${parsedBody.department_id} does not exist`,
            });
        }
        else {
            const result = yield prismaClients_1.postgresClient.departments.delete({
                where: {
                    department_id: parsedBody.department_id,
                },
            });
            if (result.department_id === parsedBody.department_id) {
                res.status(201).json({ message: "Operation succesfull" });
            }
        }
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            res.status(400).json({
                message: "Invalid department_id field",
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
exports.deleteDepartmentProfileById = deleteDepartmentProfileById;
