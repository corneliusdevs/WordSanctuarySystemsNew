import { JsonValue } from "@prisma/client/runtime/library";
import { mongoDbClient, postgresClient } from "../db_connections/prismaClients";
import { v4 as uuidv4 } from "uuid";
import {
  DepartmentMemberArrayValidator,
  DepartmentSnapshotValidator,
} from "../controllers/validators/createDepartmentProfileValidator";
import { IndividualProfilesSnapshotValidator } from "../controllers/validators/snapshotsValidators";
import * as z from "zod";
import { getIndividualProfilesById } from "./individualProfileService";
import {
  CalculatedKpiResults,
  DepartmentKpiParameters,
  SavedKpiResultsTypeSchema,
} from "../types/mongodb_types";
import { ZodError } from "zod";

type DepartmentProfile = {
  department_id: string;
  department_name: string;
  finance_id: string;
  department_type: string;
  description: string;
  members: JsonValue;
  dues_paid_per_individual: JsonValue;
  createdAt: Date;
  modifiedAt: Date;
  installation_id: string;
  centrals: string[];
};

export const getDepartmentProfileByIdService = async (
  department_id: string
): Promise<DepartmentProfile | null> => {
  try {
    const profile = await postgresClient.departments.findUnique({
      where: {
        department_id: department_id,
      },
    });

    return profile;
  } catch (err) {
    console.log(`could not get department profile with Id ${department_id}`);

    // return null
    return null;
  }
};

export const getDeptAndDepartmentMembersProfilesByIdService = async (
  department_id: string
) => {
  try {
    const departmentProfile = await postgresClient.departments.findUnique({
      where: {
        department_id: department_id,
      },
    });

    const parsedDeptMembers = DepartmentMemberArrayValidator.parse(
      departmentProfile?.members
    );

    const profile_Ids = parsedDeptMembers.map((member) => member.profile_id);

    const membersProfiles = (
      await getDeptMembersProfileDetailsService(profile_Ids)
    ).data;

    return {
      department_profile: departmentProfile,
      members_profiles: membersProfiles,
    };
  } catch (err) {
    console.log(`getDeptAndDepartmentMembersProfilesByIdService encountered an error white fetching dept with Id ${department_id}`);

    return null;
  }
};

const updateDepartmentMemberDetails = (
  outdated_members_list: z.infer<typeof DepartmentMemberArrayValidator>,
  current_details_of_members: Awaited<
    ReturnType<typeof getIndividualProfilesById>
  >
) => {
  if (outdated_members_list?.length === current_details_of_members?.length) {
    const updatedList = outdated_members_list.map((old_member_details) => {
      const current_member_details = current_details_of_members.filter(
        (member) => member.profile_id === old_member_details.profile_id
      );
      return {
        ...old_member_details,
        leaderShipLevel: current_member_details[0].leadership_level,
      };
    });

    console.log(
      "update leadershp level ran ",
      outdated_members_list,
      current_details_of_members
    );
    return updatedList;
  } else {
    console.log(
      "refused to execute if statement ",
      outdated_members_list,
      current_details_of_members
    );
    return outdated_members_list;
  }
};

