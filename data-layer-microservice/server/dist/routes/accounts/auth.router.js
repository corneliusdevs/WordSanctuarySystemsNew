"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const accessRequest_controller_1 = require("../../controllers/accounts/accessRequest.controller");
const login_controller_1 = require("../../controllers/accounts/login.controller");
const authRouter = express_1.default.Router();
authRouter.post("/access/request", accessRequest_controller_1.createAccessRequestController);
authRouter.post("/request/login", login_controller_1.loginRequestController);
authRouter.post("/request/login/getCredentials", login_controller_1.getLoginCredentailsController);
//  authRouter.post("/access/request/process", createAccessRequestController)
authRouter.get("/access/requests/all", accessRequest_controller_1.getAllAccessRequests);
exports.default = authRouter;
