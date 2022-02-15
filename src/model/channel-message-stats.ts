import { model, Schema } from "mongoose"
import { DailyMessageStats } from "../types/stats.types"

const schema = new Schema<DailyMessageStats>({
    lastAnalyzedMessage: { type: Schema.Types.ObjectId, required: true },
    guild: { type: String, required: true },
    channel: { type: String, required: true },
    date: { type: Number, required: true, unique: true },
    statsPerUser: [
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
})

schema.index({ guild: 1, channel: 1, date: -1 })

export const MessageStatsModel = model<DailyMessageStats>(
    "MessageStats",
    schema
)
