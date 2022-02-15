import { CallbackError } from "mongoose"
import Discord from "discord.js"
import { MessageStatsModel } from "../model/channel-message-stats"
import { MessageStats, MessageStatsHeaders } from "../types/stats.types"

export const getMessageStatsHeaderByChannel = (
    channelID: string
): Promise<MessageStatsHeaders> => {
    return new Promise((resolve, reject) => {
        try {
            MessageStatsModel.findOne(
                { channel: channelID },
                "lastAnalyzedMessage guild channel _id",
                (err: CallbackError, m: MessageStatsHeaders) => {
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
