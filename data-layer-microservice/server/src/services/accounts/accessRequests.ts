import { AccessRequestFormType } from "../../controllers/validators/accounts/accessRequestValidator";
import { mongoDbClient } from "../../db_connections/prismaClients";

export const saveAccessRequestService = async (
  accessRequestDetails: AccessRequestFormType
) => {
  try {
    const savedRequest = await mongoDbClient.accessRequests.create({
      data: {
        ...accessRequestDetails,
        status: "PENDING",
        processed_by_profile_id: "UNKNOWN",
      },
    });

    return savedRequest;
  } catch (err) {
    console.log("saveAccessRequestService encountered an error ", err);
    return null;
  }
};

export const getAllAccessRequestsService = async () => {
  try {
    const accessRequests = await mongoDbClient.accessRequests.findMany()
    return accessRequests
  } catch (err) {
    console.log(`getAllAccessRequestsService encountered an error`, err)
  }
};
