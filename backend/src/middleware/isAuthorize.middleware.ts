import type { NextFunction, Request, Response } from "express"
import { asyncHandler } from "../utils/asyncHandler"
import { prisma } from "../lib/prisma"


const isAuthrizeSellerMiddleware = asyncHandler(async(req:Request,res:Response,next:NextFunction) => {
    
    if (!req.user || req.user===undefined || typeof req.user === "string") {
      
        return {
            message:"You are not authorized to perform this action. Please log in as a seller.",
            success:false,
            status:401
        }
    }

    const isSeller = await prisma.user.findUnique({
            where:{email:req.user.email} 
        })

        if(!isSeller || isSeller.role !== 'SELLER'){
            return res.status(403).json({
                message:'Forbidden access. Only sellers are allowed to perform this action.',
                success:false,
            })
        }

    next()
})

export default isAuthrizeSellerMiddleware