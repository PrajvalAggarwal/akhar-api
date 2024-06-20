

import httpStatus from "http-status";
import { ILoginUser,  IUser, IVerfiyOTP } from "../Interface/user";
import { User } from "../models/user";
import {  sendOTP, generateToken } from "../utils/helper";
import constants from "../utils/constants";
import sessionModel from "../models/sesssion";

// Login Service
const login = async (req: ILoginUser) => {
  try {
    let user = await User.findOne({ email: req.email });
    if (!user) {
      //If user not found create the entry into the db of that user
      const newUser = new User({
        email: req.email,
      });
      user = await newUser.save();
    }

    //Send the otp to that user
    await sendOTP(user);

  } catch (error) {
    throw { message: constants.MESSAGE.INTERNAL_SERVER_ERROR, status: httpStatus.INTERNAL_SERVER_ERROR }
  }
}

const verifyOTPService = async (req: IVerfiyOTP) => {
  try {
    const userOTP = await User.aggregate([
      { $match: { email: req.email } },
      {
        $lookup: {
          from: 'userotps',
          localField: '_id',
          foreignField: 'userId',
          as: 'userOTP'
        }
      },
      { $unwind: '$userOTP' },
      { $project: { userId: '$_id', userOTP: 1 } }
    ])

    let otp = userOTP[0].userOTP

    // Verify OTP
    if (otp.otp != req.otp) {
      throw { message: constants.OTP.INVALID_OTP, status: httpStatus.BAD_REQUEST };
    }

    // Check OTP expiration
    if (otp.expiresIn.getTime() <= Date.now()) {
      throw { message: constants.OTP.EXPIRED_OTP, status: httpStatus.BAD_REQUEST };
    }

    const token = generateToken(userOTP[0]._id)

    //Create the session for that user
    const userSession=new sessionModel({
      userId:userOTP[0]._id,
      token:token
    })

    await userSession.save()
    
    return token

  } catch (err) {
    throw err
  }
}

//Service to resend the otp
//Reusing the loginuser interface only
const resendOTPService = async (req: ILoginUser) => {
  try {
    const user: IUser | null = await User.findOne({ email: req.email });
    
    if (!user) {
      throw { message: constants.USER.USER_NOT_FOUND, status: httpStatus.NOT_FOUND };
    }
   
    //Send te otp to that user
    await sendOTP(user);

  } catch (error) {
    throw { message: constants.MESSAGE.INTERNAL_SERVER_ERROR, status: httpStatus.INTERNAL_SERVER_ERROR }
    // console.error('Error in logging in user:', error);
  }
}

export { login, verifyOTPService,resendOTPService };


