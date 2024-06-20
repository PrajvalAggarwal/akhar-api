import { ISessions } from "../Interface/sessions";
import mongoose,{ model, Schema } from "mongoose";

const sessionModel=model<ISessions>('Sessions',new Schema<ISessions>({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    token:{
        type:String,
        required:true
    },
},{timestamps:true}))


export default sessionModel