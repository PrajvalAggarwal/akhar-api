

import { ILoginUser, IVerfiyOTP } from "../Interface/user";
import {User,UserOtp} from "../models/user";
import { generateOTP, sendMail } from "../utils/helper";



const login = async (req:ILoginUser) => {
    try {
        let user = await User.findOne({ email: req.email });
        if (!user) {
            //If user not found create the entry into the db of that user
            const newUser = new User({
                email: req.email,
            });
           user = await newUser.save();
        }

        //Send te otp to that user
        const otp=generateOTP()
        const userOTP= new UserOtp({
            email:user.email,
            otp:otp,
        })
        await userOTP.save()
        await sendMail(user?.email,String(otp),user?.name)

        console.log(`Email sent succesfully to the user with email id ${user.email}`)

    } catch (error) {
        console.error('Error in logging in user:', error);
    }
}

const verifyOTP = async (req:IVerfiyOTP) => {
    try {
        let userOTP = await UserOtp.findOne({ userId:userId });
        if (!userOTP) {
        // give error that no otp is sent

        }
        if (userOTP?.otp == req.otp && userOTP.expiresIn.getTime() > Date.now()){
            //generate jwt token for the user

            const token= generateToken(userOTP)
        }else if (userOTP?.otp != req.otp){
            throw new Error("Invalid OTP")
        }else {
            throw new Error("Otp expired")
        }
    }
}

export {login};



/*

import mongoose, { Schema, Document } from 'mongoose';

// Define User schema
interface IUser extends Document {
  email: string;
  userId: mongoose.Types.ObjectId;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  // other fields as needed
});

const User = mongoose.model<IUser>('User', UserSchema);

// Define UserOtp schema
interface IUserOtp extends Document {
  userId: mongoose.Types.ObjectId;
  otp: string;
  expiresIn: Date;
}

const UserOtpSchema: Schema = new Schema({
  userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }, // ref to User collection
  otp: { type: String, required: true },
  expiresIn: { type: Date, required: true },
});

const UserOtp = mongoose.model<IUserOtp>('UserOtp', UserOtpSchema);

// Example function to find userOTP based on email
const findUserOTPByEmail = async (email: string) => {
  try {
    // Aggregate query to find userId based on email and then find corresponding userOTP
    const user = await User.aggregate([
      { $match: { email: email } },
      { $project: { userId: '$_id' } }
    ]);

    if (user.length === 0) {
      throw new Error('User not found');
    }

    const userId = user[0].userId;

    const userOTP = await UserOtp.findOne({ userId: userId });

    if (!userOTP) {
      throw new Error('User OTP not found');
    }

    return userOTP;
  } catch (error) {
    console.error('Error finding user OTP:', error);
    throw error; // Throw error to handle it further up the call stack
  }
};

// Example usage
const userEmail = 'user@example.com';
findUserOTPByEmail(userEmail)
  .then((userOTP) => {
    console.log('User OTP found:', userOTP);
    // Handle userOTP as needed
  })
  .catch((error) => {
    console.error('Failed to find user OTP:', error);
    // Handle error appropriately
  });

export default findUserOTPByEmail;
*/