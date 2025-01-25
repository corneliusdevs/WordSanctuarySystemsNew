"use client"

import { createProfileStore, initProfileStore, ProfileStore } from "@/store/ProfileStore";
import { createContext, ReactNode, useContext, useRef } from "react";
import { useStore } from "zustand";


// THIS STORE PROVIDES THE DETAILS OF THE LOGGED IN MEMBER
export type ProfileStoreApi = ReturnType<typeof createProfileStore>;


export const ProfileStoreContext = createContext<ProfileStoreApi | undefined>(undefined)

export interface ProfileStoreProviderProps {
  children: ReactNode;
}


export const ProfileStoreProvider = ({
  children,
}: ProfileStoreProviderProps) => {
  const storeRef = useRef<ProfileStoreApi>();

  if (!storeRef.current) {
    storeRef.current = createProfileStore(initProfileStore());
  }

  return (
    <ProfileStoreContext.Provider value={storeRef.current}>
      {children}
    </ProfileStoreContext.Provider>
  );
};


export const useProfileStore =<T,>(
  selector: (store: ProfileStore) => T,
): T =>{
  const profileStoreContext = useContext(ProfileStoreContext);

  if(!profileStoreContext){
    throw new Error(`profileStoreContext must be used within ProfileStoreContextProvider`)
  }

  return useStore(profileStoreContext, selector)
}
