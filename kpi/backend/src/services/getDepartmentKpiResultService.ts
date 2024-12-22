import { CENTRAL_KPI_ENDPOINT } from "../configs/externalApis";

export const getDepartmentKpiResultByIdService = async (
  departmentId: string
) => {
  try {
    const kpi_result = await fetch(
      `${CENTRAL_KPI_ENDPOINT}/departments/kpi/id/${departmentId}`
    ) // get the departmentSnapShot
      .then((result) => {
        return result.json();
      })
      .catch((err) => {
        console.error(
          "error fetching kpi result from getDepartmentKpiResultByIdService ",
          err
        );
        throw new Error(`Error fetching departmental snapshot`);
      });

    return kpi_result;
  } catch (err) {
    console.log(`getDepartmentKpiResultByIdService encountered an error `, err);

    return null;
  }
};
