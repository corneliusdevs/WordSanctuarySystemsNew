import { Request, Response} from "express"
import { EmailValidatorObj } from "../validators/createIndividualProfileValidator";
import { sendLoginCredentialsToEmailService } from "../../services/mailing/mailer";
import { TokenTypes } from "../../services/mailing/saveTokenService";
import { ZodError } from "zod";
import { getAllIndividualProfiles } from "../postgres/profiles/individualController";
import { mongoDbClient, postgresClient } from "../../db_connections/prismaClients";
import { getInvitationTokenValidator, getLoginCredentailsValidator } from "../validators/accounts/invitationRequestValidator";




export const loginRequestController = async (req:Request, res:Response)=>{
    try{
       const parsedBody = EmailValidatorObj.parse(req.body);

    //    check if the email is registered in the system 
    const profile = await postgresClient.profiles.findUnique({
        where: {
            email: parsedBody.email
        }
    })

    if(!profile){
       res.status(401).json({
        success: false,
        message: "No profile associated with this email" 
       })

       return
    }
       
       const response = await sendLoginCredentialsToEmailService(parsedBody.email, TokenTypes.LOGIN)


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
      console.log(`loginRequestController  encountered an error `, err)

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


export const getLoginCredentailsController = async (req:Request, res:Response)=>{
   try{
      const parsedBody = getLoginCredentailsValidator.parse(req.body)

      const loginCredentials = await mongoDbClient.authTokens.findFirst({
         where: {
            email: parsedBody.email,
            otp: parsedBody.otp,
         }
      })

    //   get profile_id of the user
      const profile = await postgresClient.profiles.findUnique({
        where: {
            email: parsedBody.email
        }
    })

      if(loginCredentials){
         res.status(200).json({
            success: true,
            data: {
                ...loginCredentials,
                profile_id: profile ? profile.profile_id : ""
            },
         })

         return
      }

      res.status(401).json({
         success: false,
         data: null,
      })

      return
   }catch(err){
      console.log(`getLoginCredentailsController  encountered an error `, err)

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

