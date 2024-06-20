
import { Request, Response } from "express";
import httpStatus from 'http-status';
import { ILoginUser, IVerfiyOTP } from "../Interface/user";
import { login,verifyOTPService,resendOTPService } from "../service/user";
import constants from "../utils/constants";

//TODO: Add requst validation too
const loginUser = async (req: Request, res: Response) => {
    try {
        const user = req.body as ILoginUser;
    
        // Call async login function
        await login(user);
    
        // If login function completes without throwing an error, send success response
        res.status(httpStatus.OK).json({ message: constants.MESSAGE.SUCCESS, data:constants.OTP.OTP_SENT });
      } catch (error:any) {           

        // Send appropriate error response
         res.status(error.status).json({ error: error.message });
      }
}

const verifyOTP = async (req: Request, res: Response) => {
    try{
        const userOTP = req.body as IVerfiyOTP;
       const token= await verifyOTPService(userOTP);
        res.status(httpStatus.OK).json({ message: constants.MESSAGE.SUCCESS, data: token });
    }catch (error:any) {
        console.log(error)
        res.status(error.status).json({ error: error.message });
    }
}


const resendOTP = async (req: Request, res: Response) => {
    try{
        const user = req.body as ILoginUser;
        await resendOTPService(user);
        res.status(httpStatus.OK).json({ message: constants.MESSAGE.SUCCESS, data:constants.OTP.OTP_SENT });
    }catch (error:any) {
        console.log(error)
        res.status(error.status).json({ error: error.message });
    }
}

export  {
    loginUser,
    verifyOTP,
    resendOTP
}