import {Request, Response} from "express"
import { CreateCentralProfileSchema, CentralProfileByIdSchema, UpdateCentralProfileSchema } from "../validators/createCentral";
import { get_Data_Layer_POSTGRESS_Api_Endpoint } from "../helpers/getDataLayerAPI_endpoint";
import { ZodError } from "zod";
import exp from "constants";


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
// UPDATE CENTRAL
  export const updateCentralProfileByIdController = async (
    req: Request,
    res: Response
  ) =>{
    try{
      const parsedBody = UpdateCentralProfileSchema.parse(req.body);
  
      const data_Layer_Base_Api_Endpoint = get_Data_Layer_POSTGRESS_Api_Endpoint();
  
      console.log("endpoint ", data_Layer_Base_Api_Endpoint);
  
      const updateProfileResponse = await fetch(
        `${data_Layer_Base_Api_Endpoint}/profiles/centrals/update`,
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
  
      
      console.log("updateCentralProfileController response", response.message, )
  
      if (updateProfileResponse.ok) {
  
        res.status(201).json({
          success: true,
          message: "Central updated",
        });
  
        return;
      }
  
      res.status(400).json({
        success: false,
        message: response?.message ? response.message : "Could not update central. Please try again later.",
      });

    } catch(err){
      console.log(`updateCentralProfileController  encountered an err`, err);
  
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
//DELETE CENTRAL
  export const deleteCentralProfileByIdController = async (
    req: Request,
    res: Response
  ) =>{
    try{
      const {central_id} = CentralProfileByIdSchema.parse(req.params);
  
      const data_Layer_Base_Api_Endpoint = get_Data_Layer_POSTGRESS_Api_Endpoint();
  
      console.log("endpoint ", data_Layer_Base_Api_Endpoint);
  
      const deleteProfileResponse = await fetch(
        `${data_Layer_Base_Api_Endpoint}/profiles/centrals/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({central_id}),
        }
      );
  
      const response = await deleteProfileResponse.json()
  
      
      console.log("deleteCentralProfileController response", response.message, )
  
      if (deleteProfileResponse.ok) {
  
        res.status(201).json({
          success: true,
          message: "Central deleted",
        });
  
        return;
      }
  
      res.status(400).json({
        success: false,
        message: response?.message ? response.message : "Could not delete central. Please try again later.",
      });

    } catch(err){
      console.log(`deleteCentralProfileController  encountered an err`, err);
  
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
  }

  //GET CENTRAL BY ID
  export const getCentralProfileByIdControler = async (
    req: Request,
    res: Response
  ) =>{
    try{
      const {central_id} = CentralProfileByIdSchema.parse(req.params);
  
      const data_Layer_Base_Api_Endpoint = get_Data_Layer_POSTGRESS_Api_Endpoint();
  
      console.log("endpoint ", data_Layer_Base_Api_Endpoint);
  
      const getProfileResponse = await fetch(
        `${data_Layer_Base_Api_Endpoint}/profiles/centrals/fetch/:centralId`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({central_id}),
        }
      );
  
      const response = await getProfileResponse.json()
  
      
      console.log("getCentralProfileController response", response.message, )
  
      if (getProfileResponse.ok) {
  
        res.status(201).json({
          success: true,
          message: "Central Retrieved",
        });
  
        return;
      }
  
      res.status(400).json({
        success: false,
        message: response?.message ? response.message : "Could not get all central. Please try again later.",
      });

    } catch(err){
      console.log(`getCentralProfileController  encountered an err`, err);
  
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
  }
  //GET ALL CENTRALS
  export const getAllCentralsProfilesControler = async (
    req: Request,
    res: Response
  ) =>{
    try{
  
      const data_Layer_Base_Api_Endpoint = get_Data_Layer_POSTGRESS_Api_Endpoint();
  
      console.log("endpoint ", data_Layer_Base_Api_Endpoint);
  
      const getAllProfileResponse = await fetch(
        `${data_Layer_Base_Api_Endpoint}/profiles/centrals/all`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
  
      const response = await getAllProfileResponse.json()
  
      
      console.log("getAllCentralProfileController response", response.message, )
  
      if (getAllProfileResponse.ok) {
  
        res.status(201).json({
          success: true,
          message: "All Central Retrieved",
        });
  
        return;
      }
  
      res.status(400).json({
        success: false,
        message: response?.message ? response.message : "Could not get all central. Please try again later.",
      });

    } catch(err){
      console.log(`getAllCentralProfileController  encountered an err`, err);
  
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
  }