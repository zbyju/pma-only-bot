import Discord from "discord.js"
import MessageModule from "../message-module"

export default class BatChestSender extends MessageModule {
    moduleName = "BatChestModule"
    batchest: Discord.GuildEmoji

    constructor(client: Discord.Client<boolean>) {
        super(client)
        this.batchest = this.client.emojis.cache.find(
            (e) =>
                e.name.toLowerCase().includes("bat") &&
                e.name.toLowerCase().includes("chest")
        )
    }

    onMessage(message: Discord.Message<boolean>) {
        if (!this.batchest) return
        if (
            message.content.trim().toLowerCase().includes("i") &&
            message.content.trim().toLowerCase().includes("heckin") &&
            message.content.trim().toLowerCase().includes("love")
        ) {
            message.reply(`<:${this.batchest.name}:${this.batchest.id}>`)
        }
    }
}
