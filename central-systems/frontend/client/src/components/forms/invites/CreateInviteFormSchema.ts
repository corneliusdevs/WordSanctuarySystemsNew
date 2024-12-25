import * as z from "zod"

export const CreateInvitationFormSchema = z.object({
    email: z.string().email(),
    description: z.string() // reason for invitation 
})