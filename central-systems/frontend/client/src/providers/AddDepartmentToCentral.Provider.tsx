"use client"


import { AddDepartmentToCentralStore, createAddDepartmentToCentralStore, initAddDepartmentToCentralStore } from "@/store/AddDepartmentToCentralStore";
import { type ReactNode, createContext, useRef, useContext } from "react"
import { useStore } from "zustand"


export type AddDepartmentToCentralStoreApi = ReturnType<typeof createAddDepartmentToCentralStore>

export const AddDepartmentToCentralStoreContext = createContext<AddDepartmentToCentralStoreApi |undefined> (undefined);

export interface AddDepartmentToCentralProviderProps {
    children: ReactNode
}

export const AddDepartmentToCentralStoreProvider = ({
    children
}: AddDepartmentToCentralProviderProps)=>{
    const storeRef = useRef<AddDepartmentToCentralStoreApi>()

    if(!storeRef.current){
      storeRef.current = createAddDepartmentToCentralStore(initAddDepartmentToCentralStore())
    }

    return (
        <AddDepartmentToCentralStoreContext.Provider value={storeRef.current}>
        {children}
      </AddDepartmentToCentralStoreContext.Provider>
    )
}


export const useAddDepartmentToCentralStore = <T,>(
    selector: (store: AddDepartmentToCentralStore)=> T,
): T =>{
    const addDepartmentToCentralStoreContext = useContext(AddDepartmentToCentralStoreContext);

    if(!addDepartmentToCentralStoreContext){
        throw new Error(`useAddDepartmentToCentralStore must be used within AddDepartmentToCentralStoreProvider`)
    }

    return useStore(addDepartmentToCentralStoreContext, selector)
}