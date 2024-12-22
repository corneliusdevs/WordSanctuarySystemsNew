import { Request, Response } from "express";
import { ZodError } from "zod";
import { PrismaClientKnownRequestError } from "../../../../prisma/generated-clients/postgres/runtime/library";
import { postgresClient } from "../../../db_connections/prismaClients";
import {
  CentralIdValidator,
  CreateCentralProfileSchema,
  UpdateCentralProfileSchema,
} from "../../validtors/createCentralProfileValidator";

export const createCentralProfile = async (req: Request, res: Response) => {
  try {
    const parsedBody = CreateCentralProfileSchema.parse(req.body);

    const createdProfile = await postgresClient.centrals.create({
      data: parsedBody,
    });

    if (createdProfile) {
      res.status(201).json({ message: "central Profile created successfully" });
    } else {
      throw new Error(`Could Not create central profile. Try again later`);
    }
  } catch (err) {
    console.log("error creating central profile ", err);
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


export const getAllCentralsProfiles = async (req: Request, res: Response) => {
  try {
    const result = await postgresClient.centrals.findMany();
    res.status(200).json({ centrals: result });
  } catch (err) {
    console.log("error fetching all centrals profiles ", err);
    res.status(500).json({
      message: "Could not fetch centrals profiles",
      errorMessage: "Internal Server Error",
    });
  }
};


export const getCentralProfileById = async (req: Request, res: Response) => {
  let centralID = "";
  try {
    const central_id = req.params?.centralId;
    centralID = central_id;

    if (!central_id) {
      res.status(404).json({
        message: "Bad Request",
        errorMessage: "Invalid or non-existent central profile id",
      });
    } else {
      const profile = await postgresClient.centrals.findUnique({
        where: {
          central_id: central_id,
        },
      });

      if (profile) {
        res.status(200).json({ profile });
      } else {
        res.status(404).json({
          message: "central profile not found",
          errorMessage: "Invalid or non-existent central profile Id",
        });
      }
    }
  } catch (err) {
    console.log(`error fetching central profile with id ${centralID}`, err);
    res.status(500).json({
      message: `Could not fetch central profile with id ${centralID}`,
      errorMessage: "Internal Server Error",
    });
  }
};

export const updateCentralProfileById = async (req: Request, res: Response) => {
  try {
    const parsedBody = UpdateCentralProfileSchema.parse(req.body);
    const { central_id, ...restProps } = parsedBody;

    const existingProfile = await postgresClient.centrals.findUnique({
      where: {
        central_id: central_id,
      },
    });

    if (!existingProfile) {
      res.status(400).json({ message: "central profile does not exist" });
    } else {
      const updatedProfile = await postgresClient.centrals.update({
        where: {
          central_id: central_id,
        },
        data: {
          ...restProps,
        },
      });

      if (updatedProfile) {
        res
          .status(201)
          .json({ message: "Updated central profile successfully" });
      } else {
        throw new Error(
          `Could not update central profile with id ${central_id}`
        );
      }
    }
  } catch (err) {
    console.log("update central profile error ", err);
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

export const deleteCentralProfileById = async (req: Request, res: Response) => {
  try {
    const parsedBody = CentralIdValidator.parse(req.body);

    // check if the record to be deleted is in the database, else, refuse the delete request
    const isInDb = await postgresClient.centrals.findUnique({
      where: {
        central_id: parsedBody.central_id,
      },
    });

    if (!(isInDb?.central_id === parsedBody.central_id)) {
      res.status(404).json({
        message: `central with id ${parsedBody.central_id} does not exist`,
      });
    } else {
      const result = await postgresClient.centrals.delete({
        where: {
          central_id: parsedBody.central_id,
        },
      });

      if (result.central_id === parsedBody.central_id) {
        res.status(201).json({ message: "Operation succesfull" });
      }
    }
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({
        message: "Invalid central_id field",
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
