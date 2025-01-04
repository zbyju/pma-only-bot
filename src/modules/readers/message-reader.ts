import { On, Once } from '@discord-nestjs/core';
import { Injectable, Logger } from '@nestjs/common';
import { Message } from 'discord.js';
import { PMAMessageIntent, Tribool } from 'src/common/message-queue/message';
import { PMAChatMessage } from 'src/common/message-queue/messages/chat-message';
import { PMAMessageQueue } from 'src/common/message-queue/queue';

@Injectable()
export class MessageReader {
  private readonly logger = new Logger(MessageReader.name);
  private readonly queue: PMAMessageQueue;

  // TODO: Inject the MessageQueue
  constructor(queue: PMAMessageQueue) {
    this.queue = queue;
  }

  @On('messageCreate')
  async onMessageCreate(message: Message) {
    const msg: PMAChatMessage = {
      message: message.content,
      intents: [PMAMessageIntent.INCOMING_CHAT_MESSAGE],
      isFromBot: message.author.bot ? Tribool.TRUE : Tribool.FALSE,
      isFromAdmin: Tribool.UNKNOWN, // TODO: Check if the user is an admin
    };
    this.queue.push(msg);
  }

  // Optionally, log when the bot is ready
  @Once('ready')
  onReady(): void {
    this.logger.log('Bot is ready and listening for messages.');
  }
}
