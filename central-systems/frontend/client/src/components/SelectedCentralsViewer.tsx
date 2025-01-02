"use client";
import { X } from "lucide-react";
import {
  formatMemberName,
} from "@/utils";
import { useAddDepartmentToCentralStore } from "@/providers/AddDepartmentToCentral.Provider";
import { extractDepartmentName } from "@/helpers/stateHandlers";


const SelectedDepartmentsViewer = () => {
    
  const { removeDepartmentFromCentral, addDepartmentToCentralState:{selectedDepartments}} = useAddDepartmentToCentralStore(state=> state)

  console.log("selected departments", selectedDepartments)

  return (
    <div className="my-4 px-2">
      <div className="w-full max-w-[500px]">
        <div className="grid grid-cols-3 smd:grid-cols-3 gap-1 md:grid-cols-3">
          {selectedDepartments.map((department, index) => {
            console.log("rendering department name ", department.name)
            return (
              <div key={department.department_id + index} className="">
                <div className="relative">
                  <div className="flex h-[100px] flex-col justify-center border border-gray-200 rounded-sm w-full">
                    <div className="text-[10px] w-full break-all px-2 text-center">
                      {formatMemberName(extractDepartmentName(department.name), true)}
                    </div>
                    {/* <div className="scale-[0.7] -mt-3">
                      <AddDepartmentRoleComponent
                        departmentDetails={department}
                      />
                    </div> */}
                  </div>
                  <div
                    className="flex justify-center items-center text-gray-400 hover:cursor-pointer transform duration-500 hover:scale-[1.1] absolute top-[2px] right-[2px]"
                    onClick={() => {
                    //  const extractedProfileId = extractProfileIdHelper(department.)

                      // remove the details of the department that the profileId matches from the state
                      if(department.department_id){
                        removeDepartmentFromCentral(department.department_id)
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

export default SelectedDepartmentsViewer;
