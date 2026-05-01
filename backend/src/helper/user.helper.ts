import bcrypt from "bcryptjs"
import crypto from "crypto";
import { prisma } from "../lib/prisma"
import { hashPassword } from "./hashPassword.helper"
import sendEmail from "./email.helper"

const registerUser = async(email:string,username:string,name:string,password:string,gender:string) => {
  

    if(!email || !username || !name || !password || !gender){

        return {
            message:'All required field should be filled !',
            success:false
        }
    }

    const isExisting = await prisma.user.findFirst({where:{email}})

    if(isExisting){
        return {
            message:'User with this email already exists !',
            success:false
        }
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
        data:{
            email,
            username,
            name,
            gender,
            password:hashedPassword
        }
    })

    return {
        message:'User created successfully !',
        success:true,
        data:newUser
    }
}

type loginType = {
    email:string;
    username:string;
    password:string;
}


async function loginUser({email,username,password}:loginType){

    if((!email && !username) || !password){
        return {
            message:'Fill all required field !',
            status:false,
            statusCode:400
        }
    }

    const loggedInUser = await prisma.user.findFirst({
        where:{
            OR:[
                {email},
                {username}
            ]
        }
    })

    if(!loggedInUser){
        return {
            message:'User with credentials not found !',
            success:false,
            statusCode:404
        }
    }

    const isPasswordMatch = await verifyPassword(password,loggedInUser.password);

    if(!isPasswordMatch){
        return {
            message:'Incorrect credentials !',
            success:false,
            statusCode:400
        }
    }

    delete(loggedInUser as any).password

    return {
        message:'User logged in successfully !',
        success:true,
        statusCode:200,
        data:loggedInUser
    }
}

async function logoutUser(user:any){
    

    if(!user.email){
        return {
            message:'Invalid request. Login first !',
            success:false,
            statusCode:400
        }
    }

    const loggedInUser = await prisma.user.findFirst({
        where:{email:user.email},
        omit:{password:true}
    })

    if(!loggedInUser){
        return {
            message:'User not found !',
            success:false,
            statusCode:404
        }
    }

    return {
        message:'User logout successfully !',
        success:true,
        statusCode:200
    }
}


async function verifyPassword(password:string,hash:string){
    return await bcrypt.compare(password,hash)
}

const forgotPassword = async (email: string) => {
    if (!email) {
        return {
            message: 'Email is required to request password reset !',
            success: false
        };
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        return {
            message: 'User with this email does not exist !',
            success: false
        };
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    await prisma.user.update({
        where: { email },
        data: {
            passwordResetToken: resetToken,
            passwordResetTokenExpiry: resetTokenExpiry
        }
    });

    const frontendUrl = process.env.FRONTEND_URL || process.env.RESET_PASSWORD_URL || 'http://localhost:3000';
    const resetUrl = `${frontendUrl}/reset-password?token=${resetToken}`;

    const emailHtml = `
        <h2>Password reset requested</h2>
        <p>Hello ${user.name},</p>
        <p>We received a request to reset your password. Click the link below to continue:</p>
        <p><a href="${resetUrl}">Reset your password</a></p>
        <p>If you did not request this, please ignore this email.</p>
        <p>This link expires in 1 hour.</p>
    `;

    await sendEmail({
        to: user.email,
        subject: 'Reset your Techie Mart password',
        html: emailHtml
    });

    return {
        message: 'Password reset link sent to your email address !',
        success: true
    };
};

const verifyResetToken = async (token: string) => {
    if (!token) {
        return {
            message: 'Password reset token is required !',
            success: false
        };
    }

    const user = await prisma.user.findFirst({
        where: {
            passwordResetToken: token,
            passwordResetTokenExpiry: { gt: new Date() }
        },
        omit: { password: true }
    });

    if (!user) {
        return {
            message: 'Reset token is invalid or has expired !',
            success: false
        };
    }

    return {
        message: 'Reset token is valid.',
        success: true,
        data: { email: user.email }
    };
};

const resetPassword = async (token: string, newPassword: string) => {
    if (!token || !newPassword) {
        return {
            message: 'Token and new password are required !',
            success: false
        };
    }

    const user = await prisma.user.findFirst({
        where: {
            passwordResetToken: token,
            passwordResetTokenExpiry: { gt: new Date() }
        }
    });

    if (!user) {
        return {
            message: 'Reset token is invalid or has expired !',
            success: false
        };
    }

    const hashedPassword = await hashPassword(newPassword);

    await prisma.user.update({
        where: { id: user.id },
        data: {
            password: hashedPassword,
            passwordResetToken: null,
            passwordResetTokenExpiry: null
        }
    });

    const confirmationHtml = `
        <h2>Password changed successfully</h2>
        <p>Hello ${user.name},</p>
        <p>Your account password was updated successfully. If you did not perform this action, contact support immediately.</p>
    `;

    await sendEmail({
        to: user.email,
        subject: 'Your Techie Mart password has been changed',
        html: confirmationHtml
    });

    return {
        message: 'Password updated successfully !',
        success: true
    };
};

const updateUser = async (userId: number, updates: { email?: string; name?: string; gender?: string }) => {
    // Check if at least one field is provided
    if (!updates.email && !updates.name && !updates.gender) {
        return {
            message: 'At least one field (email, name, or gender) must be provided for update!',
            success: false
        };
    }

    // Find the current user
    const currentUser = await prisma.user.findUnique({
        where: { id: userId }
    });

    if (!currentUser) {
        return {
            message: 'User not found!',
            success: false
        };
    }

    // Prepare update data
    const updateData: any = {};

    if (updates.email !== undefined) {
        // Check if email is different and not already taken
        if (updates.email !== currentUser.email) {
            const existingUser = await prisma.user.findUnique({
                where: { email: updates.email }
            });
            if (existingUser) {
                return {
                    message: 'Email is already taken by another user!',
                    success: false
                };
            }
            updateData.email = updates.email;
        }
    }

    if (updates.name !== undefined) {
        updateData.name = updates.name;
    }

    if (updates.gender !== undefined) {
        updateData.gender = updates.gender;
    }

    // If no actual changes (e.g., same email), return success without update
    if (Object.keys(updateData).length === 0) {
        return {
            message: 'No changes detected. User data remains the same.',
            success: true,
            data: {
                id: currentUser.id,
                email: currentUser.email,
                username: currentUser.username,
                name: currentUser.name,
                gender: currentUser.gender
            }
        };
    }

    // Update the user
    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: updateData,
        omit: { password: true }
    });

    return {
        message: 'User updated successfully!',
        success: true,
        data: updatedUser
    };
};

export  {
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    updateUser,
    verifyResetToken,
    resetPassword
}