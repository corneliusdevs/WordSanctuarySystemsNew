import { Heirarchy } from "@/types/general";
import * as z from "zod";
import { zfd } from "zod-form-data";

export interface TCreateIndividualProfile {
  surname: string;
  firstname: string;
  middlename: string;
  email: string;
  profile_id: string;
  giving_number: string;
  leadership_level: Heirarchy;
  lifeclass_topic: number;
  lifeclass_teacher: string;
  mentor: string;
  installation_id: string;
  signature: string;
  passport: string;
  birthday: string;
  departments: string[];
  phone_contact: string;
}

export interface TIndividualProfile {
  profile_id: string;
  surname: string;
  firstname: string;
  middlename: string;
  email: string;
  giving_number: string;
  leadership_level: Heirarchy;
  lifeclass_topic: number;
  lifeclass_teacher: string;
  mentor: string;
  installation_id: string;
  signature: string;
  passport: string;
  birthday: string;
  departments: string[];
  phone_contact: string;
}

// to validate the birthday field
const birthdayRegex = /^(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[0-2])$/;

export const CreateIndividualProfileSchema = z.object({
  surname: z.string().min(3, {
    message: "surname must be at least 3 characters",
  }),
  firstname: z.string().min(3, {
    message: "surname must be at least 3 characters",
  }),
  middlename: z.string().min(3, {
    message: "surname must be at least 3 characters",
  }),
  email: z.string().email(),
  
  giving_number: z.string().min(3, {
    message: "giving_number must be at least 3 characters",
  }),

  profile_id: z.string().min(3, {
    message: "Profile number must be at least 3 characters",
  }),  

  installation_id: z.string().min(4, {
    message: "invalid installation_id field",
  }).optional(),


  leadership_level: z.enum([
    Heirarchy.ASSISTANT_HOD,
    Heirarchy.EXECUTIVE_ASSISTANT,
    Heirarchy.HOD,
    Heirarchy.MEMBER,
    Heirarchy.MINISTER,
    Heirarchy.PASTOR,
    Heirarchy.WORKER,
  ]).optional(),

  lifeclass_topic: z.number().optional(),

  lifeclass_teacher: z.string().min(4, {
    message: "invalid lifeclass_teacher field",
  }).optional(),

  mentor: z.string().min(4, {
    message: "invalid mentor field",
  }).optional(),

  departments: z.array(z.string()).min(1, {
      message: "departments field must have at least 1 element"
  }).optional(),

  passport: zfd
    .file()
    .refine((file) => file.size < 250000, {
      message: "File can't be bigger than 250kb",
    })
    .refine(
      (file) => {
        return ["image/jpeg", "image/png", "image/jpg"].includes(file.type);
      },
      {
        message: "File format must be either jpg, jpeg or png",
      }
    ),
    signature: zfd
    .file()
    .refine((file) => file.size < 250000, {
      message: "File can't be bigger than 250kb",
    })
    .refine(
      (file) => {
        return ["image/jpeg", "image/png", "image/jpg"].includes(file.type);
      },
      {
        message: "File format must be either jpg, jpeg or png",
      }
    ),
  phone_contact: z.string(),
  birthday: z.string().refine((val) => birthdayRegex.test(val)), // uses a regex to validate the birthday field

  centrals: z.array(z.string()).optional(),
});

export const UpdateIndividualProfileSchema = z.object({
  profile_id: z.string(),
  name: z
    .string()
    .min(3, {
      message: "name must be at least 3 characters",
    })
    .optional(),
  surname: z
    .string()
    .min(3, {
      message: "name must be at least 3 characters",
    })
    .optional(),
  email: z.string().email().optional(),
  installation_id: z
    .string()
    .min(7, {
      message: "invalid installation_id field",
    })
    .optional(),
  giving_number: z
    .string()
    .min(3, {
      message: "giving_number must be at least 3 characters",
    })
    .optional(),
  leadership_level: z
    .enum([
      Heirarchy.ASSISTANT_HOD,
      Heirarchy.EXECUTIVE_ASSISTANT,
      Heirarchy.HOD,
      Heirarchy.MEMBER,
      Heirarchy.MINISTER,
      Heirarchy.PASTOR,
      Heirarchy.WORKER,
    ])
    .optional(),
  lifeclass_topic: z.number().optional(),
  lifeclass_teacher: z
    .string()
    .min(7, {
      message: "invalid lifeclass_teacher field",
    })
    .optional(),
  mentor: z
    .string()
    .min(4, {
      message: "invalid mentor field",
    })
    .optional(),
  signature: z.string().optional(),
  departments: z
    .array(z.string())
    .min(1, {
      message: "departments field must have at least 1 element",
    })
    .optional(),
  passport: z.string().optional(),
  phone_contact: z.string().optional(),
  birthday: z
    .string()
    .refine((val) => birthdayRegex.test(val))
    .optional(), // uses a regex to validate the birthday field
  centrals: z.array(z.string()).optional(),
});


// export const CreateIndividualProfileSchema = z.object({
//   name: z.string().min(3, {
//     message: "name must be at least 3 characters",
//   }),
//   surname: z.string().min(3, {
//     message: "surname must be at least 3 characters",
//   }),
//   email: z.string().email(),
//   giving_number: z.string().min(3, {
//     message: "giving_number must be at least 3 characters",
//   }),

//   passport: zfd
//     .file()
//     .refine((file) => file.size < 250000, {
//       message: "File can't be bigger than 250kb",
//     })
//     .refine(
//       (file) => {
//         return ["image/jpeg", "image/png", "image/jpg"].includes(file.type);
//       },
//       {
//         message: "File format must be either jpg, jpeg or png",
//       }
//     ),
//     signature: zfd
//     .file()
//     .refine((file) => file.size < 250000, {
//       message: "File can't be bigger than 250kb",
//     })
//     .refine(
//       (file) => {
//         return ["image/jpeg", "image/png", "image/jpg"].includes(file.type);
//       },
//       {
//         message: "File format must be either jpg, jpeg or png",
//       }
//     ),
//   phone_contact: z.string(),
//   birthday: z.string().refine((val) => birthdayRegex.test(val)), // uses a regex to validate the birthday field
// });


export const EmailValidatorObj = z.object({
  email: z.string().email(),
});

export const profileIdValidator = z.object({
  profile_id: z.string().min(7, {
    message: "invalid profile_id",
  }),
});

export const profileIdListValidator = z.object({
  profile_ids: z.array(
    z.string().min(7, {
      message: "invalid profile_id",
    })
  ),
});

export const GivingNumberValidatorObj = z.object({
  givingNumber: z.string().min(1, {
    message: "Must be minimum of 1 character",
  }),
});
