"use server"

import { redirect } from "next/navigation"

export async function navigate(route:string){

    // add slash to route e.g /about to navigate to about page and pass just a slash e.g "/" to navigate to home page
    redirect(`${route}`)
}