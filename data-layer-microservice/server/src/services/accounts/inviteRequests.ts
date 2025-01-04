import { Request, Response} from "express"
import { sendEmailWithCodeAndLink } from "../mailing/mailer";
import { getInvitationTokenValidator, InvitationRequestValidator } from "../../controllers/validators/accounts/invitationRequestValidator";
import { saveInvitationRequestSevice } from "./saveInvitationRequestService";
import { mongoDbClient } from "../../db_connections/prismaClients";
import { ZodError } from "zod";
import { TokenTypes } from "../mailing/saveTokenService";



export const createInviteRequest = async (req:Request, res:Response)=>{
    try{
       const parsedBody = InvitationRequestValidator.parse(req.body);
       
       const response = await sendEmailWithCodeAndLink(parsedBody.email, TokenTypes.INVITATION)

       // save the invitation request
       const saveInvitationRequest = await saveInvitationRequestSevice(parsedBody.email, parsedBody.description)

       if(response){
          res.status(200).json({
            success: true,
            message: "Invitation sent"
          })

          return
       }

       res.status(500).json({
        success: false,
        message: "Oops something went wrong"
       })

       return
    }catch(err){
      console.log(`createInviteRequest controller encountered an error `, err)

      if(err instanceof ZodError){
         res.status(400).json({
            success: false,
            error: err.errors,
            message: "Bad request"
         })

         return
      }

      res.status(500).json({
        success: false,
        message: "Oops something went wrong"
       })

       return

    }
}


export const getInviteTokenController = async (req:Request, res:Response)=>{
   try{
      const parsedBody = getInvitationTokenValidator.parse(req.body)

      const getInvitationToken = await mongoDbClient.authTokens.findFirst({
         where: {
            email: parsedBody.email_of_invited,
            otp: parsedBody.otp,
            token: parsedBody.token
         }
      })

      if(getInvitationToken){
         res.status(200).json({
            succes: true,
            data: getInvitationToken
         })

         return
      }

      res.status(401).json({
         success: false,
         data: null
      })

      return
   }catch(err){
      console.log(`getInviteToken controller encountered an error `, err)

      if(err instanceof ZodError){
         res.status(400).json({
            success: false,
            error: err.errors,
            message: "Bad request"
         })

         return
      }

      res.status(500).json({
        success: false,
        message: "Oops something went wrong",
        data:null
       })

       return

    }
   }

