import { POBMessage } from "../types/message.types"
import { CallbackError } from "mongoose"
import { MessageModel } from "../model/messages"
import Discord from "discord.js"

export const saveMessage = (m: Discord.Message) => {
    return saveMessagePOB({
        author: m.author.id,
        content: m.content,
        channel: m.channelId,
        guild: m.guildId,
        postedAt: m.createdTimestamp,
        msgId: m.id,
        ...(m.tts && { tts: m.tts }),
        ...(m.url && { url: m.url }),
    })
}

export const saveMessagePOB = (message: POBMessage): Promise<POBMessage> => {
    return new Promise((resolve, reject) => {
        try {
            MessageModel.create(
                message,
                (err: CallbackError, m: POBMessage) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(m)
                    }
                }
            )
        } catch (err) {
            reject(err)
        }
    })
}

export const getMessagesByChannel = (
    channelID: string,
    sort: Record<string, any> = {}
): Promise<POBMessage[]> => {
    return new Promise((resolve, reject) => {
        try {
            MessageModel.find({ channel: channelID })
                .sort(sort)
                .exec((err: CallbackError, m: POBMessage[]) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(m)
                    }
                })
        } catch (err) {
            reject(err)
        }
    })
}

export const getLastMessage = (channelID: string): Promise<POBMessage> => {
    return new Promise((resolve, reject) => {
        try {
            MessageModel.findOne({ channel: channelID })
                .sort({ postedAt: -1 })
                .exec((err: CallbackError, m: POBMessage) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(m)
                    }
                })
        } catch (err) {
            reject(err)
        }
    })
}
