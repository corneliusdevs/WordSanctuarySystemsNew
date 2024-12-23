import { mongoDbClient } from "../../db_connections/prismaClients"

export const saveTokenService = async (recipientEmail:string, token: string, expiration:number)=>{
   try{
      const savedToken = await mongoDbClient.authTokens.create({
        data: {
            email: recipientEmail,
            token,
            expiration
        }
      })

      return savedToken
   }catch(err){
     console.log(`saveTokenService encountered an error `, err )
     return null
   }
}