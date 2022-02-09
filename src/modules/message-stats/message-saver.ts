import Discord, { TextChannel } from "discord.js"
import { fetchMessagesAfter } from "../../fetch/fetchMessages"
import {
    getLastMessage,
    saveMessage,
} from "../../repositories/message-repository"
import { BackupSource } from "../../types/message.types"
import CronModule from "../cron-module"
import Log from "../../log"
import MessageAnalyzer from "./message-analyzer"

export default class MessageSaver extends CronModule {
    moduleName = "MessageSaverModule"
    backups: BackupSource[]
    schedule: string = "* 5 5 * * *"

    constructor(client: Discord.Client<boolean>) {
        super(client)
        this.backups = require("../../data/backup-sources.json")
    }

    onCron() {
        this.saveMessagesFromAll(() => {
            Log.debug("cb")
            new MessageAnalyzer(this.client).analyze()
        })
    }

    async saveMessagesFromAll(cb: CallableFunction) {
        await Promise.all(
            this.backups.map(async (b: BackupSource) => {
                const lastSavedMessageID: string =
                    (await getLastMessage(b.channelID)).msgId || b.firstID
                await this.saveMessagesFromChannelAfter(
                    b.channelID,
                    lastSavedMessageID
                )
            })
        )
        cb()
    }

    async saveMessagesFromChannelAfter(channelID: string, after: string) {
        const channel = this.client.channels.cache.get(channelID)
        if (!(channel instanceof TextChannel)) return
        let lastID: string = after

        // eslint-disable-next-line no-constant-condition
        while (true) {
            try {
                const messages = await fetchMessagesAfter(channel, lastID, 100)
                if (messages.size === 0) {
                    Log.info(`Done saving - ${channel}`)
                    return
                }

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
                        Log.error(err)
                    }
                })
                lastID = messages.firstKey()
            } catch (err) {
                Log.error(err)
                return
            }
        }
    }
}
