"use client";
import { X } from "lucide-react";
import {
  formatMemberName,
  removeProfileId,
} from "@/utils";
import { AddDepartmentRoleComponent } from "./AddDepartmentMemberRole";
import { useAddDepartmentMemberStore } from "@/providers/AddDeptMemberProvider";


const SelectedDeptMembersViewer = () => {
    
  const { removeDepartmentMember, addMemberToDepartmentState:{selectedDepartmentMembers}} = useAddDepartmentMemberStore(state=> state)

  console.log("selectedInstallation members", selectedDepartmentMembers)

  return (
    <div className="my-4">
      <div className="w-full max-w-[500px]">
        <div className="grid grid-cols-3 smd:grid-cols-3 gap-1 md:grid-cols-3">
          {selectedDepartmentMembers.map((member, index) => {
            console.log("rendering member name ", member.name)
            return (
              <div key={member.profile_id + index} className="mt-4">
                <div className="relative">
                  <div className="flex h-[150px] flex-col justify-center border border-gray-200 rounded-sm w-full">
                    <div className="text-[10px] w-full break-all mt-10 px-2 text-center">
                      {formatMemberName(removeProfileId(member.name), true)}
                    </div>
                    <div className="scale-[0.7] -mt-3">
                      <AddDepartmentRoleComponent
                        memberDetails={member}
                      />
                    </div>
                  </div>
                  <div
                    className="flex justify-center items-center text-gray-400 hover:cursor-pointer transform duration-500 hover:scale-[1.1] absolute top-[2px] right-[2px]"
                    onClick={() => {
                    //  const extractedProfileId = extractProfileIdHelper(member.)

                      // remove the details of the member that the profileId matches from the state
                      if(member.profile_id){
                        removeDepartmentMember(member.profile_id)
                      }
                    }}
                  >
                    <X size={13} />
                  </div>
                  <div className="absolute -top-5 text-gray-500 text-[10px] w-full flex justify-center mt-2">{index + 1}</div>
                  {/* </div> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SelectedDeptMembersViewer;