export const saveDepartmentSnapshotByIdService = async (
  departmentProfile: DepartmentProfile | null
) => {
  try {
    if (departmentProfile) {
      // parse the department members profile
      const parsedDepartmentMembersList = DepartmentMemberArrayValidator.parse(
        departmentProfile.members
      );

      const profile_id_list_of_members = parsedDepartmentMembersList.map(
        (member) => member.profile_id
      );

      // get the most up to date information about the leadership level of every member in the department
      const memberProfiles = await getIndividualProfilesById(
        profile_id_list_of_members
      );

      // update the members details to reflect this change
      const updated_members_details = updateDepartmentMemberDetails(
        parsedDepartmentMembersList,
        memberProfiles
      );

      //  check if snapshot is in database
      const existingSnapShotList =
        await mongoDbClient.departmentalSnapShots.findUnique({
          where: {
            department_id: departmentProfile?.department_id,
          },
        });

      // create snapShot data
      const snapShotData = {
        ...departmentProfile,
        members: updated_members_details,
        snapShotDate: Date.now(),
        snapShotId: uuidv4(),
      };

      if (existingSnapShotList) {
        const parsedExistingSnapShot =
          DepartmentSnapshotValidator.parse(existingSnapShotList);

        const updatedSnapShot =
          await mongoDbClient.departmentalSnapShots.update({
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
      } else {
        // if a snapShotList for that department does not exist, create one and add the snapShot to the list

        const newSnapShotList =
          await mongoDbClient.departmentalSnapShots.create({
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
  } catch (err) {
    console.error("Error saving department snapshot:", err);

    // Return an error response
    return {
      success: false,
      message: "An error occurred while saving the department snapshot.",
      error: err,
    };
  }
};

export const createDepartmentSnapshotByIdService = async (
  department_id: string
) => {
  try {
    const departmentProfile = await getDepartmentProfileByIdService(
      department_id
    );

    // create the snapshot
    const departmentSnapshot = await saveDepartmentSnapshotByIdService(
      departmentProfile
    );

    return departmentSnapshot;
  } catch (err) {
    console.error("could not create department snapshot: ", err);

    return {
      success: false,
      message: "An error occurred while crreating the department snapshot.",
      error: err,
    };
  }
};

export const getDeptMembersProfileDetailsService = async (
  memberProfileIds: string[]
) => {
  console.log("profile id list ", memberProfileIds);
  try {
    const membersProfile = await postgresClient.profiles.findMany({
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
  } catch (err) {
    console.error(
      "could not fetch profiles of members in department from getDeptMemberProfileDetails service"
    );

    return {
      success: false,
      data: [],
      error: err,
      errorMessage: "could not fetch profiles of members in department from",
    };
  }
};

export const saveDepartmentMembersProfileSnapShotsService = async (
  departmentMembers: JsonValue | undefined
) => {
  try {
    // parse the input to make sure it is of the expected shape
    console.log("executing, savev embers ", departmentMembers);
    const parsedDeptMembers =
      DepartmentMemberArrayValidator.parse(departmentMembers);

    const profile_Ids = parsedDeptMembers.map((member) => member.profile_id);

    // get the membersProfileSnapshotsData
    const membersProfiles = (
      await getDeptMembersProfileDetailsService(profile_Ids)
    ).data;

    console.log("profilev snaphot data ", membersProfiles);

    for (let i = 0; i < membersProfiles.length; i++) {
      if (typeof membersProfiles[i].profile_id === "string") {
        // find the existing snapshot history of that individual
        const existingSnapShotHistory =
          await mongoDbClient.individualProfileSnapShots.findUnique({
            where: {
              profile_id: membersProfiles[i].profile_id,
            },
          });

        console.log("existing snapshot history ", existingSnapShotHistory);

        const newSnapShotData = {
          ...membersProfiles[i],
          snapShotDate: Date.now(),
          snapShotId: uuidv4(),
        };

        if (existingSnapShotHistory) {
          // parse the existingSnapShotHistory to make sure it is of the expected type
          const parsedExistingSnapShotHistory =
            IndividualProfilesSnapshotValidator.parse(existingSnapShotHistory);

          // update the profile snapshot history
          const updatedProfileSnapshotHistory =
            await mongoDbClient.individualProfileSnapShots.update({
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
        } else {
          // meaning the snaphot of that individual's profile does not exist, we then create the snapshot

          const createdProfileSnapShot =
            await mongoDbClient.individualProfileSnapShots.create({
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
  } catch (err) {
    console.error(
      "could not create profile snapshots. Please try again later ",
      err
    );

    return {
      success: false,
      errorMessage:
        "could not create profile snapshots. Please try again later",
      error: err,
    };
  }
};

export const getAllDepartmentsSnapShotsService = async () => {
  try {
    const allDepartmentsSnapShots =
      await mongoDbClient.departmentalSnapShots.findMany();

    return allDepartmentsSnapShots;
  } catch (err) {
    console.error("could not fetch department snapshots ", err);
  }
};

export const clearDepartmentSnapshotService = async (department_id: string) => {
  try {
    const clearedDepartmentSnapshot =
      await mongoDbClient.departmentalSnapShots.update({
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
  } catch (err) {
    console.error(
      `could not clear snapshots of departments with id : ${department_id}`
    );

    return {
      success: false,
      data: null,
      error: err,
    };
  }
};

export const getDepartmentKpiResultByIdService = async (
  department_id: string
) => {
  try {
    const kpi = await mongoDbClient.departmentalKpiResults.findUnique({
      where: {
        department_id: department_id,
      },
    });

    return kpi;
  } catch (err) {
    console.log(`error fetching department kpi `, err);
  }
  return null;
};

export const saveDepartmentKpiResultService = async (
  kpi_parameters: DepartmentKpiParameters,
  kpi_results: CalculatedKpiResults
) => {
  try {
    const existing_result_profile =
      await mongoDbClient.departmentalKpiResults.findUnique({
        where: {
          department_id: kpi_parameters.department_id,
        },
      });

    if (existing_result_profile) {
      const parsedExistingResultsProfile = SavedKpiResultsTypeSchema.parse(
        existing_result_profile
      );

      const savedResult = await mongoDbClient.departmentalKpiResults.update({
        where: {
          department_id: kpi_parameters.department_id,
        },
        data: {
          kpis: [...parsedExistingResultsProfile.kpis],
        },
      });

      return savedResult;
    } else {
      const savedResult = await mongoDbClient.departmentalKpiResults.create({
        data: {
          department_id: kpi_parameters.department_id,
          kpis: [
            {
              result_id: uuidv4(), // create a unique identifier for each result in the results array
              results: kpi_results,
              parameters: kpi_parameters,
              result_date: Date.now(),
            },
          ],
        },
      });

      return savedResult;
    }
  } catch (err) {
    if (err instanceof ZodError) {
      console.log(`validaton error `, err.errors);
      return null;
    }

    return null;
  }
};

export const addDepartmentToMembersProfilesService = async (
  profile_Ids: string[],
  department_id: string
) => {
  try {
    // get the membersProfileSnapshotsData
    const membersProfiles = (
      await getDeptMembersProfileDetailsService(profile_Ids)
    ).data;

    // add the department to the member's profile
    for (let i = 0; i < membersProfiles.length; i++) {
      if (typeof membersProfiles[i].profile_id === "string") {
        // find the existing profile  o that individual
        const existingProfile = await postgresClient.profiles.findUnique({
          where: {
            profile_id: membersProfiles[i].profile_id,
          },
        });

        // make sure the member is not yet in the department before adding the member
        if (
          existingProfile &&
          existingProfile.departments.includes(department_id) === false
        ) {
          // filter out none values
          const filteredDepartments = existingProfile.departments.filter(
            (dept) => dept !== "none"
          );

          // update the profile
          const updatedProfile = await postgresClient.profiles.update({
            where: {
              profile_id: existingProfile.profile_id,
            },
            data: {
              departments: [...filteredDepartments, department_id],
            },
          });

          console.log(
            "department added to member's profile ",
            department_id,
            existingProfile.profile_id
          );
        }
      }
    }

    return {
      success: true,
      message: "department added to members profile",
    };
  } catch (err) {
    console.error(
      "could not add department to members profile. Please try again later ",
      err
    );

    return {
      success: false,
      errorMessage:
        "could not add department to members profile. Please try again later",
      error: err,
    };
  }
};
