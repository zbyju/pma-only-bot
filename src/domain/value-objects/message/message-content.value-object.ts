import { z } from "zod";
import { err, ok, type Result } from "neverthrow";
import { ValueObject } from "src/domain/common/value-object";
import { ZodDomainError } from "src/domain/errors/zod-error.domain-error";
import { MessageContentDomainErrorCode } from "src/domain/errors/codes/value-objects/message/message-content.domain-error-codes";
import { Emote, EmoteSchema } from "./emote.value-object";
import {
  StringLiteral,
  StringLiteralSchema,
} from "../string-literal.value-object";
import { Sticker, StickerSchema } from "./sticker.value-object";
import { Gif, GifSchema } from "./gif.value-object";

export const MessageContentSchema = z.array(
  z.union([
    z
      .object({
        value: StringLiteralSchema,
        type: z.literal("string"),
      })
      .transform((v) => new StringLiteral(v.value)),
    z
      .object({
        value: EmoteSchema,
        type: z.literal("emote"),
      })
      .transform((v) => new Emote(v.value)),
    z
      .object({
        value: GifSchema,
        type: z.literal("gif"),
      })
      .transform((v) => new Gif(v.value)),
    z
      .object({
        value: StickerSchema,
        type: z.literal("sticker"),
      })
      .transform((v) => new Sticker(v.value)),
  ]),
);
export const MessageContentVOSchema = MessageContentSchema.transform(
  (v) => new MessageContent(v),
);

export type MessageContentVOProps = z.infer<typeof MessageContentSchema>;
export type MessageContentToPrimitivesProps = ReturnType<
  typeof MessageContent.prototype.toPrimitives
>;

export type CreateMessageContentProps = z.input<typeof MessageContentSchema>;

export class MessageContent extends ValueObject<MessageContentVOProps> {
  public static create(value: CreateMessageContentProps) {
    return MessageContent.createUnknown(value);
  }

  public static createUnknown(
    value: unknown,
  ): Result<MessageContent, ZodDomainError> {
    const result = MessageContentSchema.safeParse(value);
    if (!result.success) {
      return err(
        new ZodDomainError(
          MessageContentDomainErrorCode["invalid-create-value"],
          result.error,
        ),
      );
    }

    return ok(new MessageContent(result.data));
  }

  public toPrimitives() {
    return this.x;
  }

  public fromPrimitives(value: MessageContentToPrimitivesProps) {
    return new MessageContent(value);
  }
}
