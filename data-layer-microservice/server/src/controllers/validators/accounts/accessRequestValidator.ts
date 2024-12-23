import * as z from "zod";
import { LeaderShipLevel } from "../../../../prisma/generated-clients/mongo";
import { profile } from "console";

export const AccessRequestFormSchemaValidator = z.object({
  name: z.string(),
  surname: z.string(),
  leadership_level: z.enum([
    LeaderShipLevel.ASSISTANT_HOD,
    LeaderShipLevel.EXECUTIVE_ASSISTANT,
    LeaderShipLevel.HOD,
    LeaderShipLevel.MINISTER,
    LeaderShipLevel.PASTOR,
    LeaderShipLevel.WORKER,
    LeaderShipLevel.MEMBER,
  ]),
  email: z.string().email(),
  profile_id: z.string(),
  phone_contact: z.string(),
  access_details: z.string(), // what kind of access is needed?
  reasons_for_access: z.string(), // a description on the purpose the access is needed for
});

export type AccessRequestFormType = z.infer<typeof AccessRequestFormSchemaValidator> 
