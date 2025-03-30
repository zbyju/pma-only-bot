import { z } from "zod";
import { err, ok, type Result } from "neverthrow";
import { ValueObject } from "src/domain/common/value-object";

export const ChannelIdSchema = z.string();
export const ChannelIdVOSchema = ChannelIdSchema.transform(
  (v) => new ChannelId(v),
);

export type ChannelIdProps = z.infer<typeof ChannelIdSchema>;
export type ChannelIdToPrimitivesProps = ReturnType<
  typeof ChannelId.prototype.toPrimitives
>;

export type CreateChannelIdProps = z.input<typeof ChannelIdSchema>;

export class ChannelId extends ValueObject<ChannelIdProps> {
  public static create(value: CreateChannelIdProps) {
    return ChannelId.createUnknown(value);
  }

  public static createUnknown(value: unknown): Result<ChannelId, string> {
    const result = ChannelIdSchema.safeParse(value);
    if (!result.success) {
      return err("bad");
    }
    return ok(new ChannelId(result.data));
  }

  public static validate(value: unknown) {
    const result = ChannelIdSchema.safeParse(value);
    if (!result.success) {
      return err("bad");
    }
    return ok(null);
  }

  public toPrimitives(): string {
    return this.x;
  }

  public fromPrimitives(value: ChannelIdToPrimitivesProps): ChannelId {
    return new ChannelId(value);
  }
}
