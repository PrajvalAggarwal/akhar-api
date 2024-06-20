import mongoose, { Schema, model } from 'mongoose';
import { IUser, IUserOTP } from '../Interface/user';
import constants from '../utils/constants';


const User = model<IUser>('User', new Schema<IUser>({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        default: ""
    },
    pic: {
        type: String,
        default: ""
    },
    socialId: {
        type: String,
        default: ""
    },
    socialType: {
        type: String,
        default: ""
    },

}, { timestamps: true }))


const UserOtp = model<IUserOTP>('UserOtp', new Schema<IUserOTP>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    otp: {
        type: Number,
        // required:true
    },
    expiresIn: {
        type: Date,
        default: () => new Date(Date.now() + constants.OTP.EXPIRES_IN)
        // required:true
    }
}, { timestamps: true }))

export { User, UserOtp };