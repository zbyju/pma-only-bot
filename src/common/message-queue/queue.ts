import { PMAMessage, PMAMessageIntent } from './message';

export class PMAMessageQueue {
  private queue: PMAMessage[];
  private listeners = new Map<PMAMessageIntent, Function[]>();

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
    const listeners = message.intents.flatMap((intent) =>
      this.getListeners(intent),
    );
    listeners.forEach((listener) => listener(message));
  }
}

if (import.meta.vitest) {
  const { it, expect, vi } = import.meta.vitest;

  const i = PMAMessageIntent.INCOMING_CHAT_MESSAGE;
  const j = PMAMessageIntent.INCOMING_COMMAND;

  const l = vi.fn();

  it('adds a listener', () => {
    const queue = new PMAMessageQueue();

    expect(queue.numberOfListeners(i)).toBe(0);
    expect(queue.numberOfListeners(j)).toBe(0);

    queue.addListener(l, i);

    expect(queue.numberOfListeners(i)).toBe(1);
    expect(queue.numberOfListeners(j)).toBe(0);
  });

  it('removes a listener', () => {
    const queue = new PMAMessageQueue();

    queue.addListener(l, i);
    expect(queue.numberOfListeners(i)).toBe(1);

    queue.removeListener(l, i);
    expect(queue.numberOfListeners(i)).toBe(0);
  });
}
