import { On, Once } from "@discord-nestjs/core";
import { Injectable, Logger } from "@nestjs/common";
import type { Message } from "discord.js";

@Injectable()
export class MessageReader {
  private readonly logger = new Logger(MessageReader.name);

  @On("messageCreate")
  async onMessageCreate(message: Message) {
    this.logger.log(`Received message: ${JSON.stringify(message.content)}`);
  }

  @Once("ready")
  onReady(): void {
    this.logger.log("Bot is ready and listening for messages.");
  }
}
