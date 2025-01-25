import { Request, Response } from "express";
import { mongoDbClient } from "../../db_connections/prismaClients";
import {
  AddAccountToUserAccountProfileValidator,
  UserAccountProfileSchemaType,
} from "../validators/accounts/accountsValidators";
import { ZodError } from "zod";

export const addAccountToUserAccountProfileController = async (
  req: Request,
  res: Response
) => {
  try {
    const parsedBody = AddAccountToUserAccountProfileValidator.parse(req.body);

    //    check if the account is registered in the system
    const existingAccountProfile =
      await mongoDbClient.userAccountsProfile.findUnique({
        where: {
          profile_id: parsedBody.profile_id,
        },
      });

    if (existingAccountProfile) {
      const parsedExistingAccountProfile = UserAccountProfileSchemaType.parse(
        existingAccountProfile
      );
      const previousAccountsList = parsedExistingAccountProfile.accounts;

      const updatedAccountsList = previousAccountsList.includes(
        parsedBody.account_to_add_to_profile
      )
        ? previousAccountsList
        : [...previousAccountsList, parsedBody.account_to_add_to_profile];

      //   add the specified account to the user account profile
      const profileWithAccountAdded =
        await mongoDbClient.userAccountsProfile.update({
          where: {
            profile_id: parsedBody.profile_id,
          },
          data: {
            accounts: updatedAccountsList,
          },
        });

      if (profileWithAccountAdded) {
        // send a response
        res.status(201).json({
          success: true,
          message: "Account added",
        });

        return;
      }

      res.status(500).json({
        success: false,
        message: "Operation failed",
      });

      return;
    } else {
      const updatedAccountProfile =
        await mongoDbClient.userAccountsProfile.create({
          data: {
            profile_id: parsedBody.profile_id,
            accounts: [parsedBody.account_to_add_to_profile],
            permissions: [],
          },
        });

      if (updatedAccountProfile) {
        // send a response
        res.status(201).json({
          success: true,
          message: "Account added",
        });

        return;
      }
    }

    res.status(500).json({
      success: false,
      message: "Oops something went wrong!",
    });

    return;
  } catch (err) {
    console.log(`addAccountToUserAccountProfileController  encountered an error `, err);

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
