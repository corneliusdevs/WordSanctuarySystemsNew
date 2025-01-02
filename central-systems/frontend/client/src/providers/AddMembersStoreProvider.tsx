"use client"

import { AddMembersStore, createAddMembersStore, initAddMembersStore } from "@/store/AddMemberStore";
import { type ReactNode, createContext, useRef, useContext } from "react"
import { useStore } from "zustand"


export type AddMembersStoreApi = ReturnType<typeof createAddMembersStore>

export const AddMemberStoreContext = createContext<AddMembersStoreApi |undefined> (undefined);

export interface AddMemberProviderProps {
    children: ReactNode
}

export const InstallationMemberStoreProvider = ({
    children
}: AddMemberProviderProps)=>{
    const storeRef = useRef<AddMembersStoreApi>()

    if(!storeRef.current){
      storeRef.current = createAddMembersStore(initAddMembersStore())
    }

    return (
        <AddMemberStoreContext.Provider value={storeRef.current}>
        {children}
      </AddMemberStoreContext.Provider>
    )
}


export const useAddMemberStore = <T,>(
    selector: (store: AddMembersStore)=> T,
): T =>{
    const addMemberStoreContext = useContext(AddMemberStoreContext);

    if(!addMemberStoreContext){
        throw new Error(`useAddMemberStore must be used within AddMemberStoreProvider`)
    }

    return useStore(addMemberStoreContext, selector)
}