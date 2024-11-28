import { DepartmentInCentralType } from "../../../types/general";

import * as z from "zod";

export interface TCreateCentralProfile {
  department_Class_name: string;
  description: string;
}

export const CreateDepartmentClassSchema = z.object({
  department_Class_name: z.string().min(3, {
    message: "department_Class_name must be at least 3 characters",
  }),
  description: z.string().min(3, {
    message: "description must be at least 3 characters",
  }),
});

export const UpdateDepartmentClassSchema = z.object({
  department_class_id: z.string(),
  department_Class_name: z
    .string()
    .min(3, {
      message: "department_Class_name must be at least 3 characters",
    })
    .optional(),
  description: z
    .string()
    .min(3, {
      message: "description must be at least 3 characters",
    })
    .optional(),
});

export const DepartmentClassIdValidator = z.object({
  department_class_id: z.string().min(7, {
    message: "invalid department_class_id",
  }),
});
