import express, { Request, Response } from "express";
import {
  DepartmentKpiMetaData,
  DepartmentSnapShotSchema,
} from "../validators/calculateKpiValidator";
import { ZodError } from "zod";
import { CENTRAL_KPI_ENDPOINT } from "../configs/externalApis";
import { getDeptFinanceScoreService } from "../services/kpi/calculateFinanceScore";
import { getOperationsScoreService } from "../services/kpi/calculateOperationsScore";
import { getPeopleScoreService } from "../services/kpi/calculatePeopleScore";
import { getDepartmentKpiResultByIdService } from "../services/getDepartmentKpiResultService";

export const getDepartmentKpiById = async (req: Request, res: Response) => {
  try {
    const req_params = req.params;
    if (!req_params?.departmentId) {
      res.status(400).json({
        message: `Missing department Id Parameter in request url`,
      });

      return;
    }

    //  get department kpi result service
    const department_kpi_result = await getDepartmentKpiResultByIdService(
      req_params.departmentId
    );

    res.status(200).json({
      department_kpi_result: department_kpi_result,
      success: true
    });

  } catch (err) {
    console.log(`error handling getDepartmentKpiById `, err);

    res.status(500).json({
      message: `Internal Server error`,
      success: false
    });
  }
};

export const calculateDepartmentKpi = async (req: Request, res: Response) => {
  try {
    const parsedBody = DepartmentKpiMetaData.parse(req.body);
    const departmentSnapShot = await fetch(
      `${CENTRAL_KPI_ENDPOINT}/departments/snapshots/id/${parsedBody.department_id}`
    ) // get the departmentSnapShot
      .then((result) => {
        return result.json();
      })
      .catch((err) => {
        console.error(
          "error fetching departmentSnapShot from calculate department snapShot ",
          err
        );
        throw new Error(`Error fetching departmental snapshot`);
      });

    // parse the snapshot before going further
    const parsedSnapshot = DepartmentSnapShotSchema.parse(
      departmentSnapShot?.data
    );

    //   calculate the finance score
    const finance_score = getDeptFinanceScoreService(
      parsedSnapshot,
      parsedBody.finance_details.cummulative_cash_flow,
      parsedBody.finance_details.cash_flow_duration_in_wks
    );

    // calculate the operations score
    const operations_scores = getOperationsScoreService(parsedBody);

    // calculate the people's score
    const people_score = await getPeopleScoreService(
      parsedBody,
      departmentSnapShot?.data
    );

    // save the result in the database
    const savedKpiResult = await fetch(
      `${CENTRAL_KPI_ENDPOINT}/departments/results/save`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          kpi_parameters: parsedBody,
          kpi_results: {
            finance_score,
            operations_scores,
            people_score,
          },
        }),
      }
    );

    console.log("saved response is ", await savedKpiResult.json());

    res.status(200).json({
      message: "KPI successfully calculated.",
      finance_score,
      operations_scores,
      people_score,
    });

    return;
  } catch (err) {
    console.error("encountered an error while calculating kpi ", err);
    if (err instanceof ZodError) {
      res
        .status(400)
        .json({ message: "Invalid inputs", errorMessage: err.errors });
      return;
    }

    res.status(500).json({
      message: "Error calcuating kpi",
      errorMessage: err,
    });

    return;
  }
};
