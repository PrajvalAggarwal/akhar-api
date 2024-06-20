import mongoose, { Document } from "mongoose";

export interface ISessions extends Document {
    browserName: string;
    osName: string;
    ip: string;
    location: any;
    loginAt: Date;
    expiredAt: Date;
    logoutAt: Date;
    isMobile: boolean;
    userId: mongoose.Types.ObjectId;
    token: string,
    createdAt: Date;
    updatedAt: Date;
}

