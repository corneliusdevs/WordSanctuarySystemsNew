import * as z from "zod";

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

  export const DepartementKpiIdValidator = z.object({
      department_id: z.string().min(7, {
        message: "invalid department_id",
      }),
    });