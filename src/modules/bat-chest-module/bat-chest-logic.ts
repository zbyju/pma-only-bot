export function isBatchestable(message: string): boolean {
    const msg = message.trim().toLowerCase()
    return msg.includes("i") && msg.includes("heckin") && msg.includes("love")
}
