import Discord, { TextChannel } from "discord.js"
import { fetchMessagesAfter } from "../../fetch/fetchMessages"
import { saveMessage } from "../../repositories/message-repository"
import { Saving } from "../../types/message.types"
import BaseModule from "../base-module"
import Log from "./../../log"

export default class MessageSaver extends BaseModule {
    moduleName = "MessageSaverModule"
    savings: Saving[]

    constructor(client: Discord.Client<boolean>) {
        super(client)
        this.savings = require("../../data/savings.json")
    }

    saveMessagesFromAll() {
        this.savings.forEach((s) => {
            this.saveMessagesFromChannelAfter(s.channelID, s.lastID)
            Log.success(`Done saving - ${s}`)
        })
    }

    async saveMessagesFromChannelAfter(channelID: string, after: string) {
        const channel = this.client.channels.cache.get(channelID)
        if (!(channel instanceof TextChannel)) return
        let lastID: string = after

        // eslint-disable-next-line no-constant-condition
        while (true) {
            try {
                const messages = await fetchMessagesAfter(channel, lastID, 100)
                if (messages.size === 0) return

                messages.forEach((m) => {
                    if (
                        m.author.bot ||
                        m.system ||
                        m.content === "" ||
                        !m.content
                    )
                        return
                    try {
                        saveMessage(m)
                    } catch (err) {
                        Log.error(err)
                    }
                })
                lastID = messages.firstKey()
            } catch (err) {
                console.error(err)
                return
            }
        }
    }
}
