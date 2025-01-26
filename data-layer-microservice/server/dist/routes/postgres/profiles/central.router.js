"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const centralController_1 = require("../../../controllers/postgres/profiles/centralController.");
const centralsRouter = express_1.default.Router();
centralsRouter.get("/fetch/:centralId", centralController_1.getCentralProfileById);
centralsRouter.get("/all", centralController_1.getAllCentralsProfiles);
centralsRouter.post("/create", centralController_1.createCentralProfile);
centralsRouter.post("/update", centralController_1.updateCentralProfileById);
centralsRouter.post("/delete", centralController_1.deleteCentralProfileById);
exports.default = centralsRouter;
