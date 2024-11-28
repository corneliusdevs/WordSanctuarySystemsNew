import express from "express";
import {
  createCentralProfile,
  deleteCentralProfileById,
  getAllCentralsProfiles,
  getCentralProfileById,
  updateCentralProfileById,
} from "../../../controllers/postgres/profiles/centralController.";

const centralsRouter = express.Router();

centralsRouter.get("/fetch/:centralId", getCentralProfileById);

centralsRouter.get("/all", getAllCentralsProfiles)

centralsRouter.post("/create", createCentralProfile);
centralsRouter.post("/update", updateCentralProfileById);
centralsRouter.post("/delete", deleteCentralProfileById);


export default centralsRouter;
