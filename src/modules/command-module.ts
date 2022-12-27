import Discord from "discord.js"
import BaseModule from "./base-module"

export default abstract class CommandModule extends BaseModule {
  moduleName = "CommandModule"
  client: Discord.Client<boolean>

  abstract name: string
  abstract description: string

  constructor(client: Discord.Client<boolean>) {
    super(client)
  }

  abstract onCommand(command: Discord.Interaction<Discord.CacheType>): void
}
