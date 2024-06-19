

import { ILoginUser, IUser } from "../Interface/user";
import User from "../models/user";



const login = async (req:ILoginUser) => {
    try {
        const user = await User.findOne({ email: req.email });
        if (!user) {
            //If user not found create the entry into the db of that user

            const newUser = new User({
                email: req.email,
            });
            await newUser.save();
        }

        //Send te otp to that user
        
       
        return user;
    } catch (error) {
        console.error('Error in logging in user:', error);
    }
}



export {login};