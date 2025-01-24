import { Request, Response } from "express";
import { get_Data_Layer_POSTGRESS_Api_Endpoint } from "../helpers/getDataLayerAPI_endpoint";
import { CreateIndividualProfileSchema, EmailValidatorObj, GivingNumberValidatorObj, UpdateIndividualProfileSchema, profileIdValidator } from "../validators/createIndividualProfileValidators";
import { ZodError } from "zod";
import { DepartmentKpiMetaData, DepartementKpiIdValidator } from "../validators/kpi.validation";


export const calculateDepartmentKpi = async (
  req: Request,
  res: Response
) => {
  try {
    const parsedBody = DepartmentKpiMetaData.parse(req.body);

    const data_Layer_Base_Api_Endpoint = get_Data_Layer_POSTGRESS_Api_Endpoint();

    console.log("endpoint ", data_Layer_Base_Api_Endpoint);

    const calculateDepartmentKpiResponse = await fetch(
      `${data_Layer_Base_Api_Endpoint}/departments/calculate`,
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

    if (calculateDepartmentKpiResponse.ok) {
      res.status(201).json({
        success: true,
        message: "Departement kpi calculated",
      });

      return;
    }

    res.status(500).json({
      success: false,
      message: "Could not send calculate department kpi. Please try again later.",
    });
  } catch (err) {
    console.log(`calculateDepartmentKpi controller encountered an err`, err);

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

// Get Department Kpi by Id

export const getDepartmentKpiById = async (
  req: Request,
  res: Response
) => {
  try {
    const parsedBody = DepartementKpiIdValidator.parse(req.body);

    const data_Layer_Base_Api_Endpoint = get_Data_Layer_POSTGRESS_Api_Endpoint();

    console.log("endpoint ", data_Layer_Base_Api_Endpoint);

    const getDepartmentKpiResponse = await fetch(
      `${data_Layer_Base_Api_Endpoint}/departments/kpi/id/:departmentId`,
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

    if (getDepartmentKpiResponse.ok) {
      res.status(201).json({
        success: true,
        message: "Departement kpi retrieved",
      });

      return;
    }

    res.status(500).json({
      success: false,
      message: "Could not send get department kpi. Please try again later.",
    });
  } catch (err) {
    console.log(`getDepartmentKpi controller encountered an err`, err);

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
