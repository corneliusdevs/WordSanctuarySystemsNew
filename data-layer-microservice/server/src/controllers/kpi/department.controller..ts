import { Request, Response } from "express";
import {
  clearDepartmentSnapshotService,
  getAllDepartmentsSnapShotsService,
  getDepartmentKpiResultByIdService,
  getDepartmentProfileByIdService,
  saveDepartmentKpiResultService,
  saveDepartmentMembersProfileSnapShotsService,
  saveDepartmentSnapshotByIdService,
} from "../../services/departmentService";
import { DepartmentalIdValidator } from "../validators/createDepartmentProfileValidator";
import { mongoDbClient } from "../../db_connections/prismaClients";
import { ZodError } from "zod";
import { SaveDeparmentKpiResultsInputValidator } from "../../types/mongodb_types";

export const createDepartmentSnapshot = async (req: Request, res: Response) => {
  try {
    const parsedBody = DepartmentalIdValidator.parse(req.body);
    const department_id = parsedBody.department_id;

    // get the snapshot
    const getDepartmentProfile = await getDepartmentProfileByIdService(
      department_id
    );

    if (getDepartmentProfile) {
      // save the snapshot
      const savedDepartentSnapShot = await saveDepartmentSnapshotByIdService(
        getDepartmentProfile
      );

      // create the snapshots of the members in the department.
      const createdMembersSnapshotsResponse =
        await saveDepartmentMembersProfileSnapShotsService(
          getDepartmentProfile?.members
        );

      // return the response
      res.status(201).json({
        message: "snapshots created successfully",
        data: savedDepartentSnapShot,
      });
    } else {
      res.status(400).json({
        message: "could not get department profile",
        data: "",
      });
    }
  } catch (err) {
    console.error(
      `could not process create department snapshot request: ${err}`
    );

    if (err instanceof ZodError) {
      res.status(400).json({
        success: false,
        message: `Invalid Inputs`,
        error: err.errors,
      });

      return;
    }

    res.status(500).json({
      success: false,
      message: `could not process create department snapshot request. please try again later`,
      error: err,
    });
  }
};

export const getAllDepartmentsSnapShots = async (
  req: Request,
  res: Response
) => {
  try {
    const allDepartmentsSnapShots = await getAllDepartmentsSnapShotsService();

    res.status(200).json({
      departmentSnapshots: allDepartmentsSnapShots,
    });
  } catch (err) {
    console.error("could not get snapshots for all departments ", err);

    res.status(500).json({
      departmentSnapshots: null,
      message: "could not fetch all department snapshots",
    });
  }
};

export const clearDepartmentSnapshot = async (req: Request, res: Response) => {
  try {
    const { department_id } = DepartmentalIdValidator.parse(req.body);

    const existingDepartmentSnapshot =
      await mongoDbClient.departmentalSnapShots.findUnique({
        where: {
          department_id: department_id,
        },
      });

    if (!existingDepartmentSnapshot) {
      // if the snapshot for that department does not exist
      res.status(401).json({
        message: `department with id: ${department_id} does not exist`,
      });

      return;
    }

    const clearedDepartmentSnapshot = (
      await clearDepartmentSnapshotService(department_id)
    ).data;

    if (clearedDepartmentSnapshot) {
      res.status(201).json({
        message: "cleared department snapshot",
        data: clearedDepartmentSnapshot,
      });
    } else {
      res.status(500).json({
        message: `could not clear snapshots for department with id ${department_id}. Please try again later`,
      });
    }
  } catch (err) {
    console.error(`could not clear snapshots of department`);

    res.status(500).json({
      message: `could not clear snapshots of department`,
    });
  }
};

export const getDepartmentKpiResultById = async (
  req: Request,
  res: Response
) => {
  try {
    const request_params = req.params;

    if (!request_params?.department_id) {
      res.status(400).json({
        message: `Missing department_id in request parameters`,
      });

      return;
    }

    const { department_id } = req.params;

    const kpiResult =
      await getDepartmentKpiResultByIdService(department_id)

    res.status(200).json({
      data: kpiResult,
      message: "success",
    });
    
  } catch (err) {
    console.error(`could not fetch snapShot of department`);
    if (err instanceof ZodError) {
      res.status(400).json({
        message: "Bad request",
        data: null,
        error: err.errors,
      });

      return;
    }

    res.status(500).json({
      message: "Internal server error. Please try again later",
      data: null,
      error: null,
    });
  }
};

export const getDepartmentSnapshotById = async (
  req: Request,
  res: Response
) => {
  try {
    const { department_id } = req.params;

    const departmentSnapShot =
      await mongoDbClient.departmentalSnapShots.findUnique({
        where: {
          department_id: department_id,
        },
      });

    res.status(200).json({
      data: departmentSnapShot,
      message: "success",
    });
  } catch (err) {
    console.error(`could not fetch snapShot of department`);
    if (err instanceof ZodError) {
      res.status(400).json({
        message: "Bad request",
        data: null,
        error: err.errors,
      });

      return;
    }

    res.status(500).json({
      message: "Internal server error. Please try again later",
      data: null,
      error: null,
    });
  }
};

export const saveDepartmentKpiResult = async (req: Request, res: Response) => {
  try {
    const parsedBody = SaveDeparmentKpiResultsInputValidator.parse(req.body);

    const savedResults = await saveDepartmentKpiResultService(
      parsedBody.kpi_parameters,
      parsedBody.kpi_results
    );

    console.log("saved results from db are ", savedResults);

    res.status(200).json({
      results: savedResults,
    });
  } catch (err) {
    console.error("could not save kpi results for all departments ", err);

    res.status(500).json({
      results: null,
      message: "could not save kpi results for department",
    });
  }
};
