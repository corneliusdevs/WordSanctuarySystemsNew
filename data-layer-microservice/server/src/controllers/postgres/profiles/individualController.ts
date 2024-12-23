import { Response, Request } from "express";
import {
  CreateIndividualProfileSchema,
  EmailValidatorObj,
  GivingNumberValidatorObj,
  profileIdValidator,
  UpdateIndividualProfileSchema,
} from "../../validators/createIndividualProfileValidator";
import { ZodError } from "zod";
import { postgresClient } from "../../../db_connections/prismaClients";
import { PrismaClientKnownRequestError } from "../../../../prisma/generated-clients/postgres/runtime/library";

// create the profile
export const createIndividualProfile = async (req: Request, res: Response) => {
  try {
    const parsedBody = CreateIndividualProfileSchema.parse(req.body);

    const createdProfile = await postgresClient.profiles.create({
      data: parsedBody,
    });

    if (createdProfile) {
      res.status(201).json({ message: "Profile created successfully" });
    } else {
      throw new Error(`Could Not create new profile. Try again later`);
    }

    console.log("request body ", parsedBody);
  } catch (err) {
    console.log("error creating individual profile ", err);
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

// get the individual profile by id
export const getIndividualProfileById = async (req: Request, res: Response) => {
  let profileID = "";
  try {
    const profileId = req.params?.profileId;
    profileID = profileId;

    if (!profileId) {
      res.status(404).json({
        message: "Bad Request",
        errorMessage: "Invalid or non-existent profileId",
      });
    } else {
      const profile = await postgresClient.profiles.findUnique({
        where: {
          profile_id: profileId,
        },
      });

      if (profile) {
        res.status(200).json({ profile });
      } else {
        res.status(404).json({
          message: "Profile not found",
          errorMessage: "Invalid or non-existent profileId",
        });
      }
    }
  } catch (err) {
    console.log(`error fetching profile with id ${profileID}`, err);
    res.status(500).json({
      message: `Could not fetch profile with id ${profileID}`,
      errorMessage: "Internal Server Error",
    });
  }
};

// get the individual profile by giving number
export const getIndividualProfileByGivingNumber = async (
  req: Request,
  res: Response
) => {
  let givingNumber: any;
  try {
    const reqBody = req.body;
    const parsedBody = GivingNumberValidatorObj.parse(reqBody);
    givingNumber = parsedBody.givingNumber;

    const profile = await postgresClient.profiles.findFirst({
      where: {
        giving_number: parsedBody.givingNumber,
      },
    });

    if (profile) {
      res.status(200).json({ profile });
    } else {
      res.status(404).json({
        message: "Profile not found",
        errorMessage: `No profile associated with giving number ${parsedBody.givingNumber}`,
      });
    }
  } catch (err) {
    console.log(
      `error fetching profile with giving number ${givingNumber}`,
      err
    );
    if (err instanceof ZodError) {
      res.status(400).json({
        message: "Invalid giving number input",
        errorMessage: err.errors,
      });
    }

    res.status(500).json({
      message: `Could not fetch profile with giving number ${givingNumber}`,
      errorMessage: "Internal Server Error",
    });
  }
};

// get the individual profile by id
export const getIndividualProfileByEmail = async (
  req: Request,
  res: Response
) => {
  let profileEmail: any;
  try {
    const reqBody = req.body;
    const parsedBody = EmailValidatorObj.parse(reqBody);
    profileEmail = parsedBody.email;

    const profile = await postgresClient.profiles.findUnique({
      where: {
        email: parsedBody.email,
      },
    });

    if (profile) {
      res.status(200).json({ profile });
    } else {
      res.status(404).json({
        message: "Profile not found",
        errorMessage: `No profile associated with email ${parsedBody.email}`,
      });
    }
  } catch (err) {
    console.log(`error fetching profile with email ${profileEmail}`, err);
    if (err instanceof ZodError) {
      res.status(400).json({
        message: "Invalid email input",
        errorMessage: err.errors,
      });
    }

    res.status(500).json({
      message: `Could not fetch profile with email ${profileEmail}`,
      errorMessage: "Internal Server Error",
    });
  }
};

// get all the profiles
export const getAllIndividualProfiles = async (req: Request, res: Response) => {
  try {
    const result = await postgresClient.profiles.findMany();
    res.status(200).json({ allProfiles: result });
  } catch (err) {
    console.log("error fetching all profiles ", err);
    res.status(500).json({
      message: "Could not fetch profiles",
      errorMessage: "Internal Server Error",
    });
  }
};

export const updateIndividualProfileById = async (
  req: Request,
  res: Response
) => {
  try {
    const parsedBody = UpdateIndividualProfileSchema.parse(req.body);
    const { profile_id, ...restProps } = parsedBody;

    const existingProfile = await postgresClient.profiles.findUnique({
      where: {
        profile_id: profile_id,
      },
    });

    if (!existingProfile) {
      res.status(400).json({ message: "Profile does not exist" });
      res.end(); //end the response
    }

    const updatedProfile = await postgresClient.profiles.update({
      where: {
        profile_id: profile_id,
      },
      data: {
        ...existingProfile,
        ...restProps,
      },
    });

    if (updatedProfile) {
      res.status(201).json({ message: "Updated profile successfully" });
    } else {
      throw new Error(`Could not update profile with id ${profile_id}`);
    }
  } catch (err) {
    console.log("update profile error ", err);
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

export const deleteIndividualProfileById = async (
  req: Request,
  res: Response
) => {
  try {
    const parsedBody = profileIdValidator.parse(req.body);

    // check if the record to be deleted is in the database, else, refuse the delete request
    const isInDb = await postgresClient.profiles.findUnique({
      where: {
        profile_id: parsedBody.profile_id,
      },
    });

    if (!(isInDb?.profile_id === parsedBody.profile_id)) {
      res
        .status(404)
        .json({
          message: `Profile with id ${parsedBody.profile_id} does not exist`,
        });
    } else {
      const result = await postgresClient.profiles.delete({
        where: {
          profile_id: parsedBody.profile_id,
        },
      });

      if (result.profile_id === parsedBody.profile_id) {
        res.status(201).json({ message: "Operation succesfull" });
      }
    }
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({
        message: "Invalid profile_id field",
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
