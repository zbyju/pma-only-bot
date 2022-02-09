import Discord from "discord.js"
import Log from "../../log"
import { MessageStatsModel } from "../../model/channel-message-stats"
import { BackupSource } from "../../types/message.types"
import BaseModule from "../base-module"
import mongoose from "mongoose"

export default class MessageAnalyzer extends BaseModule {
    moduleName = "MessagesAnalyzerModule"
    backups: BackupSource[]

    constructor(client: Discord.Client<boolean>) {
        super(client)
        this.backups = require("../../data/backup-sources.json")
    }

    onCron() {
        Log.debug("Analyzing")
    }
}
