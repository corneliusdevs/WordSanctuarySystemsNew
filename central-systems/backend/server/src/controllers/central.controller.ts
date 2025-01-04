import {Request, Response} from "express"
import { CreateCentralProfileSchema } from "../validators/createCentral";
import { get_Data_Layer_POSTGRESS_Api_Endpoint } from "../helpers/getDataLayerAPI_endpoint";
import { ZodError } from "zod";


export const createCentralProfileController = async (
    req: Request,
    res: Response
  ) => {
    try {
      const parsedBody = CreateCentralProfileSchema.parse(req.body);
  
      const data_Layer_Base_Api_Endpoint = get_Data_Layer_POSTGRESS_Api_Endpoint();
  
      console.log("endpoint ", data_Layer_Base_Api_Endpoint);
  
      const createProfileResponse = await fetch(
        `${data_Layer_Base_Api_Endpoint}/profiles/centrals/create`,
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
  
      
      console.log("createCentralProfileController response", response.message, )
  
      if (createProfileResponse.ok) {
  
        res.status(201).json({
          success: true,
          message: "Central created",
        });
  
        return;
      }
  
      res.status(400).json({
        success: false,
        message: response?.message ? response.message : "Could not create central. Please try again later.",
      });
    } catch (err) {
      console.log(`createCentralProfileController  encountered an err`, err);
  
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