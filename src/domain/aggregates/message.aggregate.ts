import { z } from "zod";
import { err, ok, type Result } from "neverthrow";
import { ZodDomainError } from "../errors/zod-error.domain-error";
import { MessageDomainErrorCode } from "../errors/codes/aggregates/message.domain-error-codes";
import { Aggregate } from "../common/aggregate";
import { MessageIdVOSchema } from "../value-objects/id/message-id.value-object";
import { MessageContentVOSchema } from "../value-objects/message/message-content.value-object";
import { AttachmentVOSchema } from "../value-objects/message/attachment.value-object";
import { StickerVOSchema } from "../value-objects/message/sticker.value-object";

export const MessageSchema = z.object({
  id: MessageIdVOSchema,
  content: MessageContentVOSchema,
  attachments: z.array(AttachmentVOSchema),
  stickers: z.array(StickerVOSchema),
});
export const MessageAggregateSchema = MessageSchema.transform(
  (v) => new Message(v),
);

export type MessageAggregateProps = z.infer<typeof MessageSchema>;
export type MessageToPrimitivesProps = ReturnType<
  typeof Message.prototype.toPrimitives
>;

export type CreateMessageProps = z.input<typeof MessageSchema>;

export class Message extends Aggregate<MessageAggregateProps> {
  public static create(value: CreateMessageProps) {
    return Message.createUnknown(value);
  }

  public static createUnknown(value: unknown): Result<Message, ZodDomainError> {
    const result = MessageSchema.safeParse(value);
    if (!result.success) {
      return err(
        new ZodDomainError(
          MessageDomainErrorCode["invalid-create-value"],
          result.error,
        ),
      );
    }
    return ok(new Message(result.data));
  }

  public toPrimitives() {
    return this.x;
  }

  public fromPrimitives(value: MessageToPrimitivesProps) {
    return new Message(value);
  }
}
