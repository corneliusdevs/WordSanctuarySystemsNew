import { TIndividualProfile } from "@/components/forms/individuals/IndividualOnboardingFormSchema";
import { Heirarchy } from "@/types/general";
import { createStore } from "zustand";

type ProfileStoreState = {
  profile: {
    name: string;
    surname: string;
    email: string;
    profile_id: string;
    giving_number: string;
    leadership_level: Heirarchy;
    lifeclass_topic: number;
    lifeclass_teacher_profile_id: string;
    mentor_profile_id: string;
    installation_id: string;
    signature: string;
    passport: string;
    birthday: string;
    departments: string[];
    phone_contact: string;
  },
  isLoggedIn: boolean
};

export type ProfileStoreActions = {
  populateProfile: (profile: TIndividualProfile) => void;
  clearProfileData: () => void;
  setLogInStatus: (status:boolean)=> void;
};

export type ProfileStore = ProfileStoreState & ProfileStoreActions;

export const initProfileStore = (): ProfileStoreState => {
  return {
    profile: {
      name: "",
      profile_id: "",
      surname: "",
      email: "",
      giving_number: "",
      lifeclass_topic: 1,
      mentor_profile_id: "",
      installation_id: "",
      signature: "",
      passport: "",
      birthday: "",
      departments: [],
      phone_contact: "",
      lifeclass_teacher_profile_id: "",
      leadership_level: Heirarchy.MEMBER,
    },
    isLoggedIn: false
  };
};

export const defaultInitState: ProfileStoreState = {
  profile: {
    name: "",
    surname: "",
    profile_id: "",
    email: "",
    giving_number: "",
    lifeclass_topic: 1,
    mentor_profile_id: "",
    installation_id: "",
    signature: "",
    passport: "",
    birthday: "",
    departments: [],
    phone_contact: "",
    lifeclass_teacher_profile_id: "",
    leadership_level: Heirarchy.MEMBER,
  },
  isLoggedIn: false
};

export const createProfileStore = (
  initState: ProfileStoreState = defaultInitState
) => {
  return createStore<ProfileStore>()((set) => ({
    ...initState,
    populateProfile(profile) {
      return set((state) => ({
        ...state,
        profile,
      }));
    },
    clearProfileData() {
      return set((state) => ({
        ...state,
        profile: defaultInitState.profile,
      }));
    },
    setLogInStatus(status) {
      return set((state)=>({
        ...state,
        isLoggedIn: status
      }))
    },
  }));
};
