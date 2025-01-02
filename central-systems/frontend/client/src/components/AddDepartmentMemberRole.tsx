"use client";
import { useState } from "react";
import SelectComponent from "./SelectComponent";
import { DeptMemberRole } from "@/types/general";

import { useAddDepartmentMemberStore } from "@/providers/AddDeptMemberProvider";
import { SelectedDeptMemberDetails } from "@/store/AddDepartmentMembersStore";

interface AddDepartmentRoleComponentProps {
  memberDetails: SelectedDeptMemberDetails;
}

export const AddDepartmentRoleComponent = ({
  memberDetails,
}: AddDepartmentRoleComponentProps) => {
  const [selectedRole, setSelectedRole] = useState<string>(memberDetails.role);
  
  const { addDepartmentMember } = useAddDepartmentMemberStore(state => state)

  return (
    <div className="w-full">
      <SelectComponent
        placeholder="Add Role"
        label="select role"
        itemsToSelect={[
          {
            value: DeptMemberRole.HEAD_OF_DEPARTMENT,
            name: DeptMemberRole.HEAD_OF_DEPARTMENT,
          },
          {
            value: DeptMemberRole.ASSISTANT_HEAD_OF_DEPARTMENT,
            name: DeptMemberRole.ASSISTANT_HEAD_OF_DEPARTMENT,
          },
          {
            value: DeptMemberRole.EXECUTIVE_ASSISTANT,
            name: DeptMemberRole.EXECUTIVE_ASSISTANT,
          },
          {
            value: DeptMemberRole.WORKER,
            name: DeptMemberRole.WORKER,
          },
          {
            value: DeptMemberRole.MEMBER,
            name: DeptMemberRole.MEMBER,
          },
          {
            value: DeptMemberRole.EVANGELISM_ASSISTANT,
            name: DeptMemberRole.EVANGELISM_ASSISTANT,
          },
          {
            value: DeptMemberRole.FINANCE_ASSISTANT,
            name: DeptMemberRole.FINANCE_ASSISTANT,
          },
          {
            value: DeptMemberRole.PRAYER_ASSISTANT,
            name: DeptMemberRole.PRAYER_ASSISTANT,
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
                addDepartmentMember({
                  profile_id: memberDetails.profile_id,
                  role: selectedRole,
                  name: memberDetails.name,
                  leaderShipLevel:  memberDetails.leaderShipLevel
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
