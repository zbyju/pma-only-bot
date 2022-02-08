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
<<<<<<< HEAD
    
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
=======

    async onCommand(interaction: Discord.Interaction<Discord.CacheType>) {
        if (!interaction.isCommand()) return

        if (interaction.commandName === "ping") {
            await interaction.reply("Pong!")
        }
    }

    onMessage(message: Discord.Message<boolean>) {
        console.log(message.content)
        this.gmSender.onMessage(message)
        this.batChestSender.onMessage(message)
    }

    initCommands() {
        const guildId = process.env.TEST_GUILD_ID || ""
        const guild = this.client.guilds.cache.get(guildId)
        const commands = guild
            ? guild.commands
            : this.client.application?.commands

        commands?.create({
            name: "ping",
            description: "Replies with pong.",
        })
    }

    initCron() {
        cron.schedule("* 5 5 * * *", () => {
            this.messageSaver.saveMessagesFromAll()
>>>>>>> 0c9b8431486a7fe8cf9eef7fe10b51547e595bfe
        })
    }
}
