import { Loader2 } from "lucide-react"



export const LoadingSpinner = ()=>{

    return <div className="p-6 flex justify-center items-center">
        <Loader2 className="transform spin duration-500 repeat-infinite transition-all"/>
    </div>
}