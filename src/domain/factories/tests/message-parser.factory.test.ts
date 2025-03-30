import { describe, expect, it } from "vitest";
import { parseMessageContent } from "../message-parser.factory";
import { StringLiteral } from "../../value-objects/string-literal.value-object";
import { Emote } from "../../value-objects/message/emote.value-object";
import { Gif } from "../../value-objects/message/gif.value-object";

function emoteToString(emote: { id: string; name: string }) {
  return `<:${emote.name}:${emote.id}>`;
}

describe("MessageParser", () => {
  const zulul = {
    id: "1060925054378061825",
    name: "ZULUL",
  };
  const lule = {
    id: "1133680400804360263",
    name: "LULE",
  };
  const gif =
    "https://tenor.com/view/huh-wut-what-eh-uhh-gif-6384044476473782718";
  const emoji = "😄";

  it("should parse message with just text", () => {
    const message = "Hello this is just a test message.";
    const result = parseMessageContent(message);
    expect(result.isOk()).toBe(true);
    expect(result._unsafeUnwrap().x.length).toBe(1);

    expect(result._unsafeUnwrap().x[0]).toBeInstanceOf(StringLiteral);
    expect((result._unsafeUnwrap().x[0] as StringLiteral).x).toBe(message);
  });

  it("should parse message with just one gif", () => {
    const message = gif;
    const result = parseMessageContent(message);
    expect(result.isOk()).toBe(true);
    expect(result._unsafeUnwrap().x.length).toBe(1);

    expect(result._unsafeUnwrap().x[0]).toBeInstanceOf(Gif);
    expect((result._unsafeUnwrap().x[0] as Gif).x.url).toBe(gif);
  });

  it("should parse message with just 1 emote", () => {
    const message = `${emoteToString(zulul)}`;
    const result = parseMessageContent(message);
    expect(result.isOk()).toBe(true);
    expect(result._unsafeUnwrap().x.length).toBe(1);

    expect(result._unsafeUnwrap().x[0]).toBeInstanceOf(Emote);
    expect((result._unsafeUnwrap().x[0] as Emote).x.id).toBe(zulul.id);
    expect((result._unsafeUnwrap().x[0] as Emote).x.name).toBe(zulul.name);
  });

  it("should parse message with multiple emotes", () => {
    const message = `${emoteToString(zulul)}${emoteToString(lule)}`;
    const result = parseMessageContent(message);
    expect(result.isOk()).toBe(true);
    expect(result._unsafeUnwrap().x.length).toBe(2);

    expect(result._unsafeUnwrap().x[0]).toBeInstanceOf(Emote);
    expect((result._unsafeUnwrap().x[0] as Emote).x.id).toBe(zulul.id);
    expect((result._unsafeUnwrap().x[0] as Emote).x.name).toBe(zulul.name);

    expect(result._unsafeUnwrap().x[1]).toBeInstanceOf(Emote);
    expect((result._unsafeUnwrap().x[1] as Emote).x.id).toBe(lule.id);
    expect((result._unsafeUnwrap().x[1] as Emote).x.name).toBe(lule.name);
  });

  it("should parse complex message", () => {
    const message = `Tohle je testovani zpravy s emotama ${emoteToString(zulul)} a gifem: ${gif} miluju emoty ${emoteToString(lule)} ale nemam rad basic idiota emoji 😄!`;
    const result = parseMessageContent(message);

    expect(result.isOk()).toBe(true);
    expect(result._unsafeUnwrap().x.length).toBe(7);

    expect(result._unsafeUnwrap().x[0]).toBeInstanceOf(StringLiteral);
    expect((result._unsafeUnwrap().x[0] as StringLiteral).x).toBe(
      "Tohle je testovani zpravy s emotama ",
    );

    expect(result._unsafeUnwrap().x[1]).toBeInstanceOf(Emote);
    expect((result._unsafeUnwrap().x[1] as Emote).x.id).toBe(zulul.id);
    expect((result._unsafeUnwrap().x[1] as Emote).x.name).toBe(zulul.name);

    expect(result._unsafeUnwrap().x[2]).toBeInstanceOf(StringLiteral);
    expect((result._unsafeUnwrap().x[2] as StringLiteral).x).toBe(" a gifem: ");

    expect(result._unsafeUnwrap().x[3]).toBeInstanceOf(Gif);
    expect((result._unsafeUnwrap().x[3] as Gif).x.url).toBe(gif);

    expect(result._unsafeUnwrap().x[4]).toBeInstanceOf(StringLiteral);
    expect((result._unsafeUnwrap().x[4] as StringLiteral).x).toBe(
      " miluju emoty ",
    );

    expect(result._unsafeUnwrap().x[5]).toBeInstanceOf(Emote);
    expect((result._unsafeUnwrap().x[5] as Emote).x.id).toBe(lule.id);
    expect((result._unsafeUnwrap().x[5] as Emote).x.name).toBe(lule.name);

    expect(result._unsafeUnwrap().x[6]).toBeInstanceOf(StringLiteral);
    expect((result._unsafeUnwrap().x[6] as StringLiteral).x).toBe(
      " ale nemam rad basic idiota emoji 😄!",
    );
  });
});
