import type { Request, RequestHandler, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { prisma } from "../lib/prisma";
import generateToken from "../helper/generateToken.helper";
import { loginUser, logoutUser, registerUser, forgotPassword, verifyResetToken, resetPassword, updateUser } from "../helper/user.helper";

const registerUserController:RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    
    const {email,username,name,password,gender,role} = req.body;

    const newUser = await registerUser(email,username,name,password,gender);

    if(!newUser.success){
        return ApiResponse(res,401,newUser.message,null,newUser.success);
    }

    return ApiResponse(res,200,'User registered successfully !',newUser,newUser.success)
})

const loginUserController:RequestHandler = asyncHandler(async (req: Request, res: Response) => {

    const loggedInUser = await loginUser(req.body);

    if(!loggedInUser.success){
        return res.status(loggedInUser.statusCode).json({
            message:loggedInUser.message,
            success:loggedInUser.success
        })
    }

    const authToken = await generateToken(req.body.email);

    if(!authToken){
        return {
            message:'Something went wrong. Currently unable to create session !',
            success:false,
            statusCode:500
        }
    }

    res.cookie('authKey',authToken,{
        httpOnly:true,
        secure:true,
        sameSite:'strict',
        maxAge:86400000
    })

    return res.status(200).json({
        message:loggedInUser.message,
        success:loggedInUser.success,
        data:loggedInUser.data
    })

})

const logoutUserController:RequestHandler = asyncHandler(async(req:Request,res:Response)=>{
    
    const isLoggedOut = await logoutUser(req.user)     

    if(!isLoggedOut.success){
        return res.status(isLoggedOut.statusCode).json({
            message:isLoggedOut.message,
            success:false
        })
    }

    res.clearCookie('authKey')

    return res.status(200).json({
        message:isLoggedOut.message,
        success:true
    })
})

const forgotPasswordController:RequestHandler = asyncHandler(async(req:Request,res:Response)=>{
    const { email } = req.body;

    const result = await forgotPassword(email);

    return ApiResponse(res, result.success ? 200 : 400, result.message, null, result.success);
})

const verifyResetTokenController:RequestHandler = asyncHandler(async(req:Request,res:Response)=>{
    const token = req.params.token as string;

    const result = await verifyResetToken(token);

    return ApiResponse(res, result.success ? 200 : 400, result.message, result.data || null, result.success);
})

const resetPasswordController:RequestHandler = asyncHandler(async(req:Request,res:Response)=>{
    const { token, newPassword } = req.body;

    const result = await resetPassword(token, newPassword);

    return ApiResponse(res, result.success ? 200 : 400, result.message, null, result.success);
})

const updateUserController:RequestHandler = asyncHandler(async(req:Request,res:Response)=>{
    const userId = (req.user as any).id; // Assuming req.user is set by auth middleware
    const { email, name, gender } = req.body;

    const updates: { email?: string; name?: string; gender?: any } = {};
    if (email !== undefined) updates.email = email;
    if (name !== undefined) updates.name = name;
    if (gender !== undefined) updates.gender = gender;

    const result = await updateUser(userId, updates);

    return ApiResponse(res, result.success ? 200 : 400, result.message, result.data || null, result.success);
})

const getAllUserController:RequestHandler = asyncHandler(async(req:Request,res:Response)=>{
    const allUsers = await prisma.user.findMany({
        omit:{password:true}
    });

    if(allUsers.length === 0){
        return ApiResponse(res,400,'No user found !',null,false);
    }

    return ApiResponse(res,200,'Users fetched successfully !',allUsers,true);
})

const getUserByEmailController:RequestHandler = asyncHandler(async(req:Request,res:Response)=>{

    const id = Number(req.params.id)

    const user = await prisma.user.findFirst({
        where:{id},
        omit:{password:true}
    });

    if(!user){
        return ApiResponse(res,400,'No user found !',null,false);
    }

    return ApiResponse(res,200,'Users fetched successfully !',user,true);
})

export {
    registerUserController,
    loginUserController,
    logoutUserController,
    forgotPasswordController,
    verifyResetTokenController,
    resetPasswordController,
    updateUserController,
    getAllUserController,
    getUserByEmailController
}