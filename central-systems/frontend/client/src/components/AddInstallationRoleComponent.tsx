"use client";
import { useState } from "react";
import SelectComponent from "./SelectComponent";
import { InstallationMemberRoles } from "@/types/general";

import { useAddMemberStore } from "@/providers/AddMembersStoreProvider";
import { SelectedMemberDetails } from "./SelectedMembersViewer";

interface AddInstallationComponentRoleProps {
  memberDetails: SelectedMemberDetails;
}

export const AddInstallationComponentRole = ({
  memberDetails,
}: AddInstallationComponentRoleProps) => {
  const [selectedRole, setSelectedRole] = useState<string>(memberDetails.role);
  
  const { addInstallationMember } = useAddMemberStore(state => state)

  return (
    <div className="w-full">
      <SelectComponent
        placeholder="Add Role"
        label="select role"
        itemsToSelect={[
          {
            value: InstallationMemberRoles.HEAD_OF_INSTALLATION,
            name: InstallationMemberRoles.HEAD_OF_INSTALLATION,
          },
          {
            value: InstallationMemberRoles.HEAD_WORKER,
            name: InstallationMemberRoles.HEAD_WORKER,
          },
          {
            value: InstallationMemberRoles.MINISTER_IN_CHARGE,
            name: InstallationMemberRoles.MINISTER_IN_CHARGE,
          },
          {
            value: InstallationMemberRoles.LEADER,
            name: InstallationMemberRoles.LEADER,
          },
          {
            value: InstallationMemberRoles.WORKER,
            name: InstallationMemberRoles.WORKER,
          },
          {
            value: InstallationMemberRoles.MEMBER,
            name: InstallationMemberRoles.MEMBER,
          },
        ]}
        onValueChange={setSelectedRole}
        executeValueChangeButtonText="update"
        shouldDisplayExecuteValueChangeButton={true}
        executeValueChangeButtonStyle="bg-primarycol text-white mt-2 w-full flex justify-center"

        onValueChangeTaskFxn={() => {
          // add the member details to the state
          console.log("onValue change task function executed,");

      
            if (memberDetails) {
                addInstallationMember({
                  profile_id: memberDetails.profile_id,
                  role: selectedRole,
                  name: memberDetails.name
                })
              
            }
        }}
      />

      <div className="flex justify-center text-[14px] mt-1">
        {memberDetails.role === "" ? (
          <span className="text-red-500 ">{`select a role!`}</span>) : (<span className="text-green-700 flex justify-center text-center">
           {memberDetails.role[0].toUpperCase() + memberDetails.role.slice(1).toLowerCase()}
          </span>
        )}
      </div>
    </div>
  );
};
