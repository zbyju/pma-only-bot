import Discord from "discord.js"
import Log from "../log"
import AdminListSender from "./admin-list-module/admin-list-sender"
import BaseModule from "./base-module"
import BatChestSender from "./bat-chest-module/bat-chest-sender"
import CommandModule from "./command-module"
import CronModule from "./cron-module"
import GMSender from "./gm-module/gm-sender"
import MessageModule from "./message-module"
import MessageSaver from "./message-saver/message-saver"

export default class ModuleRegisterer {
    commandModules: CommandModule[]
    cronModules: CronModule[]
    messageModules: MessageModule[]

    moduleTypes: typeof BaseModule[] = [
        MessageSaver,
        GMSender,
        BatChestSender,
        AdminListSender,
    ]
    modules: BaseModule[]

    constructor(client: Discord.Client<boolean>) {
        this.commandModules = []
        this.cronModules = []
        this.messageModules = []
        try {
            this.modules = this.moduleTypes.map((t) => t.create(client))
        } catch (error) {
            Log.error(error)
        }
        this.modules.forEach((m) => this.registerNewModule(m))
    }

    registerNewModule(module: BaseModule) {
        if (module instanceof CommandModule) {
            this.commandModules.push(module)
        }
        if (module instanceof CronModule) {
            this.cronModules.push(module)
        }
        if (module instanceof MessageModule) {
            this.messageModules.push(module)
        }
    }
}
