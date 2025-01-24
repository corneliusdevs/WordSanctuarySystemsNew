import {Request, Response} from "express"
import { CreateInstallationProfileSchema, InstallationIdValidator, UpdateInstallationProfileSchema } from "../validators/createInstallationValidators";
import { get_Data_Layer_POSTGRESS_Api_Endpoint } from "../helpers/getDataLayerAPI_endpoint";
import { ZodError } from "zod";

export const createInstallationsProfile = async (
  req: Request,
  res: Response
) => {
  try {
    const parsedBody = CreateInstallationProfileSchema.parse(req.body);

    const data_Layer_Base_Api_Endpoint = get_Data_Layer_POSTGRESS_Api_Endpoint();
    
    console.log("endpoint ", data_Layer_Base_Api_Endpoint);

    const createProfileResponse = await fetch(
      `${data_Layer_Base_Api_Endpoint}/profiles/installations/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...parsedBody
        }),
      }

    );

    const response = await createProfileResponse.json()

    
    console.log("create installation controller response", response.message, )

    if (createProfileResponse.ok) {

      res.status(201).json({
        success: true,
        message: "Installation created",
      });

      return;
    }

    res.status(400).json({
      success: false,
      message: response?.message ? response.message : "Could not send create Installation. Please try again later.",
    });
  } catch (err) {
    console.log(`createInstallation controller encountered an err`, err);

    if (err instanceof ZodError) {
      res.status(400).json({
        success: false,
        message: "Bad request",
        error: err.errors,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Internal Server error. Please try again later.",
    });

    return;
  }
};

//Update Installations
export const updateInstallationsProfile = async (
  req: Request,
  res: Response
) => {
  try {
    const parsedBody = UpdateInstallationProfileSchema.parse(req.body);

    const data_Layer_Base_Api_Endpoint = get_Data_Layer_POSTGRESS_Api_Endpoint();
    
    console.log("endpoint ", data_Layer_Base_Api_Endpoint);

    const updateProfileResponse = await fetch(
      `${data_Layer_Base_Api_Endpoint}/profiles/installations/update`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...parsedBody
        }),
      }

    );

    const response = await updateProfileResponse.json()

    
    console.log("update installation controller response", response.message, )

    if (updateProfileResponse.ok) {

      res.status(201).json({
        success: true,
        message: "Installation created",
      });

      return;
    }

    res.status(400).json({
      success: false,
      message: response?.message ? response.message : "Could not send update Installation. Please try again later.",
    });
  } catch (err) {
    console.log(`updateInstallation controller encountered an err`, err);

    if (err instanceof ZodError) {
      res.status(400).json({
        success: false,
        message: "Bad request",
        error: err.errors,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Internal Server error. Please try again later.",
    });

    return;
  }
};

// Get Installations by Id
export const getInstallationsProfileById = async (
  req: Request,
  res: Response
) => {
  try {
    const parsedBody = InstallationIdValidator.parse(req.body);

    const data_Layer_Base_Api_Endpoint = get_Data_Layer_POSTGRESS_Api_Endpoint();
    
    console.log("endpoint ", data_Layer_Base_Api_Endpoint);

    const getInstallationsProfileByIdResponse = await fetch(
      `${data_Layer_Base_Api_Endpoint}/profiles/installations/fetch/:installationId`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...parsedBody
        }),
      }

    );

    const response = await getInstallationsProfileByIdResponse.json()

    
    console.log("get installation controller response", response.message, )

    if (getInstallationsProfileByIdResponse.ok) {

      res.status(201).json({
        success: true,
        message: "Installation Retrieved",
      });

      return;
    }

    res.status(400).json({
      success: false,
      message: response?.message ? response.message : "Could not send get Installation. Please try again later.",
    });
  } catch (err) {
    console.log(`getInstallation controller encountered an err`, err);

    if (err instanceof ZodError) {
      res.status(400).json({
        success: false,
        message: "Bad request",
        error: err.errors,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Internal Server error. Please try again later.",
    });

    return;
  }
};

//Delete Installation
export const deleteInstallationsProfileById = async (
  req: Request,
  res: Response
) => {
  try {
    const parsedBody = InstallationIdValidator.parse(req.body);

    const data_Layer_Base_Api_Endpoint = get_Data_Layer_POSTGRESS_Api_Endpoint();
    
    console.log("endpoint ", data_Layer_Base_Api_Endpoint);

    const deleteInstallationsProfileResponse = await fetch(
      `${data_Layer_Base_Api_Endpoint}/profiles/installations/delete`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...parsedBody
        }),
      }

    );

    const response = await deleteInstallationsProfileResponse.json()

    
    console.log("delete installation controller response", response.message, )

    if (deleteInstallationsProfileResponse.ok) {

      res.status(201).json({
        success: true,
        message: "Installation deleted",
      });

      return;
    }

    res.status(400).json({
      success: false,
      message: response?.message ? response.message : "Could not send delete Installation. Please try again later.",
    });
  } catch (err) {
    console.log(`deleteInstallation controller encountered an err`, err);

    if (err instanceof ZodError) {
      res.status(400).json({
        success: false,
        message: "Bad request",
        error: err.errors,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Internal Server error. Please try again later.",
    });

    return;
  }
};

export const getAllInstallationsProfiles = async (
  req: Request,
  res: Response
) => {
  try {

    const data_Layer_Base_Api_Endpoint = get_Data_Layer_POSTGRESS_Api_Endpoint();

    console.log("endpoint ", data_Layer_Base_Api_Endpoint);

    const fetchProfileResponse = await fetch(
      `${data_Layer_Base_Api_Endpoint}/profiles/installations/all`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const response = await fetchProfileResponse.json()

    if (fetchProfileResponse.ok) {
      res.status(201).json({
        success: true,
        data: response,
        message: "All installations data fetched"
      });

      return;
    }

    res.status(500).json({
      success: false,
      data: null,
      message: "Could not send fetch installations profiles. Please try again later.",
    });

  } catch (err) {
    console.log(`getAllInstallationsProfiles controller encountered an err`, err);

    if (err instanceof ZodError) {
      res.status(400).json({
        success: false,
        message: "Bad request",
        error: err.errors,
        data: null
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Internal Server error. Could not fetch installations profiles. Please try again later.",
      data: null
    });

    return;
  }
};