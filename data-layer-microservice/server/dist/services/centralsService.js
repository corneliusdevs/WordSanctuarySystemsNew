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
exports.addCentralToDepartmentsProfilesService = exports.getDeptProfileDetailsService = void 0;
const prismaClients_1 = require("../db_connections/prismaClients");
const getDeptProfileDetailsService = (departmentProfileIds) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("profile id list ", departmentProfileIds);
    try {
        const membersProfile = yield prismaClients_1.postgresClient.departments.findMany({
            where: {
                department_id: {
                    in: departmentProfileIds,
                },
            },
        });
        return {
            success: true,
            data: membersProfile,
        };
    }
    catch (err) {
        console.error("could not fetch profiles of departments  from getDeptProfileDetailsService service");
        return {
            success: false,
            data: [],
            error: err,
            errorMessage: "could not fetch profiles of  departments",
        };
    }
});
exports.getDeptProfileDetailsService = getDeptProfileDetailsService;
const addCentralToDepartmentsProfilesService = (departmentIds, central_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get the department profiles
        const departmentProfiles = (yield (0, exports.getDeptProfileDetailsService)(departmentIds)).data;
        // add the central to the departments' profile
        for (let i = 0; i < departmentProfiles.length; i++) {
            if (typeof departmentProfiles[i].department_id === "string") {
                // find the existing profile  of that department
                const existingProfile = yield prismaClients_1.postgresClient.departments.findUnique({
                    where: {
                        department_id: departmentProfiles[i].department_id,
                    },
                });
                // make sure the central_id is not yet in the department before adding the central
                if (existingProfile && existingProfile.centrals.includes(central_id) === false) {
                    // filter out none values
                    const filteredDepartments = existingProfile.centrals.filter(id => id !== "none");
                    // update the profile
                    const updatedProfile = yield prismaClients_1.postgresClient.departments.update({
                        where: {
                            department_id: existingProfile.department_id
                        },
                        data: {
                            centrals: [...filteredDepartments, central_id]
                        }
                    });
                    console.log("central added to department's profile ", central_id, existingProfile.department_id);
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
exports.addCentralToDepartmentsProfilesService = addCentralToDepartmentsProfilesService;
