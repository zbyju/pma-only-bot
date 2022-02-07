import Discord from "discord.js";
import BaseModule from "../baseModule"

export default class GMSender extends BaseModule {
    constructor(client: Discord.Client<boolean>) {
        super(client)
    }

    onMessage(message: Discord.Message<boolean>) {
        if(message.content.trim().toLowerCase() === "gm") {
            message.reply("gm")
        }
    }
}