import * as z from "zod"
import { CreatePermissionInDbValidator } from "../permissions/permissionsValidators"


export enum AccountTypes{
    CENTRAL_MANAGEMENT_SYSTEM = "CMS",
    KPI = "KPI",
    FINANCE = "FINANCE"
}


export const AddAccountToUserAccountProfileValidator = z.object({
    profile_id: z.string().min(7, {
        message: "invalid profile id field",
    }),
    account_to_add_to_profile: z.enum([AccountTypes.CENTRAL_MANAGEMENT_SYSTEM, AccountTypes.FINANCE, AccountTypes.KPI])
})


export const UserAccountProfileSchemaType = z.object({
    account_id: z.string(),
    profile_id: z.string(),
    accounts: z.array(z.string()),
    permissions: z.array(CreatePermissionInDbValidator),
})