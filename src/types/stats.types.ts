import { Types } from "mongoose"
import { Emote, UserTag } from "./message.types"

export interface DailyMessageStats extends DailyMessageStatsHeaders {
    statsPerUser: StatsPerUser[]
}

export interface DailyMessageStatsHeaders {
    _id?: Types.ObjectId
    lastAnalyzedMessage: Types.ObjectId
    guild: string
    channel: string
    date: number
}

export interface StatsPerUser {
    author: string
    total: number
    activeMinutes: number
    emotes: EmoteCounts[]
    userTags: UserTagCounts[]
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
