require('dotenv').config()
import Discord from "discord.js"
import mongoose from "mongoose"
import dbConfig from "../config/database.json"
import { BotInitialization } from "./init"

const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.DIRECT_MESSAGES]
})

const botInit = new BotInitialization(client)

//Connect to MongoDB
mongoose.connect(`mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`,
    dbConfig.options, (err) => {
  if(err) {
    console.error(err)
  } else {
    console.log("Connected to MongoDB")
  }
});

client.once("ready", async () => {
  console.log("POB is ready!")
  botInit.init()
})

client.on('interactionCreate', interaction => botInit.onMessage(interaction));

client.login(process.env.TOKEN || "")