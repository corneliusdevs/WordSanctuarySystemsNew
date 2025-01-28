"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveDeparmentKpiResultsInputValidator = exports.SavedKpiResultsListValidator = exports.CalculatedKpiScoreResultSchema = exports.SavedKpiResultsTypeSchema = exports.DepartmentProfileHistoryValidator = exports.LifeClassIndexSchema = void 0;
const z = __importStar(require("zod"));
const general_1 = require("../general");
exports.LifeClassIndexSchema = z.object({
    profile_id: z.string(),
    full_name: z.string(),
    previous_topic: z.number(),
    current_topic: z.number(),
    growth_index: z.number(),
    time_frame_lower_limit: z.number(),
    time_frame_upper_limit: z.number()
});
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
exports.DepartmentProfileHistoryValidator = z.object({
    department_id: z.string(),
    department_name: z.string(),
    department_type: z.string(),
    description: z.string(),
    finance_id: z.string(),
    installation_id: z.string(),
    members: z.array(z.object({
        role: z.enum([
            general_1.DeptMemberRole.ASSISTANT_HEAD_OF_DEPARTMENT,
            general_1.DeptMemberRole.EXECUTIVE_ASSISTANT,
            general_1.DeptMemberRole.EVANGELISM_ASSISTANT,
            general_1.DeptMemberRole.FINANCE_ASSISTANT,
            general_1.DeptMemberRole.HEAD_OF_DEPARTMENT,
            general_1.DeptMemberRole.MEMBER,
            general_1.DeptMemberRole.PRAYER_ASSISTANT,
            general_1.DeptMemberRole.WORKER,
        ]),
        profile_id: z.string(),
        leaderShipLevel: z.enum([
            general_1.Heirarchy.PASTOR,
            general_1.Heirarchy.MINISTER,
            general_1.Heirarchy.HOD,
            general_1.Heirarchy.ASSISTANT_HOD,
            general_1.Heirarchy.EXECUTIVE_ASSISTANT,
            general_1.Heirarchy.WORKER,
            general_1.Heirarchy.MEMBER,
        ]),
    })),
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
});
exports.SavedKpiResultsTypeSchema = z.object({
    department_id: z.string(),
    dept_kpi_result_id: z.string(),
    kpis: z.array(z.object({
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
                    membership_history_within_time_range: z.array(exports.DepartmentProfileHistoryValidator),
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
                    lifeclass_indexes: z.array(exports.LifeClassIndexSchema),
                    lifeclass_factor: z.number(),
                }),
            }),
        }),
        parameters: DepartmentKpiMetaData,
        result_date: z.number(),
    })),
    // createdAt: z.string(),
    // modifiedAt: z.string(),
});
exports.CalculatedKpiScoreResultSchema = z.object({
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
            membership_history_within_time_range: z.array(exports.DepartmentProfileHistoryValidator),
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
            lifeclass_indexes: z.array(exports.LifeClassIndexSchema),
            lifeclass_factor: z.number(),
        }),
    }),
});
exports.SavedKpiResultsListValidator = z.array(exports.SavedKpiResultsTypeSchema);
exports.SaveDeparmentKpiResultsInputValidator = z.object({
    kpi_parameters: DepartmentKpiMetaData,
    kpi_results: exports.CalculatedKpiScoreResultSchema
});
