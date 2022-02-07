import Discord from "discord.js"
import cron from "node-cron"
import GMSender from "./modules/gm-module/GMSender"

export default class BotInitialization {
    client: Discord.Client<boolean>

    //Modules:
    gmSender: GMSender

    constructor(client: Discord.Client<boolean>) {
        this.client = client
        this.gmSender = new GMSender(client)
    }

    init() {
        this.initCommands()
        this.initCron()
    }
    
    async onCommand(interaction: Discord.Interaction<Discord.CacheType>) {
        if(!interaction.isCommand()) return;
    
        if(interaction.commandName === "ping") {
            await interaction.reply("Pong!")
        }
    }

    onMessage(message: Discord.Message<boolean>) {
        console.log(message.content)
        this.gmSender.onMessage(message)
    }
    
    initCommands() {
        const guildId = process.env.TEST_GUILD_ID || ""
        const guild = this.client.guilds.cache.get(guildId)
        const commands = guild ? guild.commands : this.client.application?.commands
    
        commands?.create({
            name: "ping",
            description: "Replies with pong."
        })
    }
    
    initCron() {
        cron.schedule('* 5 5 * * *', () => {

        })
    }
}


