import { Injectable, Logger } from '@nestjs/common';
import { PMAMessage, PMAMessageIntent } from './message';

@Injectable()
export class PMAMessageQueue {
  private queue: PMAMessage[];
  private listeners = new Map<PMAMessageIntent, Function[]>();
  private readonly logger = new Logger(PMAMessageQueue.name);

  constructor() {
    this.queue = [];
    this.listeners = new Map<PMAMessageIntent, Function[]>();
  }

  private getListeners(intent: PMAMessageIntent): Function[] {
    return this.listeners.get(intent) ?? [];
  }

  addListener(listener: Function, intent: PMAMessageIntent) {
    const listeners = this.getListeners(intent);
    this.listeners.set(intent, listeners.concat(listeners, listener));
  }

  numberOfListeners(intent: PMAMessageIntent): number {
    return this.getListeners(intent).length;
  }

  removeListener(listener: Function, intent: PMAMessageIntent): boolean {
    const listeners = this.getListeners(intent);
    const nextListeners = listeners.filter((l) => l !== listener);

    if (nextListeners.length === listeners.length) {
      return false;
    }

    this.listeners.set(intent, nextListeners);
    return true;
  }

  push(message: PMAMessage) {
    this.logger.log(`Pushing new message: ${JSON.stringify(message)}`);

    const listeners = message.intents.flatMap((intent) =>
      this.getListeners(intent),
    );
    listeners.forEach((listener) => listener(message));
  }
}
