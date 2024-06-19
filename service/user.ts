

import { ILoginUser, IUser } from "../Interface/user";
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



export {login};