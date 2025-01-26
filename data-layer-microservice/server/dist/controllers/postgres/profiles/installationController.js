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
exports.deleteInstallationProfileById = exports.getAllInstallationProfiles = exports.updateInstallationProfileById = exports.getInstallationProfileById = exports.createInstallationProfile = void 0;
const prismaClients_1 = require("../../../db_connections/prismaClients");
const createInstallationProfileValidator_1 = require("../../validators/createInstallationProfileValidator");
const zod_1 = require("zod");
const library_1 = require("../../../../prisma/generated-clients/postgres/runtime/library");
const createInstallationProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const parsedBody = createInstallationProfileValidator_1.CreateInstallationProfileSchema.parse(req.body);
        // Validate that all profiles exist
        const extractedProfileIdsFromReq = (0, createInstallationProfileValidator_1.extractProfileIds)(parsedBody.members);
        const profilesExists = yield prismaClients_1.postgresClient.profiles.findMany({
            where: {
                profile_id: {
                    in: extractedProfileIdsFromReq,
                },
            },
        });
        // If the number of found centrals does not match the number of centrals in the request,
        // it means some central IDs do not exist.
        if (profilesExists.length !== extractedProfileIdsFromReq.length) {
            const nonExistentProfiles = extractedProfileIdsFromReq.filter((profileId) => !profilesExists.some((profile) => profile.profile_id === profileId));
            res.status(400).json({
                message: "Invalid profile IDs",
                errorMessage: `The following profile IDs do not exist: ${nonExistentProfiles.join(", ")}`,
            });
        }
        else {
            // create the installation profile
            const createdProfile = yield prismaClients_1.postgresClient.installations.create({
                data: parsedBody,
            });
            if (createdProfile) {
                res
                    .status(201)
                    .json({ message: "Installation Profile created successfully" });
            }
            else {
                throw new Error(`Could Not create Installation profile. Try again later`);
            }
        }
    }
    catch (err) {
        console.log("error creating Installation profile ", err);
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
exports.createInstallationProfile = createInstallationProfile;
const getInstallationProfileById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let installationID = "";
    try {
        const installation_id = (_a = req.params) === null || _a === void 0 ? void 0 : _a.installationId;
        installationID = installation_id;
        if (!installation_id) {
            res.status(404).json({
                message: "Bad Request",
                errorMessage: "Invalid or non-existent installation profile id",
            });
        }
        else {
            const profile = yield prismaClients_1.postgresClient.installations.findUnique({
                where: {
                    installation_id: installation_id,
                },
            });
            if (profile) {
                res.status(200).json({ profile });
            }
            else {
                res.status(404).json({
                    message: "Installation profile not found",
                    errorMessage: "Invalid or non-existent Installation profile Id",
                });
            }
        }
    }
    catch (err) {
        console.log(`error fetching installation profile with id ${installationID}`, err);
        res.status(500).json({
            message: `Could not fetch installation profile with id ${installationID}`,
            errorMessage: "Internal Server Error",
        });
    }
});
exports.getInstallationProfileById = getInstallationProfileById;
const updateInstallationProfileById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const parsedBody = createInstallationProfileValidator_1.UpdateInstallationProfileSchema.parse(req.body);
        const { installation_id } = parsedBody, restProps = __rest(parsedBody, ["installation_id"]);
        const existingProfile = yield prismaClients_1.postgresClient.installations.findUnique({
            where: {
                installation_id,
            },
        });
        if (!existingProfile) {
            res.status(400).json({ message: "Installation profile does not exist" });
            res.end(); //end the response
        }
        else {
            const updatedProfile = yield prismaClients_1.postgresClient.installations.update({
                where: {
                    installation_id: installation_id,
                },
                data: Object.assign({}, restProps),
            });
            if (updatedProfile) {
                res
                    .status(201)
                    .json({ message: "Updated installation profile successfully" });
            }
            else {
                throw new Error(`Could not update installation profile with id ${installation_id}`);
            }
        }
    }
    catch (err) {
        console.log("update installation profile error ", err);
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
exports.updateInstallationProfileById = updateInstallationProfileById;
const getAllInstallationProfiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prismaClients_1.postgresClient.installations.findMany();
        res.status(200).json({ installations: result });
    }
    catch (err) {
        console.log("error fetching all installations profiles ", err);
        res.status(500).json({
            message: "Could not fetch installation profiles",
            errorMessage: "Internal Server Error",
        });
    }
});
exports.getAllInstallationProfiles = getAllInstallationProfiles;
const deleteInstallationProfileById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = createInstallationProfileValidator_1.InstallationIdValidator.parse(req.body);
        // check if the record to be deleted is in the database, else, refuse the delete request
        const isInDb = yield prismaClients_1.postgresClient.installations.findUnique({
            where: {
                installation_id: parsedBody.installation_id,
            },
        });
        if (!((isInDb === null || isInDb === void 0 ? void 0 : isInDb.installation_id) === parsedBody.installation_id)) {
            res.status(404).json({
                message: `installation with id ${parsedBody.installation_id} does not exist`,
            });
        }
        else {
            const result = yield prismaClients_1.postgresClient.installations.delete({
                where: {
                    installation_id: parsedBody.installation_id,
                },
            });
            if (result.installation_id === parsedBody.installation_id) {
                res.status(201).json({ message: "Operation succesfull" });
            }
        }
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            res.status(400).json({
                message: "Invalid installation_id field",
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
exports.deleteInstallationProfileById = deleteInstallationProfileById;
