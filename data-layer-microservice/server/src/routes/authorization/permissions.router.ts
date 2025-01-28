import express from 'express'
import { addResourceAndPermissionToUserAccountController, addResourceWithPermissionToDbController, deleteResorceWithPermissionFromDbById, getAllResourcesWithPermissionsFromDbController } from '../../controllers/permissions/permissions.controller'

 const permissionsRouter = express.Router()

 permissionsRouter.post("/create", addResourceWithPermissionToDbController)
 permissionsRouter.post("/delete", deleteResorceWithPermissionFromDbById)
 permissionsRouter.get("/all", getAllResourcesWithPermissionsFromDbController)

 // work on this later
 permissionsRouter.post("/grant-permission-to-user", addResourceAndPermissionToUserAccountController)


export default permissionsRouter 
