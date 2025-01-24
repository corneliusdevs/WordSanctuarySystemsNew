import express from "express"
import { createInstallationsProfile, deleteInstallationsProfileById, getAllInstallationsProfiles, getInstallationsProfileById, updateInstallationsProfile } from "../controllers/installations.controller"
// import { createInstallationProfile, deleteInstallationProfileById, getAllInstallationProfiles, getInstallationProfileById, updateInstallationProfileById } from "../../../controllers/postgres/profiles/installationController"

const installationsRouter = express.Router()

installationsRouter.get("/fetch/:installationId", getInstallationsProfileById)
installationsRouter.post("/create", createInstallationsProfile)
installationsRouter.post("/update", updateInstallationsProfile)
installationsRouter.post("/delete", deleteInstallationsProfileById)
installationsRouter.get("/all", getAllInstallationsProfiles)


export default installationsRouter