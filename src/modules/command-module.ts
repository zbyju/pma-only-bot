import Discord from "discord.js"
import BaseModule from "./base-module"
import Log from "./../log"

export default abstract class CommandModule extends BaseModule {
    moduleName = "CommandModule"
    client: Discord.Client<boolean>

    abstract name: string
    abstract description: string

    protected get Name(): string {
        return this.name.toLowerCase()
    }

    constructor(client: Discord.Client<boolean>) {
        super(client)
    }

    registerCommand(): void {
        if (this.name.includes(" ")) {
            throw new Error(
                `Command name '${this.name}' cannot contain whitespace`
            )
        }

        const newName = this.name.toLowerCase()

        Log.debug(
            "Registering command name:",
            newName,
            "description:",
            this.description
        )
        this.client.application.commands?.create({
            name: newName,
            description: this.description,
        })
    }

    abstract onCommand(
        command: Discord.Interaction<Discord.CacheType>
    ): Promise<void>
}
