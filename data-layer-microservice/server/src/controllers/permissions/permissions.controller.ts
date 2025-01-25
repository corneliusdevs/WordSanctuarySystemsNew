import { Request, Response } from "express";
import { ZodError } from "zod";
import {
  AddPermissionToUserAccountProfile,
  CreatePermissionInDbValidator,
  DeletePermissionFromDbValidator,
} from "../validators/permissions/permissionsValidators";
import { mongoDbClient } from "../../db_connections/prismaClients";
import { UserAccountProfileSchemaType } from "../validators/accounts/accountsValidators";

export const addResourceWithPermissionToDbController = async (
  req: Request,
  res: Response
) => {
  try {
    const parsedBody = CreatePermissionInDbValidator.parse(req.body);

    // check if the resource with permission is registered in the system
    const existingPermission = await mongoDbClient.resources.findFirst({
      where: {
        resource_name: parsedBody.resource_name,
        permission: parsedBody.permission_type,
      },
    });

    if (existingPermission) {
      res.status(409).json({
        success: false,
        message: "Permission exists!",
      });

      return;
    }

    const response = await mongoDbClient.resources.create({
      data: {
        resource_name: parsedBody.resource_name,
        permission: parsedBody.permission_type,
      },
    });

    if (response) {
      res.status(201).json({
        success: true,
        message: "Permission created",
      });

      return;
    }

    res.status(500).json({
      success: false,
      message: "Oops something went wrong!",
    });

    return;
  } catch (err) {
    console.log(
      `addResourceWithPermissionToDbController  encountered an error `,
      err
    );

    if (err instanceof ZodError) {
      res.status(400).json({
        success: false,
        error: err.errors,
        message: "Bad request",
      });

      return;
    }

    res.status(500).json({
      success: false,
      message: "Oops something went wrong",
    });

    return;
  }
};

export const getAllResourcesWithPermissionsFromDbController = async (
  req: Request,
  res: Response
) => {
  try {
    const permissions = await mongoDbClient.resources.findMany();

    res.status(200).json({
      success: true,
      data: permissions,
    });

    return;
  } catch (err) {
    console.log(
      `getAllResourcesWithPermissionsFromDbController  encountered an error `,
      err
    );

    res.status(500).json({
      success: false,
      message: "Oops something went wrong!",
      data: null,
    });

    return;
  }
};

export const deleteResorceWithPermissionFromDbById = async (
  req: Request,
  res: Response
) => {
  try {
    const parsedBody = DeletePermissionFromDbValidator.parse(req.body);

    // check if the record to be deleted is in the database, else, refuse the delete request
    const isInDb = await mongoDbClient.resources.findFirst({
      where: {
        resource_id: parsedBody.resource_id,
      },
    });

    if (!isInDb) {
      res.status(404).json({
        message: `Permission does not exist`,
      });
    } else {
      const result = await mongoDbClient.resources.delete({
        where: {
          resource_id: parsedBody.resource_id,
        },
      });

      if (result.resource_id === parsedBody.resource_id) {
        res.status(200).json({
          success: true,
          message: "Operation succesfull",
        });
        return;
      }
    }

    res.status(500).json({
      success: false,
      message: "Operation failed. Please Try again later",
      errorMessage: "Internal server error",
    });
  } catch (err) {
    console.log(
      `deleteResorceWithPermissionFromDbById controller encountered an error `,
      err
    );
    if (err instanceof ZodError) {
      res.status(400).json({
        success: false,
        message: "Invalid resource_id field",
        errorMessage: err.errors,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Operation failed. Try again later",
        errorMessage: "Internal server error",
      });
    }
  }
};

export const addResourceAndPermissionToUserAccountController = async (
  req: Request,
  res: Response
) => {
  try {
    const parsedBody = AddPermissionToUserAccountProfile.parse(req.body);

    //    check if the resource and permission is registered in the system
    const permissionToGrantUser = await mongoDbClient.resources.findFirst({
      where: {
        resource_name: parsedBody.resource_name,
        permission: parsedBody.permission_type,
      },
    });

    if (!permissionToGrantUser) {
      res.status(404).json({
        success: false,
        message: "No resource with such permission exists!",
      });

      return;
    }

    // get the userAccountProfile associated with the profile_id provided in request
    const existingUserAccountProfile =
      await mongoDbClient.userAccountsProfile.findUnique({
        where: {
          profile_id: parsedBody.profile_id,
        },
      });

    if (!existingUserAccountProfile) {
      res.status(404).json({
        success: false,
        message: "No account Profile associate with this profile_id!",
      });

      return;
    }

    // parse the returned user Account profile to make sure the returned data is of the desired shape
    const parsedUserAccountProfile = UserAccountProfileSchemaType.parse(
      existingUserAccountProfile
    ); // this may throw a zod error if the existingUserAccountProfile is not of the expected shape

    const response = await mongoDbClient.userAccountsProfile.update({
      where: {
        profile_id: parsedBody.profile_id,
      },
      data: {
        permissions: [
          ...parsedUserAccountProfile.permissions,
          {
            resource_name: permissionToGrantUser.resource_name,
            resource_id: permissionToGrantUser.resource_id,
            permission: permissionToGrantUser.permission,
          },
        ], // add a new permission to the existing permissions
      },
    });

    if (response) {
      res.status(201).json({
        success: true,
        message: "Permission Added to user account profile",
      });

      return;
    }

    res.status(500).json({
      success: false,
      message: "Oops something went wrong!",
    });

    return;
  } catch (err) {
    console.log(
      `addResourceAndPermissionToUserAccountController  encountered an error `,
      err
    );

    if (err instanceof ZodError) {
      res.status(400).json({
        success: false,
        error: err.errors,
        message: "Bad request",
      });

      return;
    }

    res.status(500).json({
      success: false,
      message: "Oops something went wrong",
    });

    return;
  }
};
