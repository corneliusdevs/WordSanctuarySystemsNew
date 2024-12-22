import { mongoDbClient, postgresClient } from "../db_connections/prismaClients";


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
