import Discord from "discord.js"
import BaseModule from "./base-module"
import Log from "./../log"
import { APIApplicationCommandOption } from "discord-api-types/v9"

export default abstract class CommandModule extends BaseModule {
    moduleName = "CommandModule"
    client: Discord.Client<boolean>

    abstract name: string
    abstract description: string
    abstract hasPermission: boolean
    abstract options: APIApplicationCommandOption[]

    protected get Name(): string {
        return this.name.toLowerCase()
    }

    constructor(client: Discord.Client<boolean>) {
        super(client)
    }

    async registerCommand(): Promise<void> {
        if (this.name.includes(" ")) {
            throw new Error(
                `Command name '${this.name}' cannot contain whitespace`
            )
        }

        Log.debug(
            "Registering command name:",
            this.Name,
            "description:",
            this.description
        )

        const guild = this.client.guilds.cache.get(process.env.TEST_GUILD_ID)

        const newCommand = await guild.commands?.create({
            name: this.Name,
            description: this.description,
            default_permission: this.hasPermission,
            options: this.options,
        })

        if (this.hasPermission) {
            //newCommand.permissions.add()
            Log.debug("Giving permission")
        }

        if (newCommand) {
            Log.debug("Registered command", this.Name)
        }
    }

    abstract onCommand(
        command: Discord.Interaction<Discord.CacheType>
    ): Promise<void>
}
