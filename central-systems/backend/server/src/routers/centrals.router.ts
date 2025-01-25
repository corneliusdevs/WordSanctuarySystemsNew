import express from "express";
import { createCentralProfileController,
    deleteCentralProfileByIdController,
    getAllCentralsProfilesControler,
    getCentralProfileByIdControler,
    updateCentralProfileByIdController } from "../controllers/central.controller";
// import {
//   createCentralProfile,
//   deleteCentralProfileById,
//   getAllCentralsProfiles,
//   getCentralProfileById,
//   updateCentralProfileById,
// } from "../../../controllers/postgres/profiles/centralController.";

const centralsRouter = express.Router();

centralsRouter.get("/fetch/:centralId", getCentralProfileByIdControler);

centralsRouter.get("/all", getAllCentralsProfilesControler)

centralsRouter.post("/create", createCentralProfileController);

centralsRouter.post("/update", updateCentralProfileByIdController);

centralsRouter.post("/delete", deleteCentralProfileByIdController);


export default centralsRouter;
