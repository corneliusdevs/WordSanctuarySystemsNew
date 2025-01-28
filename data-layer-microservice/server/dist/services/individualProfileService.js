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
exports.clearIndividualSnapshotByIdService = exports.saveIndividualProfileByIdService = exports.getIndividualProfileSnapShotsByProfileIdsService = exports.getIndividualProfilesById = exports.getAllIndividualProfileSnapShotsService = void 0;
const snapshotsValidators_1 = require("../controllers/validators/snapshotsValidators");
const prismaClients_1 = require("../db_connections/prismaClients");
const departmentService_1 = require("./departmentService");
const uuid_1 = require("uuid");
const getAllIndividualProfileSnapShotsService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allIndividualProfileSnapShots = yield prismaClients_1.mongoDbClient.individualProfileSnapShots.findMany();
        return allIndividualProfileSnapShots;
    }
    catch (err) {
        console.error("could not fetch all individual profiles snapshots ", err);
        return null;
    }
});
exports.getAllIndividualProfileSnapShotsService = getAllIndividualProfileSnapShotsService;
const getIndividualProfilesById = (profile_ids_of_individuals) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allIndividualProfileSnapShots = yield prismaClients_1.postgresClient.profiles.findMany({
            where: {
                profile_id: {
                    in: profile_ids_of_individuals
                }
            }
        });
        return allIndividualProfileSnapShots;
    }
    catch (err) {
        console.error("could not fetch all individual profiles ", err);
        return null;
    }
});
exports.getIndividualProfilesById = getIndividualProfilesById;
const getIndividualProfileSnapShotsByProfileIdsService = (profile_ids_of_members_in_department) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allIndividualProfileSnapShots = yield prismaClients_1.mongoDbClient.individualProfileSnapShots.findMany({
            where: {
                profile_id: {
                    in: profile_ids_of_members_in_department
                }
            }
        });
        return allIndividualProfileSnapShots;
    }
    catch (err) {
        console.error("could not fetch all individual profiles snapshots ", err);
        return null;
    }
});
exports.getIndividualProfileSnapShotsByProfileIdsService = getIndividualProfileSnapShotsByProfileIdsService;
const saveIndividualProfileByIdService = (profile_Ids) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get the membersProfileSnapshotsData
        const membersProfiles = (yield (0, departmentService_1.getDeptMembersProfileDetailsService)(profile_Ids)).data;
        console.log("profile snaphot data ", membersProfiles);
        for (let i = 0; i < membersProfiles.length; i++) {
            if (typeof membersProfiles[i].profile_id === "string") {
                // find the existing snapshot history of that individual
                const existingSnapShotHistory = yield prismaClients_1.mongoDbClient.individualProfileSnapShots.findUnique({
                    where: {
                        profile_id: membersProfiles[i].profile_id,
                    },
                });
                console.log("existing snapshot history ", existingSnapShotHistory);
                const newSnapShotData = Object.assign(Object.assign({}, membersProfiles[i]), { snapShotDate: Date.now(), snapShotId: (0, uuid_1.v4)() });
                if (existingSnapShotHistory) {
                    // parse the existingSnapShotHistory to make sure it is of the expected type
                    const parsedExistingSnapShotHistory = snapshotsValidators_1.IndividualProfilesSnapshotValidator.parse(existingSnapShotHistory);
                    // update the profile snapshot history
                    const updatedProfileSnapshotHistory = yield prismaClients_1.mongoDbClient.individualProfileSnapShots.update({
                        where: {
                            profile_id: membersProfiles[i].profile_id,
                        },
                        data: {
                            snapshots: [
                                ...parsedExistingSnapShotHistory.snapshots,
                                newSnapShotData,
                            ],
                        },
                    });
                    console.log("updated snapshot ", updatedProfileSnapshotHistory);
                }
                else {
                    // meaning the snaphot of that individual's profile does not exist, we then create the snapshot
                    const createdProfileSnapShot = yield prismaClients_1.mongoDbClient.individualProfileSnapShots.create({
                        data: {
                            profile_id: newSnapShotData.profile_id,
                            snapshots: [newSnapShotData],
                        },
                    });
                    console.log("created snapshot", createdProfileSnapShot);
                }
            }
        }
        return {
            success: true,
            message: "profile snapshots created successfully",
        };
    }
    catch (err) {
        console.error("could not create profile snapshots. Please try again later ", err);
        return {
            success: false,
            errorMessage: "could not create profile snapshots. Please try again later",
            error: err,
        };
    }
});
exports.saveIndividualProfileByIdService = saveIndividualProfileByIdService;
const clearIndividualSnapshotByIdService = (profile_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clearedIndividualProfileSnapshot = yield prismaClients_1.mongoDbClient.individualProfileSnapShots.update({
            where: {
                profile_id: profile_id,
            },
            data: {
                snapshots: [],
            },
        });
        return {
            success: true,
            data: clearedIndividualProfileSnapshot,
        };
    }
    catch (err) {
        console.error(`could not clear snapshots of individual profile with id : ${profile_id}`);
        return {
            success: false,
            data: null,
            error: err,
        };
    }
});
exports.clearIndividualSnapshotByIdService = clearIndividualSnapshotByIdService;
