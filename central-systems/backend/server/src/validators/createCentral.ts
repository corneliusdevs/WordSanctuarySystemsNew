

import * as z from "zod";
import { DepartmentInCentralType } from "../types";

export interface TCreateCentralProfile {
  central_name: string;
  finance_id: string;
  description: string;
  departments: DepartmentInCentralType[]; // departmental types associated with central
}

export const CreateCentralProfileSchema = z.object({
  central_name: z.string().min(3, {
    message: "central_name must be at least 3 characters",
  }),
  finance_id: z.string().min(7, {
    message: "invalid finance_id field",
  }),
  description: z.string().min(3, {
    message: "description must be at least 3 characters",
  }),
  departments: z
    .array(
      z.object({
        department_id: z.string(),
        department_type: z.string(),
      })
    )
});

export const UpdateCentralProfileSchema = z.object({
  central_id: z.string(),
  central_name: z
    .string()
    .min(3, {
      message: "central_name must be at least 3 characters",
    })
    .optional(),
  finance_id: z
    .string()
    .min(7, {
      message: "invalid finance_id field",
    })
    .optional(),
  description: z
    .string()
    .min(3, {
      message: "description must be at least 3 characters",
    })
    .optional(),
  departments: z
    .array(
      z.object({
        department_id: z.string(),
        department_type: z.string(),
      })
    )
    .optional(),
});

export const CentralIdValidator = z.object({
  central_id: z.string().min(7, {
    message: "invalid central_id",
  }),
});
