import { Request, Response } from "express";
import {
  clearIndividualSnapshotByIdService,
  getAllIndividualProfileSnapShotsService,
  getIndividualProfileSnapShotsByProfileIdsService,
} from "../../services/individualProfileService";
import {
  profileIdListValidator,
  profileIdValidator,
} from "../validators/createIndividualProfileValidator";
import { ZodError } from "zod";

export const getAllIndividualProfileSnapShots = async (
  req: Request,
  res: Response
) => {
  try {
    const allIndividualProfileSnapShots =
      await getAllIndividualProfileSnapShotsService();

    res.status(200).json({
      individualProfilesSnapshots: allIndividualProfileSnapShots,
    });
  } catch (err) {
    console.error("could not get snapshots for all departments ", err);

    res.status(500).json({
      individualProfilesSnapshots: null,
      message: "could not fetch all department snapshots",
    });
  }
};

export const getIndividualProfileSnapShotsByProfileIds = async (
  req: Request,
  res: Response
) => {
  try {
    const { profile_ids } = profileIdListValidator.parse(req.body);

    const allIndividualProfileSnapShots =
      await getIndividualProfileSnapShotsByProfileIdsService(profile_ids);

    res.status(200).json({
      individualProfilesSnapshots: allIndividualProfileSnapShots,
    });
  } catch (err) {
    console.error("could not get snapshots by profile_ids ", err);
    if (err instanceof ZodError) {
      res.status(400).json({
        individualProfilesSnapshots: null,
        message: "Bad request",
        error: err.errors,
      });

      return;
    }

    res.status(500).json({
      individualProfilesSnapshots: null,
      message: "could not get snapshots by profile_ids",
    });
  }
};

export const clearIndivdualSnapshotsById = async (
  req: Request,
  res: Response
) => {
  try {
    const { profile_id } = profileIdValidator.parse(req.body);
    const clearedIndividualProfileSnapShots =
      await clearIndividualSnapshotByIdService(profile_id);

    res.status(201).json({
      message: "Individual profile snapshots cleared successfully.",
      data: clearedIndividualProfileSnapShots,
    });
  } catch (err) {
    console.error("could not clear snapshots for individualProfile", err);
    if (err instanceof ZodError) {
      res.status(400).json({
        individualProfilesSnapshots: null,
        message: "Bad request",
        error: err.errors,
      });

      return;
    }
    res.status(500).json({
      individualProfilesSnapshots: null,
      message: "could not clear all individual profile snapshots",
    });
  }
};
