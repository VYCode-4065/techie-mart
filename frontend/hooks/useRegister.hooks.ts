import IResponse from "@/types/response.types";
import { toast } from "sonner";

async function useRegister(FormData:any){


    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/register`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(FormData)
        })
        
        return await res.json() as IResponse
        
    } catch (error) {
        toast.error(error instanceof Error?error.message:'Something went wrong !')
        console.error('Find the error details comes from register frontend page ',error)
    }
}

export default useRegister