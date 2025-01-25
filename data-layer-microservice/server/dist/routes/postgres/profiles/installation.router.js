"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const installationController_1 = require("../../../controllers/postgres/profiles/installationController");
const installationsRouter = express_1.default.Router();
installationsRouter.get("/fetch/:installationId", installationController_1.getInstallationProfileById);
installationsRouter.post("/create", installationController_1.createInstallationProfile);
installationsRouter.post("/update", installationController_1.updateInstallationProfileById);
installationsRouter.post("/delete", installationController_1.deleteInstallationProfileById);
installationsRouter.get("/all", installationController_1.getAllInstallationProfiles);
exports.default = installationsRouter;
