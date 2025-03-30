import { z } from "zod";
import { err, ok, type Result } from "neverthrow";
import { ZodDomainError } from "../../errors/zod-error.domain-error";
import { ValueObject } from "../../common/value-object";
import { EmoteDomainErrorCode } from "src/domain/errors/codes/value-objects/message/emote.domain-error-codes";

export const EmoteSchema = z.object({
  id: z.string(),
  name: z.string(),
});
export const EmoteVOSchema = EmoteSchema.transform((v) => new Emote(v));

export type EmoteVOProps = z.infer<typeof EmoteSchema>;
export type EmoteToPrimitivesProps = ReturnType<
  typeof Emote.prototype.toPrimitives
>;

export type CreateEmoteProps = z.input<typeof EmoteSchema>;

export class Emote extends ValueObject<EmoteVOProps> {
  public static create(value: CreateEmoteProps) {
    return Emote.createUnknown(value);
  }

  public static createUnknown(value: unknown): Result<Emote, ZodDomainError> {
    const result = EmoteSchema.safeParse(value);
    if (!result.success) {
      return err(
        new ZodDomainError(
          EmoteDomainErrorCode["invalid-create-value"],
          result.error,
        ),
      );
    }
    return ok(new Emote(result.data));
  }

  public toPrimitives() {
    return this.x;
  }

  public fromPrimitives(value: EmoteToPrimitivesProps) {
    return new Emote(value);
  }
}
