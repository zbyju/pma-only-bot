import { Collection, Message, Snowflake, TextChannel } from "discord.js"

export const fetchLastMessages = (
    channel: TextChannel,
    limit: number = 100
): Promise<Collection<string, Message<boolean>>> => {
    return channel.messages.fetch({ limit })
}

export const fetchMessagesBefore = (
    channel: TextChannel,
    before: Snowflake,
    limit: number = 100
): Promise<Collection<string, Message<boolean>>> => {
    return channel.messages.fetch({ limit, before })
}

export const fetchMessagesAfter = async (
    channel: TextChannel,
    after: Snowflake,
    limit: number = 100
): Promise<Collection<string, Message<boolean>>> => {
    return channel.messages.fetch({ limit, after })
}

export const fetchAllMessages = async (
    channel: TextChannel,
    after: Snowflake
) => {
    let messages: Message[] = []
    let lastID: string | undefined = after

    // eslint-disable-next-line no-constant-condition
    while (true) {
        try {
            const newMessages = await fetchMessagesAfter(channel, lastID, 5)
            if (newMessages.size === 0) {
                return messages
            }

            lastID = newMessages.firstKey()
            messages = Array.from(newMessages.values()).concat(messages)
        } catch (err) {
            console.error(err)
            return []
        }
    }
}
