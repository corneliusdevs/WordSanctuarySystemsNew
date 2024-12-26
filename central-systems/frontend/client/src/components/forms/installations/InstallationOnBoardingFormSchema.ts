import { InstallationMember, InstallationMemberRoles } from "@/types/general";
import * as z from "zod";
  
  export interface TCreateInstallationProfile {
    name: string;
    finance_id: string;
    members: InstallationMember[];
  }
  
  export const CreateInstallationProfileSchema = z.object({
    name: z.string().min(3, {
      message: "name must be at least 3 characters",
    }),
    finance_id: z.string().min(4, {
      message: "invalid finance_id field",
    }),
    members: z
      .array(
        z.object({
          role: z.enum([
            InstallationMemberRoles.HEAD_OF_INSTALLATION,
            InstallationMemberRoles.HEAD_WORKER,
            InstallationMemberRoles.LEADER,
            InstallationMemberRoles.MEMBER,
            InstallationMemberRoles.MINISTER_IN_CHARGE,
            InstallationMemberRoles.WORKER,
          ]),
          profile_id: z.string().min(7, {
            message: "Invalid member profile_id",
          }),
        })
      )
      .min(1, {
        message: "Installations must have at least 1 member",
      }),
  });
  
  export const UpdateInstallationProfileSchema = z.object({
    installation_id: z.string(),
    name: z.string().min(3, {
      message: "name must be at least 3 characters",
    }).optional(),
    finance_id: z.string().min(7, {
      message: "invalid finance_id field",
    }).optional(),
    members: z
      .array(
        z.object({
          role: z.enum([
            InstallationMemberRoles.HEAD_OF_INSTALLATION,
            InstallationMemberRoles.HEAD_WORKER,
            InstallationMemberRoles.LEADER,
            InstallationMemberRoles.MEMBER,
            InstallationMemberRoles.MINISTER_IN_CHARGE,
            InstallationMemberRoles.WORKER,
          ]),
          profile_id: z.string().min(7, {
            message: "Invalid member profile_id",
          }),
        })
      )
      .min(1, {
        message: "Installations must have at least 1 member",
      }).optional(),
  });
  
  export const InstallationIdValidator = z.object({
    installation_id: z.string().min(7, {
      message: "invalid installation_id",
    }),
  });
  
  export const extractProfileIds = (members: InstallationMember[]): string[]=>{
      const profileIds: string[] = []
      members.forEach((member)=>{
        profileIds.push(member.profile_id)
      })
  
      return profileIds
  }
  