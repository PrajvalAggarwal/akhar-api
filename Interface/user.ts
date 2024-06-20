
import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
    email : string;
    password : string;
    name : string;
    pic :string;
    socialId:string;
    socialType:string;
    dob:Date;
    createdAt: Date;
    updatedAt: Date;

}

export interface ILoginUser {
    email : string;
    
}

export interface IUserOTP extends Document{
    userId:mongoose.Types.ObjectId;
    otp:number;
    expiresIn:Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface IVerfiyOTP{
    email:string;
    otp:number
}