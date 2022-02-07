import Discord, { TextChannel } from "discord.js"
import { fetchMessagesAfter } from "../../fetch/fetchMessages"
import { saveMessage } from "../../repositories/message-repository"
import { Saving } from "../../types/message.types"
import BaseModule from "../base-module"

export default class MessageSaver extends BaseModule {
    savings: Saving[]

    constructor(client: Discord.Client<boolean>) {
        super(client)
        this.savings = require("../../data/savings.json")
    }

    saveMessagesFromAll() {
        console.log("SAVING MESSAGES")
        this.savings.forEach(s => {
            this.saveMessagesFromChannelAfter(s.channelID, s.lastID)
        })
    }

    async saveMessagesFromChannelAfter(channelID: string, after: string) {
        const channel = this.client.channels.cache.get(channelID)
        if(!(channel instanceof TextChannel)) return
        let lastID: string = after

        while(true) {
            try {
                const messages = await fetchMessagesAfter(channel, lastID, 100)
                if(messages.size === 0) return

                messages.forEach(m => {
                    if(m.author.bot || m.system || m.content === "" || !m.content) return
                    try {
                        saveMessage(m)
                    } catch(err) { console.log(err) }
                })
                lastID = messages.firstKey()
            } catch(err) { console.error(err); return [] }
        }
    }
}