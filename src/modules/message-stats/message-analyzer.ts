import Discord from "discord.js"
import Log from "../../log"
import { MessageStatsModel } from "../../model/channel-message-stats"
import { BackupSource, POBMessage } from "../../types/message.types"
import BaseModule from "../base-module"
import mongoose, { Types } from "mongoose"
import { getMessageStatsHeaderByChannel } from "../../repositories/message-stats-repository"
import { getMessagesByChannel } from "../../repositories/message-repository"
import { DailyAnalyzedMessageResult, DailyStat } from "../../types/stats.types"
import {
    getEmotesFromMessage,
    getUserTagsFromMessage,
} from "../../utils/message-parser"
import {
    emotesToEmoteCounts,
    userTagsToUserTagCounts,
} from "../../utils/stats/conversions"

export default class MessageAnalyzer extends BaseModule {
    moduleName = "MessagesAnalyzerModule"
    backups: BackupSource[]

    constructor(client: Discord.Client<boolean>) {
        super(client)
        this.backups = require("../../data/backup-sources.json")
    }

    analyze() {
        Log.debug("Analyzing")

        this.backups.forEach(async (b) => {
            try {
                const stats = await getMessageStatsHeaderByChannel(b.channelID)
                if (stats !== null && stats.lastAnalyzedMessage) {
                    this.analyzeFrom(stats.channel, stats.lastAnalyzedMessage)
                } else {
                    this.analyzeAll(b.channelID)
                }
            } catch (err) {
                Log.error(err)
            }
        })
    }

    private splitByDate(dailyResults: DailyAnalyzedMessageResult[]) {
        let dailyStats: DailyStat[] = []
        dailyStats.forEach(s => {
            const findExisting = dailyStats.find(x => x.date === s.postedAt)
            if(findExisting === undefined) {
                dailyStats.push({
                    date: 
                }])
            }
        })
    }

    private splitByUser(dailyResults: DailyAnalyzedMessageResult[]) {
        let users = []
        dailyResults.forEach()
    }

    async analyzeAll(channelID: string) {
        const allMessages = await getMessagesByChannel(channelID)
        const dailyStats = this.reduceToDailyStats(
            allMessages.map((m) => this.analyzeMessageDaily(m))
        )
    }

    async analyzeFrom(channelID: string, lastAnalyzedMessage: Types.ObjectId) {}

    analyzeMessageDaily(message: POBMessage): DailyAnalyzedMessageResult {
        //Get all emotes
        const emotes = getEmotesFromMessage(message.content)
        const usertags = getUserTagsFromMessage(message.content)
        return {
            postedAt: message.postedAt,
            userID: message.author,
            emotes: emotesToEmoteCounts(emotes),
            userTags: userTagsToUserTagCounts(usertags),
        }
    }
}
