import Log from "../log"
import { Emote, UserTag } from "../types/message.types"

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

export const getUserTagsFromMessage = (message: string): Array<UserTag> => {
    const userTags = message.match(/<@!\d+>/g)
    if (userTags === null) return []
    return userTags.map((u) => {
        const start = u.indexOf("!")
        return {
            id: u.substring(start + 1, u.length - 1),
        }
    })
}
