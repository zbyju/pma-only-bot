import { model, Schema } from "mongoose"
import { POBMessage } from "../types/message.types"

const schema = new Schema<POBMessage>(
    {
        author: { type: String, required: true, index: true },
        channel: { type: String, required: true },
        guild: { type: String, required: true },
        content: { type: String, required: true },
        postedAt: { type: Number, required: true },
        msgId: { type: String, required: true, unique: true, index: true },
        tts: { type: Boolean },
        url: { type: String },
    },
    { timestamps: true }
)

schema.index({ guild: 1, channel: 1, msgId: 1, postedAt: -1 })

export const MessageModel = model<POBMessage>("Message", schema)
