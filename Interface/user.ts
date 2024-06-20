
import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
    email: string;
    name: string;
    pic: string;
    socialId: string;
    socialType: string;
    createdAt: Date;
    updatedAt: Date;

}

export interface ILoginUser {
    email: string;
}

export interface IUserOTP extends Document {
    userId: mongoose.Types.ObjectId;
    otp: number;
    expiresIn: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface IVerfiyOTP {
    email: string;
    otp: number
}

//Social login interface
export interface ISocialLogin {
    email: string;
    name: string;
    socialId: string;
    socialType: string;
}

//Update user profile interface
export interface IUpdateProfile {
    name: string;
}