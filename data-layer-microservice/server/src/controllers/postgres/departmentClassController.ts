import { Request, Response } from "express";
import {
  CreateDepartmentClassSchema,
  DepartmentClassIdValidator,
  UpdateDepartmentClassSchema,
} from "../validators/createDepartmentalClassValidator";
import { postgresClient } from "../../db_connections/prismaClients";
import { ZodError } from "zod";
import { PrismaClientKnownRequestError } from "../../../prisma/generated-clients/postgres/runtime/library";

export const createDepartmentClass = async (req: Request, res: Response) => {
  try {
    const parsedBody = CreateDepartmentClassSchema.parse(req.body);

    const createdProfile = await postgresClient.departmentClass.create({
      data: parsedBody,
    });

    if (createdProfile) {
      res
        .status(201)
        .json({ message: "department class created successfully" });
    } else {
      throw new Error(`Could Not create department class. Try again later`);
    }
  } catch (err) {
    console.log("error creating department class ", err);
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

export const getDepartmentClassById = async (req: Request, res: Response) => {
  let departmentClassID = "";
  try {
    const department_class_id = req.params?.departmentClassID;
    departmentClassID = department_class_id;

    if (!department_class_id) {
      res.status(404).json({
        message: "Bad Request",
        errorMessage: "Invalid or non-existent department class id",
      });
    } else {
      const departmentClass = await postgresClient.departmentClass.findUnique({
        where: {
          department_class_id: department_class_id,
        },
      });

      if (departmentClass) {
        res.status(200).json({ departmentClass });
      } else {
        res.status(404).json({
          message: "department class not found",
          errorMessage: "Invalid or non-existent department class Id",
        });
      }
    }
  } catch (err) {
    console.log(
      `error fetching department class with id ${departmentClassID}`,
      err
    );
    res.status(500).json({
      message: `Could not fetch department class with id ${departmentClassID}`,
      errorMessage: "Internal Server Error",
    });
  }
};


export const getAllDepartmentClasses = async (req: Request, res: Response) => {
    try {
      const result = await postgresClient.departmentClass.findMany();
      res.status(200).json({ departmentClasses: result });
    } catch (err) {
      console.log("error fetching all department classes", err);
      res.status(500).json({
        message: "Could not fetch department classes",
        errorMessage: "Internal Server Error",
      });
    }
  };

export const deleteDepartmentClassById = async (
  req: Request,
  res: Response
) => {
  try {
    const parsedBody = DepartmentClassIdValidator.parse(req.body);

    // check if the record to be deleted is in the database, else, refuse the delete request
    const isInDb = await postgresClient.departmentClass.findUnique({
      where: {
        department_class_id: parsedBody.department_class_id,
      },
    });

    if (!(isInDb?.department_class_id === parsedBody.department_class_id)) {
      res
        .status(404)
        .json({
          message: `department class with id ${parsedBody.department_class_id} does not exist`,
        });
    } else {
      const result = await postgresClient.departmentClass.delete({
        where: {
          department_class_id: parsedBody.department_class_id,
        },
      });

      if (result.department_class_id === parsedBody.department_class_id) {
        res.status(201).json({ message: "Operation succesfull" });
      }
    }

  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({
        message: "Invalid department_class_id field",
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

export const updateDepartmentClassById = async (
  req: Request,
  res: Response
) => {
  try {
    const parsedBody = UpdateDepartmentClassSchema.parse(req.body);
    const { department_class_id, ...restProps } = parsedBody;

    const existingProfile = await postgresClient.departmentClass.findUnique({
      where: {
        department_class_id: department_class_id,
      },
    });

    if (!existingProfile) {
      res.status(400).json({ message: "department class does not exist" });
      res.end(); //end the response
    } else {
      const updatedProfile = await postgresClient.departmentClass.update({
        where: {
          department_class_id: department_class_id,
        },
        data: {
          ...restProps,
        },
      });

      if (updatedProfile) {
        res
          .status(201)
          .json({ message: "Updated department class successfully" });

          return
      } else {
        throw new Error(
          `Could not update department class with id ${department_class_id}`
        );
      }
    }
  } catch (err) {
    console.log("update department class error ", err);
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
