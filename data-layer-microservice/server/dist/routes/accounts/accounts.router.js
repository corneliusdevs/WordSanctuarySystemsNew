"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_router_1 = __importDefault(require("./auth.router"));
const inviteRequests_1 = require("../../services/accounts/inviteRequests");
const accounts_controller_1 = require("../../controllers/accounts/accounts.controller");
const accountsRouter = express_1.default.Router();
accountsRouter.use("/auth", auth_router_1.default);
accountsRouter.post("/invites/create", inviteRequests_1.createInviteRequest);
accountsRouter.post("/invites/getInvite", inviteRequests_1.getInviteTokenController);
accountsRouter.post("/add", accounts_controller_1.addAccountToUserAccountProfileController);
exports.default = accountsRouter;
