import * as z from "zod";
import { Heirarchy } from "../../types/general";

export const IndividualProfilesSnapshotValidator = z.object({
  profile_id: z.string(),
  profileSnapShotId: z.string(),
  snapshots: z.array(
    z.object({
    profile_id: z.string(),
      name: z.string().min(3, {
        message: "name must be at least 3 characters",
      }),
      surname: z.string().min(3, {
        message: "surname must be at least 3 characters",
      }),
      email: z.string().email(),
      installation_id: z.string().min(4, {
        message: "invalid installation_id field",
      }),
      giving_number: z.string().min(3, {
        message: "giving_number must be at least 3 characters",
      }),
      leadership_level: z.enum([
        Heirarchy.ASSISTANT_HOD,
        Heirarchy.EXECUTIVE_ASSISTANT,
        Heirarchy.HOD,
        Heirarchy.MEMBER,
        Heirarchy.MINISTER,
        Heirarchy.PASTOR,
        Heirarchy.WORKER,
      ]),
      lifeclass_topic: z.number(),
      lifeclass_teacher_profile_id: z.string().min(4, {
        message: "invalid lifeclass_teacher_profile_id field",
      }),
      mentor_profile_id: z.string().min(4, {
        message: "invalid mentor_profile_id field",
      }),
      signature: z.string(),
      departments: z.array(z.string()).min(1, {
        message: "departments field must have at least 1 element",
      }),
      passport: z.string(),
      birthday: z.string(),
      centrals: z.array(z.string()),
      snapShotDate: z.number(),
      snapShotId: z.string(),
    })
  ),
});





