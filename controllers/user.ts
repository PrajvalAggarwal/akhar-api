
import { Request, Response } from "express";
import httpStatus from 'http-status';
import { ILoginUser, IVerfiyOTP, ISocialLogin, IUpdateProfile } from "../Interface/user";
import { login, verifyOTPService, resendOTPService, socialLoginService, updateProfileService } from "../service/user";
import constants from "../utils/constants";


//TODO: Add requst validation too
const loginUser = async (req: Request, res: Response) => {
    try {
        const user = req.body as ILoginUser;
        // Call async login function
        await login(user);

        // If login function completes without throwing an error, send success response
        res.status(httpStatus.OK).json({ message: constants.MESSAGE.SUCCESS, data: constants.OTP.OTP_SENT });
    } catch (error: any) {

        // Send appropriate error response
        res.status(error.status).json({ error: error.message });
    }
}

const verifyOTP = async (req: Request, res: Response) => {
    try {
        var ip = req.ip
        const userOTP = req.body as IVerfiyOTP;
        const token = await verifyOTPService(userOTP, ip);
        res.status(httpStatus.OK).json({ message: constants.MESSAGE.SUCCESS, data: token });
    } catch (error: any) {
        console.log(error)
        res.status(error.status).json({ error: error.message });
    }
}


const resendOTP = async (req: Request, res: Response) => {
    try {
        const user = req.body as ILoginUser;
        await resendOTPService(user);
        res.status(httpStatus.OK).json({ message: constants.MESSAGE.SUCCESS, data: constants.OTP.OTP_SENT });
    } catch (error: any) {
        console.log(error)
        res.status(error.status).json({ error: error.message });
    }
}


const socialLogin = async (req: Request, res: Response) => {
    try {
        var ip = req.ip
        var reqBody = req.body as ISocialLogin;
        const token = await socialLoginService(reqBody, ip);
        res.status(httpStatus.OK).json({ message: constants.MESSAGE.SUCCESS, data: token });

    } catch (error: any) {
        res.status(error.status).json({ error: error.message });
    }
}


const updateProfile = async (req: Request, res: Response) => {

    try {
        const userReq = req.body as IUpdateProfile
        const token = await updateProfileService(userReq, req.file);
        res.status(httpStatus.OK).json({ message: constants.MESSAGE.SUCCESS, data: token });
    } catch (error: any) {
        res.status(error.status).json({ error: error.message });
    }

}

// const logout = (req: Request, res: Response) => {
//     const token = req.header(constants.AUTHORISATION)

//     res.status

// }

export {
    loginUser,
    verifyOTP,
    resendOTP,
    socialLogin,
    updateProfile
}