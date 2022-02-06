export interface POBMessage {
    author: string
    channel: string
    guild: string
    content: string
    postedAt: number,
    msgId: string
    tts?: boolean,
    url?: string,
}