import { Types } from "mongoose"

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
    date: Date
    users: [
        {
            author: string
            total: number
            activeMinutes: number
            emotes: [
                {
                    name: string
                    id: string
                    count: string
                }
            ]
        }
    ]
}
