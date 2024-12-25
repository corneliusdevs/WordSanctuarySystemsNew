import { mongoDbClient } from "../../db_connections/prismaClients"

export const saveInvitationRequestSevice = async (email:string, description:string)=>{
   try{
      const savedInvitationRequest = await mongoDbClient.invitationRequets.create({
        data: {
            email,
            description
        }
      })

      return savedInvitationRequest
   }catch(err){
      console.log(`saveInvitationRequestSevice encountered an error `, err)

      return null
   }
}