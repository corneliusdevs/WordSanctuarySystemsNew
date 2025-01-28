import { TCreateDepartmentalProfile } from "@/components/forms/department/CreateDepartmentFormSchema";
import { SelectWithSearchOptionType } from "@/components/SelectSearchComponent";
import { extractdepartmentIdFromDepartmentSelectOptions, extractDepartmentTypeId } from "@/helpers/stateHandlers";
import { createStore } from "zustand/vanilla";

export interface SelectedDepartmentDetails {
    department_id: string;
    name: string
    department_type_id:string
}

export type AddDepartmentToCentralState = {
  addDepartmentToCentralState: {
    selectedDepartments: SelectedDepartmentDetails[];
    allDepartmentsData: TCreateDepartmentalProfile[];
    allDepartmentsSelectOptions: SelectWithSearchOptionType[];
    currentlySelectedDepartment: string;
    // currentlySelectedDeptType: string;
    // currentlySelectedDeptTypeId: string;
  };
};

export type AddDepartmentToCentralActions = {
  addDepartmentToCentral: (department: SelectedDepartmentDetails) => void;
  removeDepartmentFromCentral: (department_id: string) => void;
  setAllDepartmentsData: (data: TCreateDepartmentalProfile[]) => void;
  clearSelectedDepartments: () => void;
  setAllDepartmentsSelectOptions: (data: SelectWithSearchOptionType[]) => void;
  setCurrentlySelectedDepartment: (currentlySelectedDepartment: string) => void;
};

export type AddDepartmentToCentralStore = AddDepartmentToCentralState & AddDepartmentToCentralActions;

// will be usefull if you are fetching stored products from localstorage or anything like data fetching to an api end point
export const initAddDepartmentToCentralStore = (): AddDepartmentToCentralState => {
  return {
    addDepartmentToCentralState: {
      selectedDepartments: [],
      allDepartmentsData: [],
      allDepartmentsSelectOptions: [],
      currentlySelectedDepartment: "", // state that the select tag for select department  works with
    },
  };
};

const addDepartmentToCentralToState = (
  departmentsInCentral: SelectedDepartmentDetails[],
  departmentToAdd: SelectedDepartmentDetails
) => {
  const departmentsInCentralCopy = [...departmentsInCentral];
  let isDepartmentInState = false;

  console.log("for loop ruununh ", departmentsInCentral, departmentToAdd);

  for (let i = 0; i < departmentsInCentralCopy.length; i++) {
    // if the department is already in the state replace it

    if (departmentsInCentralCopy[i].department_id === departmentToAdd.department_id) {
      departmentsInCentralCopy[i] = {
        ...departmentToAdd, // replace the details of the department at that index
      };

      isDepartmentInState = true;

      console.log("department in state ", isDepartmentInState);
      //  if the item is in the state, break out of the loop
      break;
    }
  }

  // if the item is not in the state, add it to the copy of the state
  if (!isDepartmentInState) {
    departmentsInCentralCopy.push(departmentToAdd);
  }

  console.log(departmentsInCentralCopy);

  return departmentsInCentralCopy;
};

const removeDepartmentFromCentralFromState = (
  departmentsInCentral: SelectedDepartmentDetails[],
  department_id: string
) => {
  const departmentsInCentralCopy = [...departmentsInCentral];

  for (let i = 0; i < departmentsInCentralCopy.length; i++) {
    // if the product is already in the state,
    if (departmentsInCentralCopy[i].department_id === department_id) {
      // remove the item from the state
      departmentsInCentralCopy.splice(i, 1);

      //  if the item is in the state, break out of the loop
      break;
    }
  }

  console.log(departmentsInCentralCopy);

  return departmentsInCentralCopy;
};

export const defaultInitState: AddDepartmentToCentralState = {
  addDepartmentToCentralState: {
    selectedDepartments: [],
    allDepartmentsData: [],
    allDepartmentsSelectOptions: [],
    currentlySelectedDepartment: "",
  },
};

export const createAddDepartmentToCentralStore = (
  initState: AddDepartmentToCentralState = defaultInitState
) => {
  return createStore<AddDepartmentToCentralStore>()((set) => ({
    ...initState,
    addDepartmentToCentral: (department: SelectedDepartmentDetails) =>
      set((state) => ({
        ...state,
        addDepartmentToCentralState: {
          // copy the initial state
          ...state.addDepartmentToCentralState,
          selectedDepartments: [
            ...addDepartmentToCentralToState(
              state.addDepartmentToCentralState.selectedDepartments,
              department
            ),
          ],
        },
      })),
    removeDepartmentFromCentral: (department_id: string) =>
      set((state) => ({
        ...state,
        addDepartmentToCentralState: {
          ...state.addDepartmentToCentralState,
          selectedDepartments: [
            ...removeDepartmentFromCentralFromState(
              state.addDepartmentToCentralState.selectedDepartments,
              department_id
            ),
          ],
        },
      })),
    setAllDepartmentsData: (data: TCreateDepartmentalProfile[]) =>
      set((state) => ({
        ...state,
        addDepartmentToCentralState: {
          ...state.addDepartmentToCentralState,
          allDepartmentsData: data,
        },
      })),
    setAllDepartmentsSelectOptions: (data: SelectWithSearchOptionType[]) =>
      set((state) => ({
        ...state,
        addDepartmentToCentralState: {
          ...state.addDepartmentToCentralState,
          allDepartmentsSelectOptions: data,
        },
      })),
    setCurrentlySelectedDepartment: (currentlySelectedDepartment: string) =>
      set((state) => {
        console.log("selected department ", currentlySelectedDepartment);

        const department_id = extractdepartmentIdFromDepartmentSelectOptions(currentlySelectedDepartment);

        const department_type_id = extractDepartmentTypeId(currentlySelectedDepartment)

        let selectedDepartments = [
          ...state.addDepartmentToCentralState.selectedDepartments,
        ];
        if (department_id ) {
          // add add a new department to the state
          selectedDepartments = [
            ...addDepartmentToCentralToState(selectedDepartments,
            {
              department_id,
              name: currentlySelectedDepartment,
              department_type_id: department_type_id ? department_type_id : ""
            }),
          ];

          console.log("new selected department ", selectedDepartments);
        }

        return {
          ...state,
          addDepartmentToCentralState: {
            ...state.addDepartmentToCentralState,
            currentlySelectedDepartment: currentlySelectedDepartment,
            selectedDepartments: selectedDepartments,
          },
        };
      }),
    clearSelectedDepartments: () =>
      set((state) => ({
        ...state,
        addDepartmentToCentralState: {
          ...state.addDepartmentToCentralState,
          selectedDepartments: [],
        },
      })),
  }));
};
