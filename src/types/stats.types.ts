import { Types } from "mongoose"

export interface MessageStats {
    _id?: Types.ObjectId
    lastAnalyzedMessage: Types.ObjectId
    guild: string
    channel: string
    dailyStats: DailyStat[]
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
                    count: string
                }
            ]
        }
    ]
}
