import { model, Schema } from "mongoose";
import { POBMessage } from "../types/message.types";

const schema = new Schema<POBMessage>({
    author: { type: String, required: true },
    channel: { type: String, required: true },
    guild: { type: String, required: true},
    content: { type: String, required: true },
    postedAt: { type: Number, required: true },
    msgId: { type: String, required: true, unique: true },
    tts: { type: Boolean },
    url: { type: String },
}, { timestamps: true });

export const MessageModel = model<POBMessage>("Message", schema)