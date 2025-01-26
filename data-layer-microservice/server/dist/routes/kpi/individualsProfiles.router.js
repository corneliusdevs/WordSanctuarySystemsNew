"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const individualProfiles_controller_1 = require("../../controllers/kpi/individualProfiles.controller");
const individualProfilesRouter = express_1.default.Router();
individualProfilesRouter.get("/snapshots", individualProfiles_controller_1.getAllIndividualProfileSnapShots);
individualProfilesRouter.post("/snapshots/clear", individualProfiles_controller_1.clearIndivdualSnapshotsById);
individualProfilesRouter.post("/snapshots/byProfileIds", individualProfiles_controller_1.getIndividualProfileSnapShotsByProfileIds);
exports.default = individualProfilesRouter;
