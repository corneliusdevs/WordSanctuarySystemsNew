import { Request, Response} from "express"
import { EmailValidatorObj } from "../../controllers/validators/createIndividualProfileValidator"
import { sendEmailWithCodeAndLink } from "../mailing/mailer";


export const createInviteRequest = async (req:Request, res:Response)=>{
    try{
       const parsedBody = EmailValidatorObj.parse(req.body);
       
       const response = await sendEmailWithCodeAndLink(parsedBody.email)

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

      res.status(500).json({
        success: false,
        message: "Oops something went wrong"
       })

       return

    }
}