import Discord from "discord.js"
import cron from "node-cron"
import ModuleRegisterer from "./modules/module-registerer"

export default class BotInitialization {
    client: Discord.Client<boolean>
    registerer: ModuleRegisterer

    constructor(client: Discord.Client<boolean>) {
        this.client = client
        this.registerer = new ModuleRegisterer(client)
    }

    init() {
        this.initCronJobs()
    }
    
    onCommand(interaction: Discord.Interaction<Discord.CacheType>) {
        if(!interaction.isCommand()) return;
        this.registerer.commandModules.forEach(m => m.onCommand(interaction))
    }

    onMessage(message: Discord.Message<boolean>) {
        this.registerer.messageModules.forEach(m => m.onMessage(message))
    }

    initCronJobs() {
        this.registerer.cronModules.forEach(m => {
            cron.schedule(m.schedule, m.onCron)
        })
    }
}
