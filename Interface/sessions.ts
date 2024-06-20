import mongoose,{Document} from "mongoose";

export interface ISessions extends Document{
    userId:mongoose.Types.ObjectId;
    token:string,
    createdAt: Date;
    updatedAt: Date;
}
