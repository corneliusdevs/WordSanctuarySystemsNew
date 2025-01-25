"use client";

// import { updateSelectedMembers as updateSelectedProductsHandler } from "@/helpers/stateManagers/updateSelectedImage";
import {
  extractProfileIdHelper,
  formatMemberName,
  removeProfileId,
} from "@/utils";
import { SelectedMemberDetails } from "./SelectedMembersViewer";

interface ReadOnlySelectedMembersViewerProps {
  selectedMembers: string[];
  selectedMembersDetails: SelectedMemberDetails[];
}



const ReadOnlySelectedMembersViewer = ({
  selectedMembers,
  selectedMembersDetails,
}: ReadOnlySelectedMembersViewerProps) => {
  const getMemberRole = (details: string) => {
    const extractedProfileId = extractProfileIdHelper(details);
    let selectedRole = "";
    selectedMembersDetails.forEach((selectedMembersDetails) => {
      if (
        extractedProfileId &&
        extractedProfileId === selectedMembersDetails.profile_id
      ) {
        selectedRole = selectedMembersDetails.role;
      }
    });

    return selectedRole;
  };

  return (
    <div className="my-4">
      <div className="w-full max-w-[500px]">
        <div className="grid grid-cols-3 smd:grid-cols-4 gap-1 md:grid-cols-5">
          {selectedMembers.map((member, index) => {
            const selectedRole = getMemberRole(member);
            return (
              <div key={member + index}>
                <div className="relative">
                  <div className="flex h-[150px] flex-col justify-center p-2 border border-gray-200 rounded-sm">
                    <div className="text-[10px] ml-2">
                      {formatMemberName(removeProfileId(member), true)}
                    </div>
                    <div className="scale-[0.7]">
                      <div>
                        {selectedRole === "" ? (
                          <span className="text-red-500 text-sm">No role selected</span>
                        ) : (
                          <span>{selectedRole}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReadOnlySelectedMembersViewer;
