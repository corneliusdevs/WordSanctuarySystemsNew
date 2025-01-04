"use client"

import { AddDepartmentMembersStore, createAddDepartmentMembersStore, initAddDepartmentMembersStore } from "@/store/AddDepartmentMembersStore";
import { type ReactNode, createContext, useRef, useContext } from "react"
import { useStore } from "zustand"


export type AddDepartmentMembersStoreApi = ReturnType<typeof createAddDepartmentMembersStore>

export const AddDepartmentMemberStoreContext = createContext<AddDepartmentMembersStoreApi |undefined> (undefined);

export interface AddDepartmentMemberProviderProps {
    children: ReactNode
}

export const DepartmentMemberStoreProvider = ({
    children
}: AddDepartmentMemberProviderProps)=>{
    const storeRef = useRef<AddDepartmentMembersStoreApi>()

    if(!storeRef.current){
      storeRef.current = createAddDepartmentMembersStore(initAddDepartmentMembersStore())
    }

    return (
        <AddDepartmentMemberStoreContext.Provider value={storeRef.current}>
        {children}
      </AddDepartmentMemberStoreContext.Provider>
    )
}


export const useAddDepartmentMemberStore = <T,>(
    selector: (store: AddDepartmentMembersStore)=> T,
): T =>{
    const addDepartmentMemberStoreContext = useContext(AddDepartmentMemberStoreContext);

    if(!addDepartmentMemberStoreContext){
        throw new Error(`useAddDepartmentMemberStore must be used within AddMemberStoreProvider`)
    }

    return useStore(addDepartmentMemberStoreContext, selector)
}