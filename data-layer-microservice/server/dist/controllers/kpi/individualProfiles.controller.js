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
exports.clearIndivdualSnapshotsById = exports.getIndividualProfileSnapShotsByProfileIds = exports.getAllIndividualProfileSnapShots = void 0;
const individualProfileService_1 = require("../../services/individualProfileService");
const createIndividualProfileValidator_1 = require("../validators/createIndividualProfileValidator");
const zod_1 = require("zod");
const getAllIndividualProfileSnapShots = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allIndividualProfileSnapShots = yield (0, individualProfileService_1.getAllIndividualProfileSnapShotsService)();
        res.status(200).json({
            individualProfilesSnapshots: allIndividualProfileSnapShots,
        });
    }
    catch (err) {
        console.error("could not get snapshots for all departments ", err);
        res.status(500).json({
            individualProfilesSnapshots: null,
            message: "could not fetch all department snapshots",
        });
    }
});
exports.getAllIndividualProfileSnapShots = getAllIndividualProfileSnapShots;
const getIndividualProfileSnapShotsByProfileIds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { profile_ids } = createIndividualProfileValidator_1.profileIdListValidator.parse(req.body);
        const allIndividualProfileSnapShots = yield (0, individualProfileService_1.getIndividualProfileSnapShotsByProfileIdsService)(profile_ids);
        res.status(200).json({
            individualProfilesSnapshots: allIndividualProfileSnapShots,
        });
    }
    catch (err) {
        console.error("could not get snapshots by profile_ids ", err);
        if (err instanceof zod_1.ZodError) {
            res.status(400).json({
                individualProfilesSnapshots: null,
                message: "Bad request",
                error: err.errors,
            });
            return;
        }
        res.status(500).json({
            individualProfilesSnapshots: null,
            message: "could not get snapshots by profile_ids",
        });
    }
});
exports.getIndividualProfileSnapShotsByProfileIds = getIndividualProfileSnapShotsByProfileIds;
const clearIndivdualSnapshotsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { profile_id } = createIndividualProfileValidator_1.profileIdValidator.parse(req.body);
        const clearedIndividualProfileSnapShots = yield (0, individualProfileService_1.clearIndividualSnapshotByIdService)(profile_id);
        res.status(201).json({
            message: "Individual profile snapshots cleared successfully.",
            data: clearedIndividualProfileSnapShots,
        });
    }
    catch (err) {
        console.error("could not clear snapshots for individualProfile", err);
        if (err instanceof zod_1.ZodError) {
            res.status(400).json({
                individualProfilesSnapshots: null,
                message: "Bad request",
                error: err.errors,
            });
            return;
        }
        res.status(500).json({
            individualProfilesSnapshots: null,
            message: "could not clear all individual profile snapshots",
        });
    }
});
exports.clearIndivdualSnapshotsById = clearIndivdualSnapshotsById;
