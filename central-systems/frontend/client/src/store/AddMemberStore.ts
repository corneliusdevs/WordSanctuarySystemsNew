import { TIndividualProfile } from "@/components/forms/individuals/IndividualOnboardingFormSchema";
import { SelectedMemberDetails } from "@/components/SelectedMembersViewer";
import { SelectWithSearchOptionType } from "@/components/SelectSearchComponent";
import { extractInstallationIdFromInstallationSelectOption } from "@/helpers/stateHandlers";
import { extractProfileIdHelper } from "@/utils";
import { createStore } from "zustand/vanilla";

export type AddMembersState = {
  addMemberToinstallationState: {
    selectedInstallationMembers: SelectedMemberDetails[];
    allMembersData: TIndividualProfile[];
    allMembersSelectOptions: SelectWithSearchOptionType[];
    currentlySelectedMember: string;
    currentlySelectedInstallation: string;
    currentlySelectedInstallationId: string;
  };
};

export type InstallationMembersActions = {
  addInstallationMember: (member: SelectedMemberDetails) => void;
  removeInstallationMember: (profile_id: string) => void;
  setAllMembersData: (data: TIndividualProfile[]) => void;
  clearMembers: () => void;
  setAllMembersSelectOptions: (data: SelectWithSearchOptionType[]) => void;
  setCurrentlySelectedMember: (currentlySelectedMember: string) => void;
  setCurrentlySelectedInstallation: (currentlySelectedInstallation: string) => void;
};

export type AddMembersStore = AddMembersState & InstallationMembersActions;

// will be usefull if you are fetching stored products from localstorage or anything like data fetching to an api end point
export const initAddMembersStore = (): AddMembersState => {
  return {
    addMemberToinstallationState: {
      selectedInstallationMembers: [],
      allMembersData: [],
      allMembersSelectOptions: [],
      currentlySelectedMember: "", // state that the select tag works with
      currentlySelectedInstallation: "", // state that the select installation tag works with
      currentlySelectedInstallationId: ""
    },
  };
};

const addInstallationMemberToState = (
  membersInInstallation: SelectedMemberDetails[],
  memberToAdd: SelectedMemberDetails
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

const removeInstallationMemberFromState = (
  membersInInstallation: SelectedMemberDetails[],
  profile_id: string
) => {
  const membersInInstallationCopy = [...membersInInstallation];

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

export const defaultInitState: AddMembersState = {
  addMemberToinstallationState: {
    selectedInstallationMembers: [],
    allMembersData: [],
    allMembersSelectOptions: [],
    currentlySelectedMember: "",
    currentlySelectedInstallation: "",
    currentlySelectedInstallationId: ""
  },
};

export const createAddMembersStore = (
  initState: AddMembersState = defaultInitState
) => {
  return createStore<AddMembersStore>()((set) => ({
    ...initState,
    addInstallationMember: (member: SelectedMemberDetails) =>
      set((state) => ({
        ...state,
        addMemberToinstallationState: {
          // copy the initial state
          ...state.addMemberToinstallationState,
          selectedInstallationMembers: [
            ...addInstallationMemberToState(
              state.addMemberToinstallationState.selectedInstallationMembers,
              member
            ),
          ],
        },
      })),
    removeInstallationMember: (profile_id: string) =>
      set((state) => ({
        ...state,
        addMemberToinstallationState: {
          ...state.addMemberToinstallationState,
          selectedInstallationMembers: [
            ...removeInstallationMemberFromState(
              state.addMemberToinstallationState.selectedInstallationMembers,
              profile_id
            ),
          ],
        },
      })),
    setAllMembersData: (data: TIndividualProfile[]) =>
      set((state) => ({
        ...state,
        addMemberToinstallationState: {
          ...state.addMemberToinstallationState,
          allMembersData: data,
        },
      })),
    setAllMembersSelectOptions: (data: SelectWithSearchOptionType[]) =>
      set((state) => ({
        ...state,
        addMemberToinstallationState: {
          ...state.addMemberToinstallationState,
          allMembersSelectOptions: data,
        },
      })),
    setCurrentlySelectedMember: (currentlySelectedMember: string) =>
      set((state) => {
        console.log("selected member ", currentlySelectedMember);

        const profile_id = extractProfileIdHelper(currentlySelectedMember);

        let selectedInstallationMembers = [
          ...state.addMemberToinstallationState.selectedInstallationMembers,
        ];
        if (profile_id) {
          // add add a new member to the state
          selectedInstallationMembers = [
            ...addInstallationMemberToState(selectedInstallationMembers,
            {
              profile_id,
              name: currentlySelectedMember,
              role: "",
            }),
          ];

          console.log("new selected members ", selectedInstallationMembers);
        }

        return {
          ...state,
          addMemberToinstallationState: {
            ...state.addMemberToinstallationState,
            currentlySelectedMember: currentlySelectedMember,
            selectedInstallationMembers: selectedInstallationMembers,
          },
        };
      }),
    setCurrentlySelectedInstallation(currentlySelectedInstallation) {
    return set((state) => {
      const installationId = extractInstallationIdFromInstallationSelectOption(currentlySelectedInstallation)
      return {
      ...state,
      addMemberToinstallationState: {
        ...state.addMemberToinstallationState,
        currentlySelectedInstallation: currentlySelectedInstallation,
        currentlySelectedInstallationId: installationId ? installationId : currentlySelectedInstallation
      },
    }})
    },
    clearMembers: () =>
      set((state) => ({
        ...state,
        addMemberToinstallationState: {
          ...state.addMemberToinstallationState,
          selectedInstallationMembers: [],
        },
      })),
  }));
};
