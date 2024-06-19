
import { Request, Response } from "express";
import httpStatus from 'http-status';
import { ILoginUser, IVerfiyOTP } from "../Interface/user";
import { login } from "../service/user";
import constants from "../utils/constants";

//TODO: Add requst validation too
const loginUser = async (req: Request, res: Response) => {
    try {
        const user = req.body as ILoginUser;
    
        // Call async login function
        await login(user);
    
        // If login function completes without throwing an error, send success response
        res.status(httpStatus.OK).json({ message: constants.MESSAGE.SUCCESS, data: "OTP Sent Successfully" });
      } catch (error) {
        console.error('Error in loginUser:', error);
           
        // Send appropriate error response
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error });
      }
}

const verifyOTP = async (req: Request, res: Response) => {
    try{
        const userOTP = req.body as IVerfiyOTP;
        await verifyOTP(userOTP);
        res.status(httpStatus.OK).json({ message: constants.MESSAGE.SUCCESS, data: "OTP Sent Successfully" });
    }catch (error) {
        console.error('Error in verifyOTP:', error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error });
    }
}

export  {
    loginUser,
    verifyOTP
}