import Discord from "discord.js"
import cron from "node-cron"
import GMSender from "./modules/gm-module/gm-sender"
import BatChestSender from "./modules/bat-chest-module/bat-chest-sender"
import MessageSaver from "./modules/message-saver/message-saver"

export default class BotInitialization {
    client: Discord.Client<boolean>

    //Modules:
    gmSender: GMSender
    batChestSender: BatChestSender
    messageSaver: MessageSaver

    constructor(client: Discord.Client<boolean>) {
        this.client = client
        this.gmSender = new GMSender(client)
        this.batChestSender = new BatChestSender(client)
        this.messageSaver = new MessageSaver(client)
    }

    init() {
        this.initCommands()
        this.initCron()
    }

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
        this.messageSaver.saveMessagesFromAll()
        cron.schedule("* 5 5 * * *", () => {
            this.messageSaver.saveMessagesFromAll()
        })
    }
}
