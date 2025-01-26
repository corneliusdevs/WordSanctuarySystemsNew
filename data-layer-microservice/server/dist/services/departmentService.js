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
exports.addDepartmentToMembersProfilesService = exports.saveDepartmentKpiResultService = exports.getDepartmentKpiResultByIdService = exports.clearDepartmentSnapshotService = exports.getAllDepartmentsSnapShotsService = exports.saveDepartmentMembersProfileSnapShotsService = exports.getDeptMembersProfileDetailsService = exports.createDepartmentSnapshotByIdService = exports.saveDepartmentSnapshotByIdService = exports.getDepartmentProfileByIdService = void 0;
const prismaClients_1 = require("../db_connections/prismaClients");
const uuid_1 = require("uuid");
const createDepartmentProfileValidator_1 = require("../controllers/validators/createDepartmentProfileValidator");
const snapshotsValidators_1 = require("../controllers/validators/snapshotsValidators");
const individualProfileService_1 = require("./individualProfileService");
const mongodb_types_1 = require("../types/mongodb_types");
const zod_1 = require("zod");
const getDepartmentProfileByIdService = (department_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profile = yield prismaClients_1.postgresClient.departments.findUnique({
            where: {
                department_id: department_id,
            },
        });
        return profile;
    }
    catch (err) {
        console.log(`could not get department profile with Id ${department_id}`);
        // return null
        return null;
    }
});
exports.getDepartmentProfileByIdService = getDepartmentProfileByIdService;
const updateDepartmentMemberDetails = (outdated_members_list, current_details_of_members) => {
    if ((outdated_members_list === null || outdated_members_list === void 0 ? void 0 : outdated_members_list.length) === (current_details_of_members === null || current_details_of_members === void 0 ? void 0 : current_details_of_members.length)) {
        const updatedList = outdated_members_list.map((old_member_details) => {
            const current_member_details = current_details_of_members.filter((member) => member.profile_id === old_member_details.profile_id);
            return Object.assign(Object.assign({}, old_member_details), { leaderShipLevel: current_member_details[0].leadership_level });
        });
        console.log("update leadershp level ran ", outdated_members_list, current_details_of_members);
        return updatedList;
    }
    else {
        console.log("refused to execute if statement ", outdated_members_list, current_details_of_members);
        return outdated_members_list;
    }
};
const saveDepartmentSnapshotByIdService = (departmentProfile) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (departmentProfile) {
            // parse the department members profile
            const parsedDepartmentMembersList = createDepartmentProfileValidator_1.DepartmentMemberArrayValidator.parse(departmentProfile.members);
            const profile_id_list_of_members = parsedDepartmentMembersList.map((member) => member.profile_id);
            // get the most up to date information about the leadership level of every member in the department
            const memberProfiles = yield (0, individualProfileService_1.getIndividualProfilesById)(profile_id_list_of_members);
            // update the members details to reflect this change
            const updated_members_details = updateDepartmentMemberDetails(parsedDepartmentMembersList, memberProfiles);
            //  check if snapshot is in database
            const existingSnapShotList = yield prismaClients_1.mongoDbClient.departmentalSnapShots.findUnique({
                where: {
                    department_id: departmentProfile === null || departmentProfile === void 0 ? void 0 : departmentProfile.department_id,
                },
            });
            // create snapShot data
            const snapShotData = Object.assign(Object.assign({}, departmentProfile), { members: updated_members_details, snapShotDate: Date.now(), snapShotId: (0, uuid_1.v4)() });
            if (existingSnapShotList) {
                const parsedExistingSnapShot = createDepartmentProfileValidator_1.DepartmentSnapshotValidator.parse(existingSnapShotList);
                const updatedSnapShot = yield prismaClients_1.mongoDbClient.departmentalSnapShots.update({
                    where: {
                        department_id: parsedExistingSnapShot.department_id,
                    },
                    data: {
                        snapshots: [...parsedExistingSnapShot.snapshots, snapShotData],
                    },
                });
                return {
                    success: true,
                    data: updatedSnapShot,
                };
            }
            else {
                // if a snapShotList for that department does not exist, create one and add the snapShot to the list
                const newSnapShotList = yield prismaClients_1.mongoDbClient.departmentalSnapShots.create({
                    data: {
                        department_id: departmentProfile.department_id,
                        snapshots: [snapShotData],
                    },
                });
                // more checks needed for the code to enforce type safety
                return {
                    success: true,
                    data: newSnapShotList,
                };
            }
        }
        // if we do not have a valid departent profile
        return {
            success: false,
            data: null,
        };
    }
    catch (err) {
        console.error("Error saving department snapshot:", err);
        // Return an error response
        return {
            success: false,
            message: "An error occurred while saving the department snapshot.",
            error: err,
        };
    }
});
exports.saveDepartmentSnapshotByIdService = saveDepartmentSnapshotByIdService;
const createDepartmentSnapshotByIdService = (department_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const departmentProfile = yield (0, exports.getDepartmentProfileByIdService)(department_id);
        // create the snapshot
        const departmentSnapshot = yield (0, exports.saveDepartmentSnapshotByIdService)(departmentProfile);
        return departmentSnapshot;
    }
    catch (err) {
        console.error("could not create department snapshot: ", err);
        return {
            success: false,
            message: "An error occurred while crreating the department snapshot.",
            error: err,
        };
    }
});
exports.createDepartmentSnapshotByIdService = createDepartmentSnapshotByIdService;
const getDeptMembersProfileDetailsService = (memberProfileIds) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("profile id list ", memberProfileIds);
    try {
        const membersProfile = yield prismaClients_1.postgresClient.profiles.findMany({
            where: {
                profile_id: {
                    in: memberProfileIds,
                },
            },
        });
        return {
            success: true,
            data: membersProfile,
        };
    }
    catch (err) {
        console.error("could not fetch profiles of members in department from getDeptMemberProfileDetails service");
        return {
            success: false,
            data: [],
            error: err,
            errorMessage: "could not fetch profiles of members in department from",
        };
    }
});
exports.getDeptMembersProfileDetailsService = getDeptMembersProfileDetailsService;
const saveDepartmentMembersProfileSnapShotsService = (departmentMembers) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // parse the input to make sure it is of the expected shape
        console.log("executing, savev embers ", departmentMembers);
        const parsedDeptMembers = createDepartmentProfileValidator_1.DepartmentMemberArrayValidator.parse(departmentMembers);
        const profile_Ids = parsedDeptMembers.map((member) => member.profile_id);
        // get the membersProfileSnapshotsData
        const membersProfiles = (yield (0, exports.getDeptMembersProfileDetailsService)(profile_Ids)).data;
        console.log("profilev snaphot data ", membersProfiles);
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
exports.saveDepartmentMembersProfileSnapShotsService = saveDepartmentMembersProfileSnapShotsService;
const getAllDepartmentsSnapShotsService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allDepartmentsSnapShots = yield prismaClients_1.mongoDbClient.departmentalSnapShots.findMany();
        return allDepartmentsSnapShots;
    }
    catch (err) {
        console.error("could not fetch department snapshots ", err);
    }
});
exports.getAllDepartmentsSnapShotsService = getAllDepartmentsSnapShotsService;
const clearDepartmentSnapshotService = (department_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clearedDepartmentSnapshot = yield prismaClients_1.mongoDbClient.departmentalSnapShots.update({
            where: {
                department_id: department_id,
            },
            data: {
                snapshots: [],
            },
        });
        return {
            success: true,
            data: clearedDepartmentSnapshot,
        };
    }
    catch (err) {
        console.error(`could not clear snapshots of departments with id : ${department_id}`);
        return {
            success: false,
            data: null,
            error: err,
        };
    }
});
exports.clearDepartmentSnapshotService = clearDepartmentSnapshotService;
const getDepartmentKpiResultByIdService = (department_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const kpi = yield prismaClients_1.mongoDbClient.departmentalKpiResults.findUnique({
            where: {
                department_id: department_id
            }
        });
        return kpi;
    }
    catch (err) {
        console.log(`error fetching department kpi `, err);
    }
    return null;
});
exports.getDepartmentKpiResultByIdService = getDepartmentKpiResultByIdService;
const saveDepartmentKpiResultService = (kpi_parameters, kpi_results) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existing_result_profile = yield prismaClients_1.mongoDbClient.departmentalKpiResults.findUnique({
            where: {
                department_id: kpi_parameters.department_id,
            },
        });
        if (existing_result_profile) {
            const parsedExistingResultsProfile = mongodb_types_1.SavedKpiResultsTypeSchema.parse(existing_result_profile);
            const savedResult = yield prismaClients_1.mongoDbClient.departmentalKpiResults.update({
                where: {
                    department_id: kpi_parameters.department_id
                },
                data: {
                    kpis: [
                        ...parsedExistingResultsProfile.kpis
                    ]
                }
            });
            return savedResult;
        }
        else {
            const savedResult = yield prismaClients_1.mongoDbClient.departmentalKpiResults.create({
                data: {
                    department_id: kpi_parameters.department_id,
                    kpis: [
                        {
                            result_id: (0, uuid_1.v4)(), // create a unique identifier for each result in the results array
                            results: kpi_results,
                            parameters: kpi_parameters,
                            result_date: Date.now(),
                        },
                    ],
                },
            });
            return savedResult;
        }
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            console.log(`validaton error `, err.errors);
            return null;
        }
        return null;
    }
});
exports.saveDepartmentKpiResultService = saveDepartmentKpiResultService;
const addDepartmentToMembersProfilesService = (profile_Ids, department_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get the membersProfileSnapshotsData
        const membersProfiles = (yield (0, exports.getDeptMembersProfileDetailsService)(profile_Ids)).data;
        // add the department to the member's profile
        for (let i = 0; i < membersProfiles.length; i++) {
            if (typeof membersProfiles[i].profile_id === "string") {
                // find the existing profile  o that individual
                const existingProfile = yield prismaClients_1.postgresClient.profiles.findUnique({
                    where: {
                        profile_id: membersProfiles[i].profile_id,
                    },
                });
                // make sure the member is not yet in the department before adding the member
                if (existingProfile && existingProfile.departments.includes(department_id) === false) {
                    // filter out none values
                    const filteredDepartments = existingProfile.departments.filter(dept => dept !== "none");
                    // update the profile
                    const updatedProfile = yield prismaClients_1.postgresClient.profiles.update({
                        where: {
                            profile_id: existingProfile.profile_id
                        },
                        data: {
                            departments: [...filteredDepartments, department_id]
                        }
                    });
                    console.log("department added to member's profile ", department_id, existingProfile.profile_id);
                }
            }
        }
        return {
            success: true,
            message: "department added to members profile",
        };
    }
    catch (err) {
        console.error("could not add department to members profile. Please try again later ", err);
        return {
            success: false,
            errorMessage: "could not add department to members profile. Please try again later",
            error: err,
        };
    }
});
exports.addDepartmentToMembersProfilesService = addDepartmentToMembersProfilesService;
