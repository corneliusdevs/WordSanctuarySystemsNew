"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const installations_controller_1 = require("../controllers/installations.controller");
// import { createInstallationProfile, deleteInstallationProfileById, getAllInstallationProfiles, getInstallationProfileById, updateInstallationProfileById } from "../../../controllers/postgres/profiles/installationController"
const installationsRouter = express_1.default.Router();
installationsRouter.get("/fetch/:installationId", installations_controller_1.getInstallationsProfileById);
installationsRouter.post("/create", installations_controller_1.createInstallationsProfile);
installationsRouter.post("/update", installations_controller_1.updateInstallationsProfile);
installationsRouter.post("/delete", installations_controller_1.deleteInstallationsProfileById);
installationsRouter.get("/all", installations_controller_1.getAllInstallationsProfiles);
exports.default = installationsRouter;
