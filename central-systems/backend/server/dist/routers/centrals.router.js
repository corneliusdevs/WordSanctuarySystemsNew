"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const central_controller_1 = require("../controllers/central.controller");
// import {
//   createCentralProfile,
//   deleteCentralProfileById,
//   getAllCentralsProfiles,
//   getCentralProfileById,
//   updateCentralProfileById,
// } from "../../../controllers/postgres/profiles/centralController.";
const centralsRouter = express_1.default.Router();
centralsRouter.get("/fetch/:centralId", central_controller_1.getCentralProfileByIdControler);
centralsRouter.get("/all", central_controller_1.getAllCentralsProfilesControler);
centralsRouter.post("/create", central_controller_1.createCentralProfileController);
centralsRouter.post("/update", central_controller_1.updateCentralProfileByIdController);
centralsRouter.post("/delete", central_controller_1.deleteCentralProfileByIdController);
exports.default = centralsRouter;
