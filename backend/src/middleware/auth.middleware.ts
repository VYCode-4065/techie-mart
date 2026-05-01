import type { NextFunction, Request, Response } from "express";
import jwt,{type JwtPayload} from 'jsonwebtoken'


export async function auth(req:Request,res:Response,next:NextFunction){

    const token = req.cookies.authKey

    if(!token){
        return res.status(401).json({
            message:'Unauthorized access .',
            success:false,
        })
    }


    const user = jwt.verify(token,process.env.JWT_KEY as string) as JwtPayload
    
    if(!user){
        return res.status(401).json({
            message:'Invalid request.',
            success:false,
        })
    }
    else if(!user.exp){
         return res.status(401).json({
            message:'Session timeout. Login again to access.',
            success:false,
        })
    }

    req.user = user

    return next();
}