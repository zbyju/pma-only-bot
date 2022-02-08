import { Types } from "mongoose"

export interface POBMessage {
    author: string
    channel: string
    guild: string
    content: string
    postedAt: number
    msgId: string
    tts?: boolean
    url?: string
    _id?: Types.ObjectId
    createdAt?: Date
    updatedAt?: Date
}

export interface Saving {
    lastID: string
    channelID: string
    guildID: string
}
