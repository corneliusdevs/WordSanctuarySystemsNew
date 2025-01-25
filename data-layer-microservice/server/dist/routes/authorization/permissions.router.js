"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const permissions_controller_1 = require("../../controllers/permissions/permissions.controller");
const permissionsRouter = express_1.default.Router();
permissionsRouter.post("/create", permissions_controller_1.addResourceWithPermissionToDbController);
permissionsRouter.post("/delete", permissions_controller_1.deleteResorceWithPermissionFromDbById);
permissionsRouter.get("/all", permissions_controller_1.getAllResourcesWithPermissionsFromDbController);
// work on this later
permissionsRouter.post("/grant-permission-to-user", permissions_controller_1.addResourceAndPermissionToUserAccountController);
exports.default = permissionsRouter;
