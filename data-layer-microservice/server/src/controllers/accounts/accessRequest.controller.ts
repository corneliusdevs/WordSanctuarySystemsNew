import { Request, Response } from "express";
import { AccessRequestFormSchemaValidator } from "../validators/accounts/accessRequestValidator";
import { ZodError } from "zod";
import {
  getAllAccessRequestsService,
  saveAccessRequestService,
} from "../../services/accounts/accessRequests";


export const createAccessRequestController = async (req: Request, res: Response) => {
  try {
    const parsedBody = AccessRequestFormSchemaValidator.parse(req.body);
    const savedAccessRequest = await saveAccessRequestService(parsedBody);

    if (savedAccessRequest) {
      res.status(200).json({
        success: true,
        message:
          "Your request has been submitted and will be processed shortly",
      });

      return;
    }

    res.status(500).json({
      success: false,
      message: "Could not process access request",
    });

    return;
  } catch (err) {
    if (err instanceof ZodError) {
      console.log(`createAccessRequestController encountered an error `, err);
      res.status(400).json({
        message: "Bad request",
        error: err.errors,
      });
      return;
    }

    console.log(`accessRequestController encountered an error `, err);
    res.status(500).json({
      message: "Could not process request. Please try again later",
    });
  }
};

export const getAllAccessRequests = async (Rreq: Request, res: Response) => {
  try {
    const access_requests = await getAllAccessRequestsService();

    res.status(200).json({
      success: true,
      data: access_requests,
    });

    return;
  } catch (err) {
    console.log(`getAccessRequests controller encountered an error `, err);
    res.status(500).json({
      success: false,
      data: null,
      message: "Could not get all access requests",
    });

    return;
  }
};

export const processAccessRequest = async (req:Request, res:Response)=>{
    try{
      
    }catch(err){

    }
}
