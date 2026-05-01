import { Router } from "express";
import { registerUserController, getAllUserController, loginUserController, getUserByEmailController, logoutUserController, forgotPasswordController, verifyResetTokenController, resetPasswordController, updateUserController } from "../controllers/user.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const userRouter:Router = Router();

userRouter.post('/register',registerUserController);
userRouter.post('/login',loginUserController)
userRouter.put('/update',auth,updateUserController);
userRouter.post('/forgot-password',forgotPasswordController)
userRouter.get('/reset-password/verify/:token',verifyResetTokenController)
userRouter.post('/reset-password',resetPasswordController)
userRouter.get('/logout',auth,logoutUserController)
userRouter.get('/:id',getUserByEmailController)
userRouter.get('/',getAllUserController)



export default userRouter