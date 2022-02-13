import { Types } from "mongoose"
import { Emote, UserTag } from "./message.types"

export interface MessageStats extends MessageStatsHeaders {
    dailyStats: DailyStat[]
}

export interface MessageStatsHeaders {
    _id?: Types.ObjectId
    lastAnalyzedMessage: Types.ObjectId
    guild: string
    channel: string
}

export interface DailyStat {
    date: number
    users: [
        {
            author: string
            total: number
            activeMinutes: number
            emotes: EmoteCounts[]
            userTags: UserTagCounts[]
        }
    ]
}

export interface EmoteCounts extends Emote {
    count: number
}

export interface UserTagCounts extends UserTag {
    count: number
}

export interface DailyAnalyzedMessageResult {
    postedAt: number
    userID: string
    emotes: EmoteCounts[]
    userTags: UserTagCounts[]
}
