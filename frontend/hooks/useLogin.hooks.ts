import { ILogin } from "@/types/auth.types";
import IResponse from "@/types/response.types";
import { toast } from "sonner";

async function useLogin ({email,password}:ILogin){
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/login`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email,password})
        })

        return await res.json() as IResponse;
        
    } catch (error) {
        if(error instanceof Error){
            toast.error(error.message)
        }
        else{
            toast.error('Something went wrong at login !')
        }

        console.log('Login page got error at frontend ',error)
    }
}   

export default useLogin;