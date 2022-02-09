import Discord from "discord.js"
import CommandModule from "../command-module"
import Log from "./../../log"

export default class AdminListSender extends CommandModule {
    moduleName: string = "AdminListModule"
    name: string = "adminlist"
    description: string = "List of bot administrators"

    constructor(client: Discord.Client<boolean>) {
        super(client)
        this.registerCommand()
    }

    async onCommand(
        command: Discord.CommandInteraction<Discord.CacheType>
    ): Promise<void> {
        if (command.commandName == this.Name) {
            await command.reply("Hello, world")
        }
    }
}
