import * as z from "zod"
import { Heirarchy } from "../types"


// to validate the birthday field
const birthdayRegex = /^(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[0-2])$/

export const CreateIndividualProfileSchema = z.object({
    name: z.string().min(3, {
        message: "name must be at least 3 characters"
    }),
    surname: z.string().min(3, {
        message: "surname must be at least 3 characters"
    }),
    email: z.string().email(), 
    installation_id: z.string().min(4, {
        message: "invalid installation_id field"
    }),
    giving_number: z.string().min(3, {
        message: "giving_number must be at least 3 characters"
    }),
    leadership_level: z.enum([Heirarchy.ASSISTANT_HOD, Heirarchy.EXECUTIVE_ASSISTANT, Heirarchy.HOD, Heirarchy.MEMBER, Heirarchy.MINISTER, Heirarchy.PASTOR, Heirarchy.WORKER]),
    lifeclass_topic: z.number(),
    lifeclass_teacher_profile_id: z.string().min(4, {
        message: "invalid lifeclass_teacher_profile_id field"
    }),
    mentor_profile_id: z.string().min(4, {
        message: "invalid mentor_profile_id field"
    }),
    signature: z.string(),
    departments: z.array(z.string()).min(1, {
        message: "departments field must have at least 1 element"
    }),
    passport: z.string(),
    phone_contact: z.string(),
    birthday: z.string().refine((val)=> birthdayRegex.test(val)), // uses a regex to validate the birthday field
    centrals: z.array(z.string())
})

export const UpdateIndividualProfileSchema = z.object({
    profile_id: z.string(),
    name: z.string().min(3, {
        message: "name must be at least 3 characters"
    }).optional(),
    surname: z.string().min(3, {
        message: "name must be at least 3 characters"
    }).optional(),
    email: z.string().email().optional(), 
    installation_id: z.string().min(7, {
        message: "invalid installation_id field"
    }).optional(),
    giving_number: z.string().min(3, {
        message: "giving_number must be at least 3 characters"
    }).optional(),
    leadership_level: z.enum([Heirarchy.ASSISTANT_HOD, Heirarchy.EXECUTIVE_ASSISTANT, Heirarchy.HOD, Heirarchy.MEMBER, Heirarchy.MINISTER, Heirarchy.PASTOR, Heirarchy.WORKER]).optional(),
    lifeclass_topic: z.number().optional(),
    lifeclass_teacher_profile_id: z.string().min(7, {
        message: "invalid lifeclass_teacher_profile_id field"
    }).optional(),
    mentor_profile_id: z.string().min(4, {
        message: "invalid mentor_profile_id field"
    }).optional(),
    signature: z.string().optional(),
    departments: z.array(z.string()).min(1, {
        message: "departments field must have at least 1 element"
    }).optional(),
    passport: z.string().optional(),
    phone_contact: z.string().optional(),
    birthday: z.string().refine((val)=> birthdayRegex.test(val)).optional(), // uses a regex to validate the birthday field
    centrals: z.array(z.string()).optional()
})


export const EmailValidatorObj = z.object({
    email: z.string().email()
})

export const profileIdValidator = z.object({
    profile_id: z.string().min(7, {
        message: "invalid profile_id"
    })
})

export const profileIdListValidator = z.object({
    profile_ids: z.array(z.string().min(7, {
        message: "invalid profile_id"
    }))
})

export const GivingNumberValidatorObj = z.object({
    givingNumber: z.string().min(1, {
        message: "Must be minimum of 1 character"
    })
})
