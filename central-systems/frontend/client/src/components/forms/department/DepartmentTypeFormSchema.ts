import * as z from  "zod"


export const CreateDepartmentClassFormSchema = z.object({
    department_class_name: z.string().min(3, {
      message: "department class name must be at least 3 characters",
    }),
    description: z.string().min(3, {
      message: "description must be at least 3 characters",
    }),
  });