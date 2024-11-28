import express from "express"
import { createInstallationProfile, deleteInstallationProfileById, getAllInstallationProfiles, getInstallationProfileById, updateInstallationProfileById } from "../../../controllers/postgres/profiles/installationController"

const installationsRouter = express.Router()

installationsRouter.get("/fetch/:installationId", getInstallationProfileById)
installationsRouter.post("/create", createInstallationProfile)
installationsRouter.post("/update", updateInstallationProfileById)
installationsRouter.post("/delete", deleteInstallationProfileById)
installationsRouter.get("/all", getAllInstallationProfiles)


export default installationsRouter