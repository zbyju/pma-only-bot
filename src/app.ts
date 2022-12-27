// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config()
import Discord from "discord.js"
import mongoose from "mongoose"
import dbConfig from "../config/database.json"
import Log from "./log"
import BotInitialization from "./bot-initialization"

const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.DIRECT_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
  ],
})

//Connect to MongoDB
mongoose.connect(
  `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`,
  dbConfig.options,
  (err) => {
    if (err) {
      Log.error(err)
    } else {
      Log.success("Connected to MongoDB")
    }
  }
)

client.once("ready", async () => {
  Log.success("POB is ready!")
  const botInit = new BotInitialization(client)
  botInit.init()

  client.on("interactionCreate", (interaction) =>
    botInit.onCommand(interaction)
  )

  client.on("messageCreate", (message) => {
    if (message.author.bot) return
    botInit.onMessage(message)
  })
})

client.login(process.env.TOKEN || "")
