import {Request, Response} from "express"
import { get_Data_Layer_POSTGRESS_Api_Endpoint } from "../helpers/getDataLayerAPI_endpoint";
import { CreateDepartmentClassSchema, DepartmentClassIdValidator, UpdateDepartmentClassSchema } from "../validators/createDepartmentClass";
import { ZodError } from "zod";

export const createDepartmentClassController = async (
  req: Request,
  res: Response
) => {
  try {
    const parsedBody = CreateDepartmentClassSchema.parse(req.body);

    const data_Layer_Base_Api_Endpoint = get_Data_Layer_POSTGRESS_Api_Endpoint();

    console.log("endpoint ", data_Layer_Base_Api_Endpoint);

    const createProfileResponse = await fetch(
      `${data_Layer_Base_Api_Endpoint}/profiles/departments/class/create`,
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

    
    console.log("create departmentClassController response", response.message, )

    if (createProfileResponse.ok) {

      res.status(201).json({
        success: true,
        message: "Department type created",
      });

      return;
    }

    res.status(400).json({
      success: false,
      message: response?.message ? response.message : "Could not send create department type. Please try again later.",
    });
  } catch (err) {
    console.log(`createDepartmentClass controller encountered an err`, err);

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

//Update Department Class
export const updateDepartmentClassController = async (
  req: Request,
  res: Response
) => {
  try {
    const parsedBody = UpdateDepartmentClassSchema.parse(req.body);

    const data_Layer_Base_Api_Endpoint = get_Data_Layer_POSTGRESS_Api_Endpoint();

    console.log("endpoint ", data_Layer_Base_Api_Endpoint);

    const updateDepartmentClassResponse = await fetch(
      `${data_Layer_Base_Api_Endpoint}/profiles/departments/class/update`,
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

    const response = await updateDepartmentClassResponse.json()

    
    console.log("update departmentClassController response", response.message, )

    if (updateDepartmentClassResponse.ok) {

      res.status(201).json({
        success: true,
        message: "Department type updated",
      });

      return;
    }

    res.status(400).json({
      success: false,
      message: response?.message ? response.message : "Could not send update department type. Please try again later.",
    });
  } catch (err) {
    console.log(`updateDepartmentClass controller encountered an err`, err);

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

// Get Department Class By Id
export const getDepartmentClassByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const parsedBody = DepartmentClassIdValidator.parse(req.body);

    const data_Layer_Base_Api_Endpoint = get_Data_Layer_POSTGRESS_Api_Endpoint();

    console.log("endpoint ", data_Layer_Base_Api_Endpoint);

    const getDepartmentClassResponse = await fetch(
      `${data_Layer_Base_Api_Endpoint}/profiles/departments/class/fetch/:departmentClassID`,
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

    const response = await getDepartmentClassResponse.json()

    
    console.log("get departmentClassController response", response.message, )

    if (getDepartmentClassResponse.ok) {

      res.status(201).json({
        success: true,
        message: "Department class retrieved",
      });

      return;
    }

    res.status(400).json({
      success: false,
      message: response?.message ? response.message : "Could not send get department type. Please try again later.",
    });
  } catch (err) {
    console.log(`getDepartmentClass controller encountered an err`, err);

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

//Delete Department Class
export const deleteDepartmentClassController = async (
  req: Request,
  res: Response
) => {
  try {
    const parsedBody = DepartmentClassIdValidator.parse(req.body);

    const data_Layer_Base_Api_Endpoint = get_Data_Layer_POSTGRESS_Api_Endpoint();

    console.log("endpoint ", data_Layer_Base_Api_Endpoint);

    const deleteDepartmentClassResponse = await fetch(
      `${data_Layer_Base_Api_Endpoint}/profiles/departments/class/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...parsedBody
        }),
      }
    );

    const response = await deleteDepartmentClassResponse.json()

    
    console.log("delete departmentClassController response", response.message, )

    if (deleteDepartmentClassResponse.ok) {

      res.status(201).json({
        success: true,
        message: "Department type deleted",
      });

      return;
    }

    res.status(400).json({
      success: false,
      message: response?.message ? response.message : "Could not send delete department type. Please try again later.",
    });
  } catch (err) {
    console.log(`deleteDepartmentClass controller encountered an err`, err);

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

// Get All Department Class
export const getAllDepartmentClasses = async (
  req: Request,
  res: Response
) => {
  try {

    const data_Layer_Base_Api_Endpoint = get_Data_Layer_POSTGRESS_Api_Endpoint();

    console.log("endpoint ", data_Layer_Base_Api_Endpoint);

    const fetchProfileResponse = await fetch(
      `${data_Layer_Base_Api_Endpoint}/profiles/departments/class/all`,
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
        message: "All Department classes data fetched"
      });

      return;
    }

    res.status(500).json({
      success: false,
      data: null,
      message: "Could not send fetch Department classes. Please try again later.",
    });

  } catch (err) {
    console.log(`getAllDepartmentClasses controller encountered an err`, err);

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
      message: "Internal Server error. Could not fetch Department classes profiles. Please try again later.",
      data: null
    });

    return;
  }
};