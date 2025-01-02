import { postgresClient } from "../db_connections/prismaClients";

export const getDeptProfileDetailsService = async (
  departmentProfileIds: string[]
) => {
  console.log("profile id list ", departmentProfileIds);
  try {
    const membersProfile = await postgresClient.departments.findMany({
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
  } catch (err) {
    console.error(
      "could not fetch profiles of departments  from getDeptProfileDetailsService service"
    );

    return {
      success: false,
      data: [],
      error: err,
      errorMessage: "could not fetch profiles of  departments",
    };
  }
};

export const addCentralToDepartmentsProfilesService = async (
  departmentIds: string[], central_id:string
) => {
  try {

    // get the department profiles
    const departmentProfiles = (
      await getDeptProfileDetailsService(departmentIds)
    ).data;


    // add the central to the departments' profile
    for (let i = 0; i < departmentProfiles.length; i++) {
      if (typeof departmentProfiles[i].department_id === "string") {
        // find the existing profile  of that department
        const existingProfile =
          await postgresClient.departments.findUnique({
            where: {
              department_id: departmentProfiles[i].department_id,
            },
          });


          // make sure the central_id is not yet in the department before adding the central
        if (existingProfile && existingProfile.centrals.includes(central_id) === false) {

          // filter out none values
          const filteredDepartments = existingProfile.centrals.filter(id => id !== "none")  

          // update the profile
          const updatedProfile = await postgresClient.departments.update({
            where: {
              department_id: existingProfile.department_id
            },
            data: {
              centrals: [...filteredDepartments, central_id]
            }
          })

          console.log("central added to department's profile ", central_id, existingProfile.department_id)
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