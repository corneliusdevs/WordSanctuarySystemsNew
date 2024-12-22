import { DepartmentSnapShotSchema } from "../../validators/calculateKpiValidator";
import { getExpectedCashFlowFromDepartment } from "./getExpectedMonthlyCashFlow";
import * as z from "zod"

export const getDeptFinanceScoreService = (
  departmentSnapShot: z.infer<typeof DepartmentSnapShotSchema>,
  cummulative_cash_flow: number,
  cash_flow_duration_in_wks: number // the time frame in weeks which the money was given
) => {
  try {
    const actual_cummulative_cash_flow = cummulative_cash_flow;  // total amount recorded as income 
    const parsedSnapshot = DepartmentSnapShotSchema.parse(departmentSnapShot);
    const expectedCashFlow = getExpectedCashFlowFromDepartment(parsedSnapshot);

    const number_of_months = cash_flow_duration_in_wks / 4; // since there are four weeks in a month
    const expected_cummulative_cash_flow = expectedCashFlow * number_of_months; // the expected cashflow if everyone should give their dues monthly

    const finance_score = (actual_cummulative_cash_flow / expected_cummulative_cash_flow) * 100 // this is expresed in percentage

    return finance_score;
  } catch (err) {
    console.log(`getDeptFinanceScoreService encountered an error `, err);
    return NaN;
  }
};
