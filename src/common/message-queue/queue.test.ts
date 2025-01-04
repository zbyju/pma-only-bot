import { expect, it, vi } from 'vitest';
import { PMAMessageQueue } from './queue';
import { PMAMessageIntent } from './message';

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
