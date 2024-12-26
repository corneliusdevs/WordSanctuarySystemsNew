import { Request, Response } from "express";

import { get_Data_Layer_POSTGRESS_Api_Endpoint } from "../helpers/getDataLayerAPI_endpoint";
import { CreateIndividualProfileSchema } from "../validators/createIndividualProfileValidators";
import { ZodError } from "zod";

export const createIndividualProfile = async (
  req: Request,
  res: Response
) => {
  try {
    const parsedBody = CreateIndividualProfileSchema.parse(req.body);

    const data_Layer_Base_Api_Endpoint = get_Data_Layer_POSTGRESS_Api_Endpoint();

    console.log("endpoint ", data_Layer_Base_Api_Endpoint);

    const createProfileResponse = await fetch(
      `${data_Layer_Base_Api_Endpoint}/profiles/individuals/create`,
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

    if (createProfileResponse.ok) {
      res.status(201).json({
        success: true,
        message: "Profile created",
      });

      return;
    }

    res.status(500).json({
      success: false,
      message: "Could not send create profile. Please try again later.",
    });
  } catch (err) {
    console.log(`createIndividualprofile controller encountered an err`, err);

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