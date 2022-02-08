import Discord from "discord.js"
import BaseModule from "./base-module"

export default abstract class CronModule extends BaseModule {
    moduleName = "CronModule"
    client: Discord.Client<boolean>

    // Schedule for node-cron (https://www.npmjs.com/package/node-cron)
    // Format * * * * * * - sec min hour dom month dow
    abstract schedule: string

    constructor(client: Discord.Client<boolean>) {
        super(client)
    }

    abstract onCron(): void
}
