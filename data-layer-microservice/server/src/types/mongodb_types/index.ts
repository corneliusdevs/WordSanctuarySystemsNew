import { DepartmentSnapshotValidator } from "../../controllers/postgres/validtors/createDepartmentProfileValidator";
import * as z from "zod";
import { DeptMemberRole, Heirarchy } from "../general";

export const LifeClassIndexSchema = z.object({
  profile_id: z.string(),
  full_name: z.string(),
  previous_topic: z.number(),
  current_topic: z.number(),
  growth_index: z.number(),
  time_frame_lower_limit: z.number(),
  time_frame_upper_limit: z.number()
});

export type LifeClassIndexType = z.infer<typeof LifeClassIndexSchema>;

export type CalculatedDepartmentalKpiResultType = {
  finance_score: number;
  operations_scores: {
    operational_excellence_score: number;
    operational_methodology_score: number;
    operational_efficiency_score: number;
  };
  people_score: {
    increase_parameters: {
      increase: number;
      increase_factor: number;
      membership_history_within_time_range: z.infer<
        typeof DepartmentSnapshotValidator
      >;
    };
    leadership_parameters: {
      previous_leadership_strength: {
        pastors: number;
        ministers: number;
        hod: number;
        asst_hod: number;
        executive_assistant: number;
        worker: number;
      };
      current_leadership_strength: {
        pastors: number;
        ministers: number;
        hod: number;
        asst_hod: number;
        executive_assistant: number;
        worker: number;
      };
      leadership_index: {
        pastors: {
          increase: number;
          increase_factor: number | null;
        };
        ministers: {
          increase: number;
          increase_factor: number | null;
        };
        hods: {
          increase: number;
          increase_factor: number | null;
        };
        asst_hods: {
          increase: number;
          increase_factor: number | null;
        };
        executive_assistants: {
          increase: number;
          increase_factor: number | null;
        };
        workers: {
          increase: number;
          increase_factor: number | null;
        };
      };
    };
    retention_parameters: {
      retention_factor: number;
      current_membership: number;
      attendance_in_the_week: number;
    };
    life_class_parameters: {
      lifeclass_indexes: any[];
      lifeclass_factor: number;
    };
  };
};




const DepartmentKpiMetaData = z.object({
  department_id: z.string(),
  time_range_in_weeks: z.number(),
  finance_details: z.object({
    cummulative_cash_flow: z.number(),
    cash_flow_duration_in_wks: z.number(),
  }),
  operational_details: z.object({
    operational_punctuality_grade: z
      .number(),
    operational_excellence_grade: z
      .number(),
    operational_time_grade: z
      .number(),
    operational_human_resource_grade: z
      .number(),
    operational_finance_grade: z
      .number(),
    attitude_score: z
      .number(),
  }),
  people_details: z.object({
    did_meeting_hold: z.boolean(),
    attendance_in_the_week: z.number(),
    number_that_took_life_class_in_week: z.number(),
  }),
});

export type DepartmentKpiParameters = z.infer<typeof DepartmentKpiMetaData>;

export type SavedKpiResultsType = {
  department_id: string;
  dept_kpi_result_id: string;
  kpis: [
    {
      result_id: string;
      results: CalculatedDepartmentalKpiResultType;
      parameters: DepartmentKpiParameters;
      result_date: number;
    }
  ];
  createdAt: string;
  modifiedAt: string;
};

const LeadershipStrengthSchema = z.object({
  pastors: z.number(),
  ministers: z.number(),
  hod: z.number(),
  asst_hod: z.number(),
  executive_assistant: z.number(),
  worker: z.number(),
});

const LeadershipIndexSchema = z.object({
  increase: z.number(),
  increase_factor: z.number().nullable(),
});

export const DepartmentProfileHistoryValidator = z.object({
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
        Heirarchy.MEMBER,
      ]),
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

export const SavedKpiResultsTypeSchema = z.object({
  department_id: z.string(),
  dept_kpi_result_id: z.string(),
  kpis: z.array(
    z.object({
      result_id: z.string(),
      results: z.object({
        finance_score: z.number(),
        operations_scores: z.object({
          operational_excellence_score: z.number(),
          operational_methodology_score: z.number(),
          operational_efficiency_score: z.number(),
        }),
        people_score: z.object({
          increase_parameters: z.object({
            increase: z.number(),
            increase_factor: z.number(),
            membership_history_within_time_range: z.array(DepartmentProfileHistoryValidator),
          }),
      
          leadership_parameters: z.object({
            previous_leadership_strength: LeadershipStrengthSchema,
            current_leadership_strength: LeadershipStrengthSchema,
            leadership_index: z.object({
              pastors: LeadershipIndexSchema,
              ministers: LeadershipIndexSchema,
              hods: LeadershipIndexSchema,
              asst_hods: LeadershipIndexSchema,
              executive_assistants: LeadershipIndexSchema,
              workers: LeadershipIndexSchema,
            }),
          }),
      
          retention_parameters: z.object({
            retention_factor: z.number(),
            current_membership: z.number(),
            attendance_in_the_week: z.number(),
          }),
      
          life_class_parameters: z.object({
            lifeclass_indexes: z.array(LifeClassIndexSchema),
            lifeclass_factor: z.number(),
          }),
        }),
      }),
      parameters: DepartmentKpiMetaData,
      result_date: z.number(),
    })
  ),
  // createdAt: z.string(),
  // modifiedAt: z.string(),
});

export const CalculatedKpiScoreResultSchema = z.object({
  finance_score: z.number(),
  operations_scores: z.object({
    operational_excellence_score: z.number(),
    operational_methodology_score: z.number(),
    operational_efficiency_score: z.number(),
  }),
  people_score: z.object({
    increase_parameters: z.object({
      increase: z.number(),
      increase_factor: z.number(),
      membership_history_within_time_range: z.array(DepartmentProfileHistoryValidator),
    }),

    leadership_parameters: z.object({
      previous_leadership_strength: LeadershipStrengthSchema,
      current_leadership_strength: LeadershipStrengthSchema,
      leadership_index: z.object({
        pastors: LeadershipIndexSchema,
        ministers: LeadershipIndexSchema,
        hods: LeadershipIndexSchema,
        asst_hods: LeadershipIndexSchema,
        executive_assistants: LeadershipIndexSchema,
        workers: LeadershipIndexSchema,
      }),
    }),

    retention_parameters: z.object({
      retention_factor: z.number(),
      current_membership: z.number(),
      attendance_in_the_week: z.number(),
    }),

    life_class_parameters: z.object({
      lifeclass_indexes: z.array(LifeClassIndexSchema),
      lifeclass_factor: z.number(),
    }),
  }),

})

export const SavedKpiResultsListValidator = z.array(SavedKpiResultsTypeSchema);


export const SaveDeparmentKpiResultsInputValidator = z.object({
  kpi_parameters: DepartmentKpiMetaData,
  kpi_results: CalculatedKpiScoreResultSchema
})

export type SaveDeparmentKpiResultsInput = z.infer<typeof SaveDeparmentKpiResultsInputValidator>

export type CalculatedKpiResults = z.infer<typeof CalculatedKpiScoreResultSchema>