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
exports.deleteIndividualProfileById = exports.updateIndividualProfileById = exports.getAllIndividualProfiles = exports.getIndividualProfileByEmail = exports.getIndividualProfileByGivingNumber = exports.getIndividualProfileById = exports.createIndividualProfile = void 0;
const createIndividualProfileValidator_1 = require("../../validators/createIndividualProfileValidator");
const zod_1 = require("zod");
const prismaClients_1 = require("../../../db_connections/prismaClients");
const library_1 = require("../../../../prisma/generated-clients/postgres/runtime/library");
const individualProfileService_1 = require("../../../services/individualProfileService");
// create the profile
const createIndividualProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const parsedBody = createIndividualProfileValidator_1.CreateIndividualProfileSchema.parse(req.body);
        const createdProfile = yield prismaClients_1.postgresClient.profiles.create({
            data: parsedBody,
        });
        if (createdProfile) {
            res.status(201).json({ message: "Profile created successfully" });
            //  create the snapshot of the individual
            const createdSnapshot = yield (0, individualProfileService_1.saveIndividualProfileByIdService)([createdProfile.profile_id]);
            return;
        }
        else {
            throw new Error(`Could Not create new profile. Try again later`);
        }
        console.log("request body ", parsedBody);
    }
    catch (err) {
        console.log("error creating individual profile ", err);
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
exports.createIndividualProfile = createIndividualProfile;
// get the individual profile by id
const getIndividualProfileById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let profileID = "";
    try {
        const profileId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.profileId;
        profileID = profileId;
        if (!profileId) {
            res.status(404).json({
                message: "Bad Request",
                errorMessage: "Invalid or non-existent profileId",
            });
        }
        else {
            const profile = yield prismaClients_1.postgresClient.profiles.findUnique({
                where: {
                    profile_id: profileId,
                },
            });
            if (profile) {
                res.status(200).json({ profile });
            }
            else {
                res.status(404).json({
                    message: "Profile not found",
                    errorMessage: "Invalid or non-existent profileId",
                });
            }
        }
    }
    catch (err) {
        console.log(`error fetching profile with id ${profileID}`, err);
        res.status(500).json({
            message: `Could not fetch profile with id ${profileID}`,
            errorMessage: "Internal Server Error",
        });
    }
});
exports.getIndividualProfileById = getIndividualProfileById;
// get the individual profile by giving number
const getIndividualProfileByGivingNumber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let givingNumber;
    try {
        const reqBody = req.body;
        const parsedBody = createIndividualProfileValidator_1.GivingNumberValidatorObj.parse(reqBody);
        givingNumber = parsedBody.givingNumber;
        const profile = yield prismaClients_1.postgresClient.profiles.findFirst({
            where: {
                giving_number: parsedBody.givingNumber,
            },
        });
        if (profile) {
            res.status(200).json({ profile });
        }
        else {
            res.status(404).json({
                message: "Profile not found",
                errorMessage: `No profile associated with giving number ${parsedBody.givingNumber}`,
            });
        }
    }
    catch (err) {
        console.log(`error fetching profile with giving number ${givingNumber}`, err);
        if (err instanceof zod_1.ZodError) {
            res.status(400).json({
                message: "Invalid giving number input",
                errorMessage: err.errors,
            });
        }
        res.status(500).json({
            message: `Could not fetch profile with giving number ${givingNumber}`,
            errorMessage: "Internal Server Error",
        });
    }
});
exports.getIndividualProfileByGivingNumber = getIndividualProfileByGivingNumber;
// get the individual profile by id
const getIndividualProfileByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let profileEmail;
    try {
        const reqBody = req.body;
        const parsedBody = createIndividualProfileValidator_1.EmailValidatorObj.parse(reqBody);
        profileEmail = parsedBody.email;
        const profile = yield prismaClients_1.postgresClient.profiles.findUnique({
            where: {
                email: parsedBody.email,
            },
        });
        if (profile) {
            res.status(200).json({ profile });
        }
        else {
            res.status(404).json({
                message: "Profile not found",
                errorMessage: `No profile associated with email ${parsedBody.email}`,
            });
        }
    }
    catch (err) {
        console.log(`error fetching profile with email ${profileEmail}`, err);
        if (err instanceof zod_1.ZodError) {
            res.status(400).json({
                message: "Invalid email input",
                errorMessage: err.errors,
            });
        }
        res.status(500).json({
            message: `Could not fetch profile with email ${profileEmail}`,
            errorMessage: "Internal Server Error",
        });
    }
});
exports.getIndividualProfileByEmail = getIndividualProfileByEmail;
// get all the profiles
const getAllIndividualProfiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prismaClients_1.postgresClient.profiles.findMany();
        res.status(200).json({ allProfiles: result });
    }
    catch (err) {
        console.log("error fetching all profiles ", err);
        res.status(500).json({
            message: "Could not fetch profiles",
            errorMessage: "Internal Server Error",
        });
    }
});
exports.getAllIndividualProfiles = getAllIndividualProfiles;
const updateIndividualProfileById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const parsedBody = createIndividualProfileValidator_1.UpdateIndividualProfileSchema.parse(req.body);
        const { profile_id } = parsedBody, restProps = __rest(parsedBody, ["profile_id"]);
        const existingProfile = yield prismaClients_1.postgresClient.profiles.findUnique({
            where: {
                profile_id: profile_id,
            },
        });
        if (!existingProfile) {
            res.status(400).json({ message: "Profile does not exist" });
            return;
        }
        const updatedProfile = yield prismaClients_1.postgresClient.profiles.update({
            where: {
                profile_id: profile_id,
            },
            data: Object.assign(Object.assign({}, existingProfile), restProps),
        });
        if (updatedProfile) {
            res.status(201).json({ message: "Updated profile successfully" });
            //  create the snapshot of the individual
            const saveIndividualSnapshot = yield (0, individualProfileService_1.saveIndividualProfileByIdService)([updatedProfile.profile_id]);
            return;
        }
        else {
            throw new Error(`Could not update profile with id ${profile_id}`);
        }
    }
    catch (err) {
        console.log("update profile error ", err);
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
exports.updateIndividualProfileById = updateIndividualProfileById;
const deleteIndividualProfileById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = createIndividualProfileValidator_1.profileIdValidator.parse(req.body);
        // check if the record to be deleted is in the database, else, refuse the delete request
        const isInDb = yield prismaClients_1.postgresClient.profiles.findUnique({
            where: {
                profile_id: parsedBody.profile_id,
            },
        });
        if (!((isInDb === null || isInDb === void 0 ? void 0 : isInDb.profile_id) === parsedBody.profile_id)) {
            res
                .status(404)
                .json({
                message: `Profile with id ${parsedBody.profile_id} does not exist`,
            });
        }
        else {
            const result = yield prismaClients_1.postgresClient.profiles.delete({
                where: {
                    profile_id: parsedBody.profile_id,
                },
            });
            if (result.profile_id === parsedBody.profile_id) {
                res.status(201).json({ message: "Operation succesfull" });
            }
        }
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            res.status(400).json({
                message: "Invalid profile_id field",
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
exports.deleteIndividualProfileById = deleteIndividualProfileById;
