import { Schema, model } from 'mongoose';
import { IUser } from '../Interface/user';


const User = model<IUser>('User', new Schema<IUser>({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    pic:{
        type:String,
    },
    socialId:{
     type:String,
    },
    socialType:{
        type:String,
    },
    dob:{
        type:Date,
        required:true
    }
}))

export default User;