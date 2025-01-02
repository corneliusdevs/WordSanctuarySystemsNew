import { TIndividualProfile } from "@/components/forms/individuals/IndividualOnboardingFormSchema";
import { SelectWithSearchOptionType } from "@/components/SelectSearchComponent";
import { extractDeptTypeIdFromDeptTypeSelectOption, extractLeadershipLevelFromProfileId } from "@/helpers/stateHandlers";
import { extractProfileIdHelper } from "@/utils";
import { createStore } from "zustand/vanilla";

export interface SelectedDeptMemberDetails {
    profile_id: string;
    role: string;
    name: string;
    leaderShipLevel: string
  }

export type AddDeptMembersState = {
  addMemberToDepartmentState: {
    selectedDepartmentMembers: SelectedDeptMemberDetails[];
    allMembersData: TIndividualProfile[];
    allMembersSelectOptions: SelectWithSearchOptionType[];
    currentlySelectedMember: string;
    currentlySelectedDeptType: string;
    currentlySelectedDeptTypeId: string;
  };
};

export type AddDepartmentMembersActions = {
  addDepartmentMember: (member: SelectedDeptMemberDetails) => void;
  removeDepartmentMember: (profile_id: string) => void;
  setAllMembersData: (data: TIndividualProfile[]) => void;
  clearMembers: () => void;
  setAllMembersSelectOptions: (data: SelectWithSearchOptionType[]) => void;
  setCurrentlySelectedMember: (currentlySelectedMember: string) => void;
  setCurrentlySelectedDeptType: (currentlySelectedDeptType: string) => void;
};

export type AddDepartmentMembersStore = AddDeptMembersState & AddDepartmentMembersActions;

// will be usefull if you are fetching stored products from localstorage or anything like data fetching to an api end point
export const initAddDepartmentMembersStore = (): AddDeptMembersState => {
  return {
    addMemberToDepartmentState: {
      selectedDepartmentMembers: [],
      allMembersData: [],
      allMembersSelectOptions: [],
      currentlySelectedMember: "", // state that the select tag for select department member works with
      currentlySelectedDeptType: "", // state that the select tag select department type works with
      currentlySelectedDeptTypeId: ""
    },
  };
};

const addDepartmentMemberToState = (
  membersInInstallation: SelectedDeptMemberDetails[],
  memberToAdd: SelectedDeptMemberDetails
) => {
  const membersInInstallationCopy = [...membersInInstallation];
  let isMemberInState = false;

  console.log("for loop ruununh ", membersInInstallation, memberToAdd);

  for (let i = 0; i < membersInInstallationCopy.length; i++) {
    // if the member is already in the state replace it

    if (membersInInstallationCopy[i].profile_id === memberToAdd.profile_id) {
      membersInInstallationCopy[i] = {
        ...memberToAdd, // replace the details of the member at that index
      };

      isMemberInState = true;

      console.log("member in state ", isMemberInState);
      //  if the item is in the state, break out of the loop
      break;
    }
  }

  // if the item is not in the state, add it to the copy of the state
  if (!isMemberInState) {
    membersInInstallationCopy.push(memberToAdd);
  }

  console.log(membersInInstallationCopy);

  return membersInInstallationCopy;
};

const removeDepartmentMemberFromState = (
  membersInInstallation: SelectedDeptMemberDetails[],
  profile_id: string
) => {
  let membersInInstallationCopy = [...membersInInstallation];

  for (let i = 0; i < membersInInstallationCopy.length; i++) {
    // if the product is already in the state,
    if (membersInInstallationCopy[i].profile_id === profile_id) {
      // remove the item from the state
      membersInInstallationCopy.splice(i, 1);

      //  if the item is in the state, break out of the loop
      break;
    }
  }

  console.log(membersInInstallationCopy);

  return membersInInstallationCopy;
};

export const defaultInitState: AddDeptMembersState = {
  addMemberToDepartmentState: {
    selectedDepartmentMembers: [],
    allMembersData: [],
    allMembersSelectOptions: [],
    currentlySelectedMember: "",
    currentlySelectedDeptType: "",
    currentlySelectedDeptTypeId: ""
  },
};

export const createAddDepartmentMembersStore = (
  initState: AddDeptMembersState = defaultInitState
) => {
  return createStore<AddDepartmentMembersStore>()((set) => ({
    ...initState,
    addDepartmentMember: (member: SelectedDeptMemberDetails) =>
      set((state) => ({
        ...state,
        addMemberToDepartmentState: {
          // copy the initial state
          ...state.addMemberToDepartmentState,
          selectedDepartmentMembers: [
            ...addDepartmentMemberToState(
              state.addMemberToDepartmentState.selectedDepartmentMembers,
              member
            ),
          ],
        },
      })),
    removeDepartmentMember: (profile_id: string) =>
      set((state) => ({
        ...state,
        addMemberToDepartmentState: {
          ...state.addMemberToDepartmentState,
          selectedDepartmentMembers: [
            ...removeDepartmentMemberFromState(
              state.addMemberToDepartmentState.selectedDepartmentMembers,
              profile_id
            ),
          ],
        },
      })),
    setAllMembersData: (data: TIndividualProfile[]) =>
      set((state) => ({
        ...state,
        addMemberToDepartmentState: {
          ...state.addMemberToDepartmentState,
          allMembersData: data,
        },
      })),
    setAllMembersSelectOptions: (data: SelectWithSearchOptionType[]) =>
      set((state) => ({
        ...state,
        addMemberToDepartmentState: {
          ...state.addMemberToDepartmentState,
          allMembersSelectOptions: data,
        },
      })),
    setCurrentlySelectedMember: (currentlySelectedMember: string) =>
      set((state) => {
        console.log("selected member ", currentlySelectedMember);

        const profile_id = extractProfileIdHelper(currentlySelectedMember);
        const leadership_level = extractLeadershipLevelFromProfileId(currentlySelectedMember)

        let selectedDepartmentMembers = [
          ...state.addMemberToDepartmentState.selectedDepartmentMembers,
        ];
        if (profile_id ) {
          // add add a new member to the state
          selectedDepartmentMembers = [
            ...addDepartmentMemberToState(selectedDepartmentMembers,
            {
              profile_id,
              name: currentlySelectedMember,
              role: "",
              leaderShipLevel: leadership_level ? leadership_level : ""
            }),
          ];

          console.log("new selected members ", selectedDepartmentMembers);
        }

        return {
          ...state,
          addMemberToDepartmentState: {
            ...state.addMemberToDepartmentState,
            currentlySelectedMember: currentlySelectedMember,
            selectedDepartmentMembers: selectedDepartmentMembers,
          },
        };
      }),
     setCurrentlySelectedDeptType(currentlySelectedDeptType) {
      set((state) => { 

        const deptTypeId = extractDeptTypeIdFromDeptTypeSelectOption(currentlySelectedDeptType)
        return {
        ...state,
        addMemberToDepartmentState: {
          ...state.addMemberToDepartmentState,
          currentlySelectedDeptTypeId: deptTypeId ? deptTypeId : currentlySelectedDeptType,
          currentlySelectedDeptType: currentlySelectedDeptType
        },
      }})
     },
    clearMembers: () =>
      set((state) => ({
        ...state,
        addMemberToDepartmentState: {
          ...state.addMemberToDepartmentState,
          selectedDepartmentMembers: [],
        },
      })),
  }));
};
