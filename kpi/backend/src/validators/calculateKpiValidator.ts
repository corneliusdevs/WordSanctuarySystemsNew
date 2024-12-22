import * as z from "zod";

export enum DeptMemberRole {
  HEAD_OF_DEPARTMENT = "HEAD OF DEPARTMENT",
  ASSISTANT_HEAD_OF_DEPARTMENT = "ASSISTANT HEAD OF DEPARTMENT",
  EXECUTIVE_ASSISTANT = "EXECUTIVE ASSISTANT",
  EVANGELISM_ASSISTANT = "EVANGELISM ASSISTANT",
  PRAYER_ASSISTANT = "PRAYER ASSISTANT",
  FINANCE_ASSISTANT = "FINANCE ASSISTANT",
  WORKER = "WORKER",
  MEMBER = "MEMBER",
}

export type LifeClassIndexType ={
  profile_id: string,
  full_name: string,
  previous_topic: number,
  current_topic: number,
  growth_index: number
  time_frame_lower_limit: number,
  time_frame_upper_limit: number
}
  
export enum Heirarchy  {
  PASTOR  = "PASTOR",
  MINISTER = "MINISTER",
  HOD = "HOD",
  ASSISTANT_HOD = "ASSISTANT_HOD",
  EXECUTIVE_ASSISTANT = "EXECUTIVE_ASSISTANT",
  WORKER = "WORKER",
  MEMBER = "MEMBER",
};

export const DepartmentKpiMetaData = z.object({
  department_id: z.string(),
  time_range_in_weeks: z.number().min(1, {
    message: "time_range_in_weeks cannot be less than 1 week"
  }),
  finance_details: z.object({
    cummulative_cash_flow: z.number(),
    cash_flow_duration_in_wks: z.number()
  }),
  operational_details: z.object({
    operational_punctuality_grade: z.number().min(-1, {
      message: "operational_punctuality_grade cannot be lower than -1"
    }).max(5, {
      message: "operational_punctuality_grade cannot be more than 5"
    }),
    operational_excellence_grade: z.number().min(-1, {
      message: "operational_excellence_grade cannot be lower than -1"
    }).max(5, {
      message: "operational_excellence_grade cannot be more than 5"
    }),
    operational_time_grade: z.number().min(-1, {
      message: "operational_time_grade cannot be lower than -1"
    }).max(5, {
      message: "operational_time_grade cannot be more than 5"
    }),
    operational_human_resource_grade: z.number().min(-1, {
      message: "operational_human_resource_grade cannot be lower than -1"
    }).max(5, {
      message: "operational_human_resource_grade cannot be more than 5"
    }),
    operational_finance_grade: z.number().min(-1, {
      message: "operational_finance_grade cannot be lower than -1"
    }).max(5, {
      message: "operational_finance_grade cannot be more than 5"
    }),
    attitude_score: z.number().min(-1, {
      message: "attitude_score cannot be lower than -1"
    }).max(5, {
      message: "attitude_score cannot be more than 5"
    })
  }),
  people_details: z.object({
    did_meeting_hold: z.boolean(),
    attendance_in_the_week: z.number(),
    number_that_took_life_class_in_week: z.number(),
  }),
});

export type DepartmentSnapShotSchemaType = z.infer <typeof DepartmentSnapShotSchema>



export const DepartmentSnapShotSchema = z.object({
  department_id: z.string(),
  deptSnapShotId: z.string(),
  snapshots: z.array(
    z.object({
      department_id: z.string(),
      department_name: z.string(),
      department_type: z.string(),
      description: z.string(),
      finance_id: z.string(),
      installation_id: z.string(),
      members: z.array(
        z.object({
          role: z.enum([
            DeptMemberRole.ASSISTANT_HEAD_OF_DEPARTMENT,
            DeptMemberRole.EXECUTIVE_ASSISTANT,
            DeptMemberRole.EVANGELISM_ASSISTANT,
            DeptMemberRole.FINANCE_ASSISTANT,
            DeptMemberRole.HEAD_OF_DEPARTMENT,
            DeptMemberRole.MEMBER,
            DeptMemberRole.PRAYER_ASSISTANT,
            DeptMemberRole.WORKER,
          ]),

          profile_id: z.string(),
          leaderShipLevel: z.enum([
            Heirarchy.PASTOR,
            Heirarchy.MINISTER,
            Heirarchy.HOD,
            Heirarchy.ASSISTANT_HOD,
            Heirarchy.EXECUTIVE_ASSISTANT,
            Heirarchy.WORKER,
            Heirarchy.MEMBER
          ])
        })
      ),
      dues_paid_per_individual: z.object({
        pastors: z.number(),
        ministers: z.number(),
        hod: z.number(),
        asst_hod: z.number(),
        executive_assistant: z.number(),
        worker: z.number(),
        member: z.number(),
      }),
      centrals: z.array(z.string()),
      createdAt: z.string(),
      modifiedAt: z.string(),
      snapShotDate: z.number(),
      snapShotId: z.string(),
    })
  ),
});

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
  birthday: z.string(),
  centrals: z.array(z.string())
})


export const membersProfileSnapshotsSchema = z.object({
  profile_id: z.string(), 
  snapshots: z.array(CreateIndividualProfileSchema),
  profileSnapShotId: z.string()
})

export const membersProfileSnapshotsListSchema = z.array(IndividualProfilesSnapshotValidator)