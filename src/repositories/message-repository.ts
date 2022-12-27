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
  })
}

export const saveMessagePOB = (message: POBMessage): Promise<POBMessage> => {
  return new Promise((resolve, reject) => {
    try {
      MessageModel.create(message, (err: CallbackError, m: POBMessage) => {
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

export const getLastMessage = (
  guildID: string,
  channelID: string
): Promise<POBMessage> => {
  return new Promise((resolve, reject) => {
    try {
      MessageModel.findOne({ channel: channelID, guild: guildID })
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
