import Log from "../log"
import { Emote } from "../types/message.types"

export const getEmotesFromMessage = (message: string): Array<Emote> => {
    const emotes = message.match(/<\w*:[^:]+:[^:]+>/g)
    if (emotes === null) return []
    return emotes.map((e) => {
        const split = e.split(":")
        return {
            name: split[1],
            id: split[2],
        }
    })
}
