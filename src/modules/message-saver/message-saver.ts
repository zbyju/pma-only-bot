import Discord, { TextChannel } from "discord.js"
import { fetchMessagesAfter } from "../../fetch/fetchMessages"
import { saveMessage } from "../../repositories/message-repository"
import { Saving } from "../../types/message.types"
import CronModule from "../cron-module"

export default class MessageSaver extends CronModule {
    moduleName = "MessageSaverModule"
    savings: Saving[]
    schedule: string = "* 5 5 * * *"

    constructor(client: Discord.Client<boolean>) {
        super(client)
        this.savings = require("../../data/backup-sources.json")
    }

    onCron() {
        this.saveMessagesFromAll()
    }

    saveMessagesFromAll() {
        this.savings.forEach((s) => {
            this.saveMessagesFromChannelAfter(s.channelID, s.firstID)
            console.log(`Done saving - ${s}`)
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

                messages.forEach(async (m) => {
                    if (
                        m.author.bot ||
                        m.system ||
                        m.content === "" ||
                        !m.content
                    )
                        return
                    try {
                        await saveMessage(m)
                    } catch (err) {
                        console.log(err)
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
