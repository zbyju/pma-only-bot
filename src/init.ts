import Discord from "discord.js"

export class BotInitialization {
    client: Discord.Client<boolean>
    constructor(client: Discord.Client<boolean>) {
        this.client = client
    }

    init() {
        this.initCommands()
        this.initCron()
    }
    
    async onMessage(interaction: Discord.Interaction<Discord.CacheType>) {
        if(!interaction.isCommand()) return;
    
        if(interaction.commandName === "ping") {
            await interaction.reply("Pong!")
        }
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
        
    }
}


