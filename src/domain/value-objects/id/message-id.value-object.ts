import { z } from "zod";
import { err, ok, type Result } from "neverthrow";
import { ValueObject } from "src/domain/common/value-object";

export const MessageIdSchema = z.string();
export const MessageIdVOSchema = MessageIdSchema.transform(
  (v) => new MessageId(v),
);

export type MessageIdProps = z.infer<typeof MessageIdSchema>;
export type MessageIdToPrimitivesProps = ReturnType<
  typeof MessageId.prototype.toPrimitives
>;

export type CreateMessageIdProps = z.input<typeof MessageIdSchema>;

export class MessageId extends ValueObject<MessageIdProps> {
  public static create(value: CreateMessageIdProps) {
    return MessageId.createUnknown(value);
  }

  public static createUnknown(value: unknown): Result<MessageId, string> {
    const result = MessageIdSchema.safeParse(value);
    if (!result.success) {
      return err("bad");
    }
    return ok(new MessageId(result.data));
  }

  public static validate(value: unknown) {
    const result = MessageIdSchema.safeParse(value);
    if (!result.success) {
      return err("bad");
    }
    return ok(null);
  }

  public toPrimitives(): string {
    return this.x;
  }

  public fromPrimitives(value: MessageIdToPrimitivesProps): MessageId {
    return new MessageId(value);
  }
}
