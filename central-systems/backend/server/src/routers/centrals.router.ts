import express from "express";
import { createCentralProfileController } from "../controllers/central.controller";
// import {
//   createCentralProfile,
//   deleteCentralProfileById,
//   getAllCentralsProfiles,
//   getCentralProfileById,
//   updateCentralProfileById,
// } from "../../../controllers/postgres/profiles/centralController.";

const centralsRouter = express.Router();

// centralsRouter.get("/fetch/:centralId", getCentralProfileById);

// centralsRouter.get("/all", getAllCentralsProfiles)

centralsRouter.post("/create", createCentralProfileController);

// centralsRouter.post("/update", updateCentralProfileById);

// centralsRouter.post("/delete", deleteCentralProfileById);


export default centralsRouter;
