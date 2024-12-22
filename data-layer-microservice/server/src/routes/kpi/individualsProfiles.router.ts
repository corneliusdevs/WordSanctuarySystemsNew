import express from "express";
import {
  clearIndivdualSnapshotsById,
  getAllIndividualProfileSnapShots,
  getIndividualProfileSnapShotsByProfileIds,
} from "../../controllers/kpi/individualProfiles.controller";

const individualProfilesRouter = express.Router();

individualProfilesRouter.get("/snapshots", getAllIndividualProfileSnapShots);

individualProfilesRouter.post("/snapshots/clear", clearIndivdualSnapshotsById);

individualProfilesRouter.post(
  "/snapshots/byProfileIds",
  getIndividualProfileSnapShotsByProfileIds
);

export default individualProfilesRouter;
