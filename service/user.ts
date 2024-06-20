

import httpStatus from "http-status";
import { ILoginUser, ISocialLogin, IUser, IVerfiyOTP, IUpdateProfile } from "../Interface/user";
import { User, UserOtp } from "../models/user";
import { sendOTP, generateToken } from "../utils/helper";
import constants from "../utils/constants";
import sessionModel from "../models/sesssion";
import geoip from 'geoip-lite'
import { startSession } from "mongoose";

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

const verifyOTPService = async (req: IVerfiyOTP, ip: string | undefined) => {
  const session = await startSession()
  session.startTransaction();
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

    const geoLoc = geoip.lookup(ip == null ? "" : ip)


    //Create the session for that user
    const userSession = new sessionModel({
      location: {
        city: geoLoc?.city,
        country: geoLoc?.country,
        region: geoLoc?.region,
        timezone: geoLoc?.timezone,
        coordinates: [geoLoc?.ll[0], geoLoc?.ll[1]],

      },
      userId: userOTP[0]._id,
      token: token
    })


    //Delete user otp record from user otp after verifying
    await UserOtp.deleteOne({ userId: userOTP[0]._id })
    await userSession.save()

    await session.commitTransaction()
    session.endSession();

    return token

  } catch (err) {

    await session.abortTransaction();
    session.endSession();
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
    throw error
    // console.error('Error in logging in user:', error);
  }
}


const socialLoginService = async (req: ISocialLogin, ip: string | undefined) => {

  const session = await startSession()
  session.startTransaction();

  try {
    //Create the user
    const user = new User({
      email: req.email,
      name: req.name,
      socialId: req.socialId,
      socialType: req.socialType

    })

    await user.save()

    console.log(user);

    //Create the user session
    const token = generateToken(user._id)
    const geoLoc = geoip.lookup(ip == null ? "" : ip)

    //Create the session for that user
    const userSession = new sessionModel({
      location: {
        city: geoLoc?.city,
        country: geoLoc?.country,
        region: geoLoc?.region,
        timezone: geoLoc?.timezone,
        coordinates: [geoLoc?.ll[0], geoLoc?.ll[1]],

      },
      userId: user._id,
      token: token
    })

    await userSession.save();

    await session.commitTransaction()
    session.endSession();

    return token

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error
  }
}

const updateProfileService = async (req: IUpdateProfile, file: any) => {

}

export { login, verifyOTPService, resendOTPService, socialLoginService, updateProfileService };


