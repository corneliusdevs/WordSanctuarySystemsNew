
  import { DeptMember, DeptMemberRole, Dues, Heirarchy } from "@/types/general";
import * as z from "zod";
  
  export interface TCreateDepartmentalProfile {
    department_name: string;
    description: string;
    finance_id: string;
    department_type: string;
    members: DeptMember[];
    dues_paid_per_individual: Dues[];
    installation_id: String;
    createdAt: string;
    modifiedAt: string;
  }
  
  export const CreateDepartmetalProfileSchema = z.object({
    department_name: z.string().min(3, {
      message: "department_name must be at least 3 characters",
    }),
    department_type: z.string().min(3, {
      message: "department_type must be at least 3 characters",
    }),
    description: z.string().min(3, {
      message: "description must be at least 3 characters",
    }),
    finance_id: z.string().min(7, {
      message: "invalid finance_id field",
    }),
    installation_id: z.string().min(7, {
      message: "invalid installation_id field",
    }),
    members: z
      .array(
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
            Heirarchy.MEMBER,
          ]),
        })
      )
      .min(1, {
        message: "departments must have at least 1 member",
      }),
  

      pastors_dues: z.number().min(0, {
        message: "Invalid dues amount"
      }),
      ministers_dues: z.number().min(0, {
        message: "Invalid dues amount"
      }),
      hods_dues: z.number().min(0, {
        message: "Invalid dues amount"
      }),
      asst_hods_dues: z.number().min(0, {
        message: "Invalid dues amount"
      }),
      executive_assistants_dues: z.number().min(0, {
        message: "Invalid dues amount"
      }),
      workers_dues: z.number().min(0, {
        message: "Invalid dues amount"
      }),
      members_dues: z.number().min(0, {
        message: "Invalid dues amount"
      }),

    centrals: z.string(),
  });
  
  export const UpdateDepartmentProfileSchema = z.object({
    department_id: z.string(),
    department_name: z
      .string()
      .min(3, {
        message: "department_name must be at least 3 characters",
      })
      .optional(),
    department_type: z
      .string()
      .min(3, {
        message: "department_type must be at least 3 characters",
      })
      .optional(),
    description: z
      .string()
      .min(3, {
        message: "description must be at least 3 characters",
      })
      .optional(),
    finance_id: z
      .string()
      .min(7, {
        message: "invalid finance_id field",
      })
      .optional(),
    installation_id: z
      .string()
      .min(7, {
        message: "invalid installation_id field",
      })
      .optional(),
    members: z
      .array(
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
            Heirarchy.MEMBER,
          ]),
        })
      )
      .min(1, {
        message: "departments must have at least 1 member",
      })
      .optional(),
  
    dues_paid_per_individual: z
      .object({
        pastors: z.number(),
        ministers: z.number(),
        hod: z.number(),
        asst_hod: z.number(),
        executive_assistant: z.number(),
        worker: z.number(),
        member: z.number(),
      })
      .optional(),
  
    centrals: z.array(z.string()).optional(),
  });
  
  export const DepartmentalIdValidator = z.object({
    department_id: z.string().min(7, {
      message: "invalid department_id",
    }),
  });
  
  export const DepartmentMemberArrayValidator = z.array(
    z.object({
      role: z
        .enum([
          DeptMemberRole.ASSISTANT_HEAD_OF_DEPARTMENT,
          DeptMemberRole.EXECUTIVE_ASSISTANT,
          DeptMemberRole.EVANGELISM_ASSISTANT,
          DeptMemberRole.FINANCE_ASSISTANT,
          DeptMemberRole.HEAD_OF_DEPARTMENT,
          DeptMemberRole.MEMBER,
          DeptMemberRole.PRAYER_ASSISTANT,
          DeptMemberRole.WORKER,
        ])
        .optional(),
      profile_id: z.string().min(7, {
        message: "Invalid department member profile_Id",
      }),
      leaderShipLevel: z
        .enum([
          Heirarchy.PASTOR,
          Heirarchy.MINISTER,
          Heirarchy.HOD,
          Heirarchy.ASSISTANT_HOD,
          Heirarchy.EXECUTIVE_ASSISTANT,
          Heirarchy.WORKER,
          Heirarchy.MEMBER,
        ])
        .optional(),
    })
  );
  