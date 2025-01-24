import * as z from "zod"

export const CreateInvitationFormSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    description: z.string() // reason for invitation 
})