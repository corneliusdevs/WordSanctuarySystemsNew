import {Request, Response} from "express"
import { get_Data_Layer_POSTGRESS_Api_Endpoint } from "../helpers/getDataLayerAPI_endpoint";
import { CreateDepartmetalProfileSchema, DepartmentalIdValidator } from "../validators/createDepartment";
import { ZodError } from "zod";

export const createDepartmentController = async (
  req: Request,
  res: Response
) => {
  try {
    const parsedBody = CreateDepartmetalProfileSchema.parse(req.body);

    const data_Layer_Base_Api_Endpoint = get_Data_Layer_POSTGRESS_Api_Endpoint();

    console.log("endpoint ", data_Layer_Base_Api_Endpoint);

    const createProfileResponse = await fetch(
      `${data_Layer_Base_Api_Endpoint}/profiles/departments/create`,
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

    
    console.log("create department Controller response", response.message, )

    if (createProfileResponse.ok) {

      res.status(201).json({
        success: true,
        message: "Department created",
      });

      return;
    }

    res.status(400).json({
      success: false,
      message: response?.message ? response.message : "Could not send create department. Please try again later.",
    });
  } catch (err) {
    console.log(`createDepartment controller encountered an err`, err);

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

// Update Department Profile
export const updateDepartmentController = async (
  req: Request,
  res: Response
) => {
  try {
    const parsedBody = CreateDepartmetalProfileSchema.parse(req.body);

    const data_Layer_Base_Api_Endpoint = get_Data_Layer_POSTGRESS_Api_Endpoint();

    console.log("endpoint ", data_Layer_Base_Api_Endpoint);

    const updateProfileResponse = await fetch(
      `${data_Layer_Base_Api_Endpoint}/profiles/departments/update`,
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

    
    console.log("update department Controller response", response.message, )

    if (updateProfileResponse.ok) {

      res.status(201).json({
        success: true,
        message: "Department updated",
      });

      return;
    }

    res.status(400).json({
      success: false,
      message: response?.message ? response.message : "Could not send update department. Please try again later.",
    });
  } catch (err) {
    console.log(`updateDepartment controller encountered an err`, err);

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

//Get Department Profile by ID
export const getDepartmentProfileById = async (
  req: Request,
  res: Response
) => {
  try {
    const parsedBody = DepartmentalIdValidator.parse(req.body);

    const data_Layer_Base_Api_Endpoint = get_Data_Layer_POSTGRESS_Api_Endpoint();

    console.log("endpoint ", data_Layer_Base_Api_Endpoint);

    const createProfileResponse = await fetch(
      `${data_Layer_Base_Api_Endpoint}/profiles/departments/fetch/:departmentId`,
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

    const response = await createProfileResponse.json()

    
    console.log("get department Controller response", response.message, )

    if (createProfileResponse.ok) {

      res.status(201).json({
        success: true,
        message: "Department retrieved",
      });

      return;
    }

    res.status(400).json({
      success: false,
      message: response?.message ? response.message : "Could not get department. Please try again later.",
    });
  } catch (err) {
    console.log(`getDepartment controller encountered an err`, err);

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

//Get All Department
export const getAllDepartmentsProfiles = async (
  req: Request,
  res: Response
) => {
  try {

    const data_Layer_Base_Api_Endpoint = get_Data_Layer_POSTGRESS_Api_Endpoint();

    console.log("endpoint ", data_Layer_Base_Api_Endpoint);

    const fetchProfileResponse = await fetch(
      `${data_Layer_Base_Api_Endpoint}/profiles/departments/all`,
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
      });

      return;
    }

    res.status(500).json({
      success: false,
      data: null,
      message: "Could not send fetch departments profiles. Please try again later.",
    });
  } catch (err) {
    console.log(`getAllDepartmentsProfiles controller encountered an err`, err);

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
      message: "Internal Server error. Could not fetch departments profiles. Please try again later.",
    });

    return;
  }
};

//Delete Department 
export const deleteDepartmentProfileById = async (
  req: Request,
  res: Response
) => {
  try {
    const parsedBody = DepartmentalIdValidator.parse(req.body);

    const data_Layer_Base_Api_Endpoint = get_Data_Layer_POSTGRESS_Api_Endpoint();

    console.log("endpoint ", data_Layer_Base_Api_Endpoint);

    const deleteProfileResponse = await fetch(
      `${data_Layer_Base_Api_Endpoint}/profiles/departments/delete`,
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

    const response = await deleteProfileResponse.json()

    
    console.log("get department Controller response", response.message, )

    if (deleteProfileResponse.ok) {

      res.status(201).json({
        success: true,
        message: "Department deleted",
      });

      return;
    }

    res.status(400).json({
      success: false,
      message: response?.message ? response.message : "Could not send delete department. Please try again later.",
    });
  } catch (err) {
    console.log(`deleteDepartment controller encountered an err`, err);

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


