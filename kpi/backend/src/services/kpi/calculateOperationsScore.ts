import { DepartmentKpiMetaData } from "../../validators/calculateKpiValidator";
import * as z from "zod";

export const getOperationsScoreService = (
  parameters: z.infer<typeof DepartmentKpiMetaData>
) => {
  const operational_details = parameters.operational_details;

  {
    /* NOTE ALL OPERATIONAL SCORES ARE GRADED OVER 5. MINIMUM IS -1 MAXIMUM SCORE IS 5 */
  }

  //  find the average of the operational_excellence_grade and the operational_punctuality_grade
  const operational_excellence_score =
    (operational_details.operational_excellence_grade +
      operational_details.operational_punctuality_grade) /
    2;

  // find the average of the operational_human_resource_grade, operational_time_grade and the operational_finance_grade
  const operational_methodology_score =
    (operational_details.operational_human_resource_grade +
      operational_details.operational_time_grade +
      operational_details.operational_finance_grade +
      operational_details.attitude_score) /
    4;

  //  find the average of the operational_excellence_grade and the operational_methodology_score
  const operational_efficiency_score =
    (operational_details.operational_excellence_grade +
      operational_details.operational_human_resource_grade +
      operational_details.operational_time_grade +
      operational_details.operational_finance_grade) /
    4;

  return {
    operational_excellence_score: (operational_excellence_score / 5) * 100, // express in percentage
    operational_methodology_score: (operational_methodology_score / 5) * 100, // express in percentage
    operational_efficiency_score: (operational_efficiency_score / 5) * 100, // express in percentage
  };
};
