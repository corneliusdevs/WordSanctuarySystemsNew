"use client";

import { useEffect, useState } from "react";
import { MultiSelectSearchComponent } from "./MultiSelectSearchComponent";
import { extractDepartmentSelectOptions } from "@/helpers/stateHandlers";
import { ResponsiveDialog } from "./forms/department/ResponsiveDialog";
import { useAddDepartmentToCentralStore } from "@/providers/AddDepartmentToCentral.Provider";
import SelectedDepartmentsViewer from "./SelectedCentralsViewer";

// interface AddDepartmentToCentralComponentProps {}

export const AddDepartmentToCentralComponent = () => {
  //  state from the store in zustnad
  const {
    setAllDepartmentsData,
    setAllDepartmentsSelectOptions,
    setCurrentlySelectedDepartment,
    addDepartmentToCentralState: {
      allDepartmentsSelectOptions,
      currentlySelectedDepartment,
    },
  } = useAddDepartmentToCentralStore( state => state)

  const [loading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    //  fetch all members
    const fetchAllDepartments = async () => {
      const central_systems_base_api =
        process.env.NEXT_PUBLIC_CENTRAL_SYSTEMS_BASE_API;

      await fetch(
        `${central_systems_base_api}/api/profiles/departments/all`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then(async (response) => {
          const allDepartmentsResponse = await response.json();

          console.log("all departments ", allDepartmentsResponse);

          if (
            allDepartmentsResponse?.success &&
            allDepartmentsResponse?.data &&
            allDepartmentsResponse.data?.departmentProfiles
          ) {
            // add the departments data to the store
            setAllDepartmentsData(allDepartmentsResponse.data.departmentProfiles);

            // transform the fetched data to what the select component can handle and storeit in the store
            setAllDepartmentsSelectOptions(
                extractDepartmentSelectOptions(
                allDepartmentsResponse.data.departmentProfiles
              )
            );
          }
        })
        .catch((fetchError) => {
          console.log(
            "error fetching all departments in AddDeptsToCentral component ",
            fetchError
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchAllDepartments();
  }, []);

  return (
    <div>
      <ResponsiveDialog
        buttonText="Add departments"
        customJSXContent={
          <div className="mb-10">
            <MultiSelectSearchComponent
              placeholderSearchText="search department"
              placeholderText={loading ? "fetching departments..." : "Add departments"}
              searchEmptyText="No department matched"
              selectedValue={currentlySelectedDepartment}
              setSelectedValue={setCurrentlySelectedDepartment}
              options={allDepartmentsSelectOptions}
            />
            <SelectedDepartmentsViewer />
          </div>
          
        }
      />
    </div>
  );
};
