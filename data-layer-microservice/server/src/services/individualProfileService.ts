import { IndividualProfilesSnapshotValidator } from "../controllers/validators/snapshotsValidators";
import { mongoDbClient, postgresClient } from "../db_connections/prismaClients";
import { getDeptMembersProfileDetailsService } from "./departmentService";
import { v4 as uuidv4 } from "uuid"

export const getAllIndividualProfileSnapShotsService = async () => {
  try {
    const allIndividualProfileSnapShots =
      await mongoDbClient.individualProfileSnapShots.findMany();

    return allIndividualProfileSnapShots;
  } catch (err) {
    console.error("could not fetch all individual profiles snapshots ", err);
    return null
  }
};


export const getIndividualProfilesById = async (profile_ids_of_individuals: string[])=>{
  try {
    const allIndividualProfileSnapShots = await postgresClient.profiles.findMany({
      where: {
        profile_id: {
          in: profile_ids_of_individuals
        }
      }
    })

    return allIndividualProfileSnapShots
 }catch(err){
    console.error("could not fetch all individual profiles ", err)
    return null 
 }
}

export const getIndividualProfileSnapShotsByProfileIdsService = async (profile_ids_of_members_in_department: string[])=>{
  try {
      const allIndividualProfileSnapShots = await mongoDbClient.individualProfileSnapShots.findMany({
        where: {
          profile_id: {
            in: profile_ids_of_members_in_department
          }
        }
      })
  
      return allIndividualProfileSnapShots
   }catch(err){
      console.error("could not fetch all individual profiles snapshots ", err)
      return null 
   }
}

export const saveIndividualProfileByIdService = async (
  profile_Ids: string[]
) => {
  try {

    // get the membersProfileSnapshotsData
    const membersProfiles = (
      await getDeptMembersProfileDetailsService(profile_Ids)
    ).data;

    console.log("profile snaphot data ", membersProfiles);

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

export const clearIndividualSnapshotByIdService = async (
  profile_id: string
) => {
  try {
    const clearedIndividualProfileSnapshot =
      await mongoDbClient.individualProfileSnapShots.update({
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
  } catch (err) {
    console.error(
      `could not clear snapshots of individual profile with id : ${profile_id}`
    );

    return {
      success: false,
      data: null,
      error: err,
    };
  }
};
