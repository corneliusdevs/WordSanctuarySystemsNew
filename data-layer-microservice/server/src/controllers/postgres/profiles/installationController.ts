import { Request, Response } from "express";
import { postgresClient } from "../../../db_connections/prismaClients";
import {
  CreateInstallationProfileSchema,
  extractProfileIds,
  InstallationIdValidator,
  UpdateInstallationProfileSchema,
} from "../../validtors/createInstallationProfileValidator";
import { ZodError } from "zod";
import { PrismaClientKnownRequestError } from "../../../../prisma/generated-clients/postgres/runtime/library";

export const createInstallationProfile = async (
  req: Request,
  res: Response
) => {
  try {
    const parsedBody = CreateInstallationProfileSchema.parse(req.body);

    // Validate that all profiles exist
    const extractedProfileIdsFromReq = extractProfileIds(parsedBody.members);
    const profilesExists = await postgresClient.profiles.findMany({
      where: {
        profile_id: {
          in: extractedProfileIdsFromReq,
        },
      },
    });

    // If the number of found centrals does not match the number of centrals in the request,
    // it means some central IDs do not exist.
    if (profilesExists.length !== extractedProfileIdsFromReq.length) {
      const nonExistentProfiles = extractedProfileIdsFromReq.filter(
        (profileId) =>
          !profilesExists.some((profile) => profile.profile_id === profileId)
      );
      res.status(400).json({
        message: "Invalid profile IDs",
        errorMessage: `The following profile IDs do not exist: ${nonExistentProfiles.join(
          ", "
        )}`,
      });
    } else {
      // create the installation profile
      const createdProfile = await postgresClient.installations.create({
        data: parsedBody,
      });

      if (createdProfile) {
        res
          .status(201)
          .json({ message: "Installation Profile created successfully" });
      } else {
        throw new Error(
          `Could Not create Installation profile. Try again later`
        );
      }
    }
  } catch (err) {
    console.log("error creating Installation profile ", err);
    if (err instanceof ZodError) {
      res
        .status(400)
        .json({ message: "Invalid request body", errorMessage: err.errors });
    } else if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        res.status(400).json({
          message: `The ${err.meta?.target} already exists`,
          errorMessage: "Unique constraint failed",
        });
      }
    } else {
      res.status(500).json({
        message: "Operation failed. Please try again later",
        errorMessage: "Internal server error",
      });
    }
  }
};

export const getInstallationProfileById = async (
  req: Request,
  res: Response
) => {
  let installationID = "";
  try {
    const installation_id = req.params?.installationId;
    installationID = installation_id;

    if (!installation_id) {
      res.status(404).json({
        message: "Bad Request",
        errorMessage: "Invalid or non-existent installation profile id",
      });
    } else {
      const profile = await postgresClient.installations.findUnique({
        where: {
          installation_id: installation_id,
        },
      });

      if (profile) {
        res.status(200).json({ profile });
      } else {
        res.status(404).json({
          message: "Installation profile not found",
          errorMessage: "Invalid or non-existent Installation profile Id",
        });
      }
    }
  } catch (err) {
    console.log(
      `error fetching installation profile with id ${installationID}`,
      err
    );
    res.status(500).json({
      message: `Could not fetch installation profile with id ${installationID}`,
      errorMessage: "Internal Server Error",
    });
  }
};

export const updateInstallationProfileById = async (
  req: Request,
  res: Response
) => {
  try {
    const parsedBody = UpdateInstallationProfileSchema.parse(req.body);
    const { installation_id, ...restProps } = parsedBody;

    const existingProfile = await postgresClient.installations.findUnique({
      where: {
        installation_id,
      },
    });

    if (!existingProfile) {
      res.status(400).json({ message: "Installation profile does not exist" });
      res.end(); //end the response
    } else {
      const updatedProfile = await postgresClient.installations.update({
        where: {
          installation_id: installation_id,
        },
        data: {
          ...restProps,
        },
      });

      if (updatedProfile) {
        res
          .status(201)
          .json({ message: "Updated installation profile successfully" });
      } else {
        throw new Error(
          `Could not update installation profile with id ${installation_id}`
        );
      }
    }
  } catch (err) {
    console.log("update installation profile error ", err);
    if (err instanceof ZodError) {
      res
        .status(400)
        .json({ message: "Invalid inputs", errorMessage: err.errors });
    } else if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        res.status(400).json({
          message: `The ${err.meta?.target} already exists`,
          errorMessage: "Unique constraint failed",
        });
      }
    } else {
      res.status(500).json({
        message: "Operation failed. Try again later",
        errorMessage: "Internal server error",
      });
    }
  }
};

export const getAllInstallationProfiles = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await postgresClient.installations.findMany();
    res.status(200).json({ installations: result });
  } catch (err) {
    console.log("error fetching all installations profiles ", err);
    res.status(500).json({
      message: "Could not fetch installation profiles",
      errorMessage: "Internal Server Error",
    });
  }
};

export const deleteInstallationProfileById = async (
  req: Request,
  res: Response
) => {
  try {
    const parsedBody = InstallationIdValidator.parse(req.body);

    // check if the record to be deleted is in the database, else, refuse the delete request
    const isInDb = await postgresClient.installations.findUnique({
      where: {
        installation_id: parsedBody.installation_id,
      },
    });

    if (!(isInDb?.installation_id === parsedBody.installation_id)) {
      res.status(404).json({
        message: `installation with id ${parsedBody.installation_id} does not exist`,
      });
    } else {
      const result = await postgresClient.installations.delete({
        where: {
          installation_id: parsedBody.installation_id,
        },
      });

      if (result.installation_id === parsedBody.installation_id) {
        res.status(201).json({ message: "Operation succesfull" });
      }
    }
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({
        message: "Invalid installation_id field",
        errorMessage: err.errors,
      });
    } else {
      res.status(500).json({
        message: "Operation failed. Try again later",
        errorMessage: "Internal server error",
      });
    }
  }
};
