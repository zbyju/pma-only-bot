require('dotenv').config()
import Discord from "discord.js"
import mongoose from "mongoose"
import dbConfig from "../config/database.json"
import BotInitialization from "./init"

const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.DIRECT_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGES]
})

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
  const botInit = new BotInitialization(client)
  botInit.init()

  client.on('interactionCreate', interaction => botInit.onCommand(interaction));

  client.on('messageCreate', message => {
    if(message.author.bot) return;
    botInit.onMessage(message)
  });
})

client.login(process.env.TOKEN || "")