import * as z from "zod";


export enum PermissionType {
    CREATE = "CREATE",
    READ = "READ",
    UPDATE = "UPDATE",
    DELETE = "DELETE"
}

export const CreatePermissionInDbValidator = z.object({
    resource_name: z.string().min(3, {
        message: "resource_name must at least 3 characters long"
    }),
    permission_type: z.enum([PermissionType.CREATE, PermissionType.DELETE, PermissionType.READ, PermissionType.UPDATE])
})

export const AddPermissionToUserAccountProfile = z.object({
    resource_name: z.string().min(3, {
        message: "resource_name must at least 3 characters long"
    }),
    profile_id: z.string().min(7, {
        message: "profile_id must at least 7 characters long"
    }), // Is used to find the userAccount associated this profile_id
    permission_type: z.enum([PermissionType.CREATE, PermissionType.DELETE, PermissionType.READ, PermissionType.UPDATE])
})

export const DeletePermissionFromDbValidator = z.object({
    resource_id: z.string().min(7, {
        message: "Invalid resource Id"
    })
})