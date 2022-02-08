import chalk from "chalk"
import emoji from "node-emoji"

export default class Log {
    private static colorError = chalk.red
    private static colorDebug = chalk.white
    private static colorInfo = chalk.cyan
    private static colorSuccess = chalk.green
    private static colorWarning = chalk.yellow

    private static getEmote(name: string): string {
        let symbol = emoji.emojify(`${name}`, () => {
            return ""
        })
        if (symbol != "") {
            symbol += " "
        }
        return symbol
    }

    public static debug(...args) {
        // exit if not running in development
        if (!process.env.NODE_ENV) return
        console.log(this.colorDebug(`[${this.getEmote("⚪")}Debug]`), ...args)
    }

    public static warning(...args) {
        console.warn(
            this.colorWarning(`[${this.getEmote("🟡")}Warning]`),
            ...args
        )
    }

    public static info(...args) {
        console.log(this.colorInfo(`[${this.getEmote("🔵")}Info]`), ...args)
    }

    public static success(...args) {
        console.log(
            this.colorSuccess(`[${this.getEmote("🟢")}Success]`),
            ...args
        )
    }

    public static error(...args) {
        console.error(this.colorError(`[${this.getEmote("🔴")}Error]`), ...args)
    }
}
