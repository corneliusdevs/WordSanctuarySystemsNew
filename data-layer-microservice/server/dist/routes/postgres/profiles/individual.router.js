"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const individualController_1 = require("../../../controllers/postgres/profiles/individualController");
const individualsRouter = express_1.default.Router();
individualsRouter.get("/fetch/:profileId", individualController_1.getIndividualProfileById);
individualsRouter.post("/getbyemail", individualController_1.getIndividualProfileByEmail);
individualsRouter.post("/getbygivingnumber", individualController_1.getIndividualProfileByGivingNumber);
individualsRouter.get("/all", individualController_1.getAllIndividualProfiles);
individualsRouter.post("/create", individualController_1.createIndividualProfile);
individualsRouter.post("/update", individualController_1.updateIndividualProfileById);
individualsRouter.post("/delete", individualController_1.deleteIndividualProfileById);
exports.default = individualsRouter;
