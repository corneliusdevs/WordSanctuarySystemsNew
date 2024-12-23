import { Request, Response } from "express";
import { postgresClient } from "../../../db_connections/prismaClients";
import {
  CreateDepartmetalProfileSchema,
  DepartmentalIdValidator,
  UpdateDepartmentProfileSchema,
} from "../../validators/createDepartmentProfileValidator";
import { ZodError } from "zod";
import { PrismaClientKnownRequestError } from "../../../../prisma/generated-clients/postgres/runtime/library";

export const createDepartmentProfile = async (req: Request, res: Response) => {
  try {
    const parsedBody = CreateDepartmetalProfileSchema.parse(req.body);

    // check if the department_type is a valid department class before creating it, else decline the request
    const result = await postgresClient.departmentClass.findUnique({
      where: {
        department_class_id: parsedBody.department_type,
      },
    });

    if (!result) {
      res.status(400).json({
        message: "Invalid department type",
        errorMessage: `department_type must correspond to an existing department_class_id`,
      });
    }else{

      // Validate that all centrals exist
    const centralsExist = await postgresClient.centrals.findMany({
      where: {
        central_id: {
          in: parsedBody.centrals,
        },
      },
    });

    // If the number of found centrals does not match the number of centrals in the request, 
    // it means some central IDs do not exist.
    if (centralsExist.length !== parsedBody.centrals.length) {
      const nonExistentCentrals = parsedBody.centrals.filter(
        (centralId) => !centralsExist.some((central) => central.central_id === centralId)
      );
       res.status(400).json({
        message: "Invalid central IDs",
        errorMessage: `The following central IDs do not exist: ${nonExistentCentrals.join(', ')}`,
      });
    }else{
      
      // create the profile
      const createdProfile = await postgresClient.departments.create({
        data: parsedBody,
      });
  
      if (createdProfile) {
        res.status(201).json({ message: "Profile created successfully" });
      } else {
        throw new Error(`Could Not create department profile. Try again later`);
      }
    }
    }


  } catch (err) {
    console.log("error creating department profile ", err);
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

export const getDepartmentProfileById = async (req: Request, res: Response) => {
  let departmentId = "";
  try {
    const department_id = req.params?.departmentId;

    if (!department_id) {
      res.status(404).json({
        message: "Bad Request",
        errorMessage: "Invalid or non-existent  department_id",
      });
    } else {
      const profile = await postgresClient.departments.findUnique({
        where: {
          department_id: department_id,
        },
      });

      if (profile) {
        res.status(200).json({ profile });
      } else {
        res.status(404).json({
          message: "Departmental profile not found",
          errorMessage: "Invalid or non-existent department_id",
        });
      }
    }
  } catch (err) {
    console.log(
      `error fetching department profile with id ${departmentId}`,
      err
    );
    res.status(500).json({
      message: `Could not fetch department profile with id ${departmentId}`,
      errorMessage: "Internal Server Error",
    });
  }
};

// get all the profiles
export const getAllDepartmentsProfiles = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await postgresClient.departments.findMany();
    res.status(200).json({ departmentProfiles: result });
  } catch (err) {
    console.log("error fetching all departmetal profiles ", err);
    res.status(500).json({
      message: "Could not fetch department profiles",
      errorMessage: "Internal Server Error",
    });
  }
};

export const updateDepartmentProfileById = async (
  req: Request,
  res: Response
) => {
  try {
    const parsedBody = UpdateDepartmentProfileSchema.parse(req.body);

    const { department_id, ...restProps } = parsedBody;

    const existingProfile = await postgresClient.departments.findUnique({
      where: {
        department_id: department_id,
      },
    });

    if (!existingProfile) {
      res.status(400).json({ message: "Department profile does not exist" });
      res.end(); //end the response
    } else {
      const updatedProfile = await postgresClient.departments.update({
        where: {
          department_id: department_id,
        },
        data: {
          ...restProps,
        },
      });

      if (updatedProfile) {
        res
          .status(201)
          .json({ message: "Updated department profile successfully" });
      } else {
        throw new Error(
          `Could not update department profile with id ${department_id}`
        );
      }
    }
  } catch (err) {
    console.log("update department profile error ", err);
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

export const deleteDepartmentProfileById = async (
  req: Request,
  res: Response
) => {
  try {
    const parsedBody = DepartmentalIdValidator.parse(req.body);

    // check if the record to be deleted is in the database, else, refuse the delete request
    const isInDb = await postgresClient.departments.findUnique({
      where: {
        department_id: parsedBody.department_id,
      },
    });

    if (!(isInDb?.department_id === parsedBody.department_id)) {
      res
        .status(404)
        .json({
          message: `department with id ${parsedBody.department_id} does not exist`,
        });
    } else {
      const result = await postgresClient.departments.delete({
        where: {
          department_id: parsedBody.department_id,
        },
      });

      if (result.department_id === parsedBody.department_id) {
        res.status(201).json({ message: "Operation succesfull" });
      }
    }
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({
        message: "Invalid department_id field",
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
