import { z } from "zod";
import { err, ok, type Result } from "neverthrow";
import { ZodDomainError } from "../errors/zod-error.domain-error";
import { Entity } from "../common/entity";
import { ChannelDomainErrorCode } from "../errors/codes/entities/channel.domain-error-codes";
import { ChannelIdVOSchema } from "../value-objects/id/channel-id.value-object";

export const ChannelSchema = z.object({
  id: ChannelIdVOSchema,
});
export const ChannelEntitySchema = ChannelSchema.transform(
  (v) => new Channel(v),
);

export type ChannelEntityProps = z.infer<typeof ChannelSchema>;
export type ChannelToPrimitivesProps = ReturnType<
  typeof Channel.prototype.toPrimitives
>;

export type CreateChannelProps = z.input<typeof ChannelSchema>;

export class Channel extends Entity<ChannelEntityProps> {
  public static create(value: CreateChannelProps) {
    return Channel.createUnknown(value);
  }

  public static createUnknown(value: unknown): Result<Channel, ZodDomainError> {
    const result = ChannelSchema.safeParse(value);
    if (!result.success) {
      return err(
        new ZodDomainError(
          ChannelDomainErrorCode["invalid-create-value"],
          result.error,
        ),
      );
    }
    return ok(new Channel(result.data));
  }

  public toPrimitives() {
    return this.x;
  }

  public fromPrimitives(value: ChannelToPrimitivesProps) {
    return new Channel(value);
  }
}
