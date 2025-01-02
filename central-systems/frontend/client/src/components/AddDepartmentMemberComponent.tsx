"use client";

import { useEffect, useState } from "react";
import { MultiSelectSearchComponent } from "./MultiSelectSearchComponent";
import { extractAddMembersMultiSelectComponentOptions } from "@/helpers/stateHandlers";
import { ResponsiveDialog } from "./forms/department/ResponsiveDialog";
import { useAddDepartmentMemberStore } from "@/providers/AddDeptMemberProvider";
import SelectedDeptMembersViewer from "./SelectedDeptMembersViewer";

interface AddDepartmentMemberComponentProps {}

export const AddDepartmentMemberComponent = ({}: AddDepartmentMemberComponentProps) => {
  //  state from the store in zustnad
  const {
    setAllMembersData,
    setAllMembersSelectOptions,
    setCurrentlySelectedMember,
    addMemberToDepartmentState: {
      allMembersSelectOptions,
      currentlySelectedMember,
    },
  } = useAddDepartmentMemberStore( state => state)

  const [loading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    //  fetch all members
    const fetchAllIndividuals = async () => {
      const central_systems_base_api =
        process.env.NEXT_PUBLIC_CENTRAL_SYSTEMS_BASE_API;

      await fetch(
        `${central_systems_base_api}/api/profiles/individuals/fetch/all`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then(async (response) => {
          const allIndividualsResponse = await response.json();

          console.log("all individuals ", allIndividualsResponse);

          if (
            allIndividualsResponse?.success &&
            allIndividualsResponse?.data &&
            allIndividualsResponse.data?.allProfiles
          ) {
            // add the individuals data to the store
            setAllMembersData(allIndividualsResponse.data.allProfiles);

            // transform the fetched data to what the select component can handle and storeit in the store
            setAllMembersSelectOptions(
              extractAddMembersMultiSelectComponentOptions(
                allIndividualsResponse.data.allProfiles
              )
            );
          }
        })
        .catch((fetchError) => {
          console.log(
            "error fetching all individuals in AddMembers component ",
            fetchError
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchAllIndividuals();
  }, []);

  return (
    <div>
      <ResponsiveDialog
        buttonText="Add Members"
        customJSXContent={
          <div className="mb-10">
            <MultiSelectSearchComponent
              placeholderSearchText="search members"
              placeholderText={loading ? "fetching members..." : "Add members"}
              searchEmptyText="No member matched"
              selectedValue={currentlySelectedMember}
              setSelectedValue={setCurrentlySelectedMember}
              options={allMembersSelectOptions}
            />
            <SelectedDeptMembersViewer />
          </div>
          
        }
      />
    </div>
  );
};
