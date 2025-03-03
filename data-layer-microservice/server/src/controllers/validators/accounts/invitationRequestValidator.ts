import * as z from "zod"

export const InvitationRequestValidator = z.object({
    email: z.string().email(),
    description: z.string() // reason for invitation 
})

export const getInvitationTokenValidator = z.object({
    email_of_invited: z.string().email(),
    token: z.string(),
    otp: z.string()
})

export const getLoginCredentailsValidator = z.object({
    email: z.string().email(),
    otp: z.string()
})