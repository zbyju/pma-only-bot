import { On, Once } from "@discord-nestjs/core";
import { Injectable, Logger } from "@nestjs/common";
import type { Message as DiscordMessage } from "discord.js";
import { Message } from "src/domain/aggregates/message.aggregate";
import { parseMessage } from "src/domain/factories/message-parser.factory";

@Injectable()
export class MessageReader {
  private readonly logger = new Logger(MessageReader.name);

  @On("messageCreate")
  async onMessageCreate(message: DiscordMessage): Promise<void> {
    this.logger.log(`Received message: ${JSON.stringify(message)}`);
    this.logger.log(`Received content: ${JSON.stringify(message.content)}`);
    this.logger.log(
      `Received attachments: ${JSON.stringify(message.attachments)}`,
    );
    this.logger.log(`Received stickers: ${JSON.stringify(message.stickers)}`);

    const msg = parseMessage(message);
    this.logger.log(`Parsed message: ${JSON.stringify(msg)}`);
  }

  @Once("ready")
  onReady(): void {
    this.logger.log("Bot is ready and listening for messages!");
  }
}
