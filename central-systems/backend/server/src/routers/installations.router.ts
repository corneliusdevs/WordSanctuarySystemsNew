import express from "express"
import { createInstallationsProfile, getAllInstallationsProfiles } from "../controllers/installations.controller"
// import { createInstallationProfile, deleteInstallationProfileById, getAllInstallationProfiles, getInstallationProfileById, updateInstallationProfileById } from "../../../controllers/postgres/profiles/installationController"

const installationsRouter = express.Router()

// installationsRouter.get("/fetch/:installationId", getInstallationProfileById)
installationsRouter.post("/create", createInstallationsProfile)
// installationsRouter.post("/update", updateInstallationProfileById)
// installationsRouter.post("/delete", deleteInstallationProfileById)
installationsRouter.get("/all", getAllInstallationsProfiles)


export default installationsRouter