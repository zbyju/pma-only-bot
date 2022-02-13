import { model, Schema } from "mongoose"
import { MessageStats } from "../types/stats.types"

const schema = new Schema<MessageStats>({
    lastAnalyzedMessage: { type: Schema.Types.ObjectId, required: true },
    guild: { type: String, required: true },
    channel: { type: String, required: true },
    dailyStats: [
        {
            date: { type: Number, required: true, unique: true },
            users: [
                {
                    author: { type: String, required: true, unique: true },
                    total: { type: Number, required: true },
                    activeMinutes: { type: Number, required: true },
                    emotes: [
                        {
                            name: { type: String, required: true },
                            id: { type: String, required: true },
                            count: { type: Number, required: true },
                        },
                    ],
                    userTags: [
                        {
                            id: { type: String, required: true },
                            count: { type: Number, required: true },
                        },
                    ],
                },
            ],
        },
    ],
})

schema.index({ guild: 1, channel: 1, "dailyStats.date": 1 })

export const MessageStatsModel = model<MessageStats>("MessageStats", schema)
