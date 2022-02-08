import Discord from "discord.js"
import BaseModule from "../base-module"

export default class GMSender extends BaseModule {
    moduleName = "GMSenderModule"
    constructor(client: Discord.Client<boolean>) {
        super(client)
    }

    onMessage(message: Discord.Message<boolean>) {
        if (message.content.trim().toLowerCase() === "gm") {
            message.reply("gm")
        }
    }
}
