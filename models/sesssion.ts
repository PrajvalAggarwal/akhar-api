import { ISessions } from "../Interface/sessions";
import mongoose, { model, Schema } from "mongoose";

const sessionModel = model<ISessions>('Sessions', new Schema<ISessions>({

    browserName: { type: String, default: "", trim: true },
    osName: { type: String, default: "", trim: true },
    ip: { type: String, default: "", trim: true },
    location: {
        city: {
            type: String,
            default: "",
        },
        country: {
            type: String,
            default: "",
        },
        region: {
            type: String,
            default: "",
        },
        timezone: {
            type: String,
            default: "",
        },
        coordinates: [Number], // Array of [longitude, latitude] for GeoJSON

    },
    loginAt: { type: Date, default: new Date },
    expiredAt: { type: Date, default: new Date }, // 5 is min
    logoutAt: { type: Date, default: null },
    isMobile: { type: Boolean, default: false },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    token: {
        type: String,
        default: "",
        required: true
    },


}, { timestamps: true }))


export default sessionModel