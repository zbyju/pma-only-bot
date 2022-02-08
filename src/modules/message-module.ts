import Discord from "discord.js"
import BaseModule from "./base-module"

export default abstract class MessageModule extends BaseModule {
    moduleName = "MessageModule"
    client: Discord.Client<boolean>

    constructor(client: Discord.Client<boolean>) {
        super(client)
    }

    abstract onMessage(message: Discord.Message<boolean>): void
}
