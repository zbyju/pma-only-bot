import { Emote, UserTag } from "../../types/message.types"
import { EmoteCounts, UserTagCounts } from "../../types/stats.types"
import { countElementInArray, removeDuplicates } from "../array"

export const emotesToEmoteCounts = (emotes: Emote[]): EmoteCounts[] => {
    const uniqueEmotes = removeDuplicates(emotes)
    return uniqueEmotes.map((e) => {
        return {
            name: e.name,
            id: e.id,
            count: countElementInArray(emotes, e),
        }
    })
}

export const userTagsToUserTagCounts = (
    userTags: UserTag[]
): UserTagCounts[] => {
    const uniqueUserTags = removeDuplicates(userTags)
    return uniqueUserTags.map((u) => {
        return {
            id: u.id,
            count: countElementInArray(userTags, u),
        }
    })
}
