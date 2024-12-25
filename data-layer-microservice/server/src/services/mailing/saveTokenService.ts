import { mongoDbClient } from "../../db_connections/prismaClients"

export enum TokenTypes {
 INVITATION = "INVITATION"
}


export const saveTokenService = async (recipientEmail:string, token: string, expiration:number, otpCode:string, tokenType:TokenTypes)=>{
   try{
      const savedToken = await mongoDbClient.authTokens.create({
        data: {
            email: recipientEmail,
            token,
            expiration,
            otp: otpCode,
            token_type: tokenType
        }
      })

      return savedToken
   }catch(err){
     console.log(`saveTokenService encountered an error `, err )
     return null
   }
}