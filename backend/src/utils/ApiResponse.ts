import type { Response } from "express";




export function ApiResponse(res:Response ,statusCode:number,message:string,data:unknown,success:boolean,moreInfo?:any){
    return res.status(statusCode).json({
        message,
        data,
        success:success || statusCode <= 399,
        moreInfo
    })
}