import { z } from "zod";
import { err, ok, type Result } from "neverthrow";
import { ZodDomainError } from "../../errors/zod-error.domain-error";
import { ValueObject } from "../../common/value-object";
import { StickerDomainErrorCode } from "src/domain/errors/codes/value-objects/message/sticker.domain-error-codes";

export const StickerSchema = z.object({
  id: z.string(),
});
export const StickerVOSchema = StickerSchema.transform((v) => new Sticker(v));

export type StickerVOProps = z.infer<typeof StickerSchema>;
export type StickerToPrimitivesProps = ReturnType<
  typeof Sticker.prototype.toPrimitives
>;

export type CreateStickerProps = z.input<typeof StickerSchema>;

export class Sticker extends ValueObject<StickerVOProps> {
  public static create(value: CreateStickerProps) {
    return Sticker.createUnknown(value);
  }

  public static createUnknown(value: unknown): Result<Sticker, ZodDomainError> {
    const result = StickerSchema.safeParse(value);
    if (!result.success) {
      return err(
        new ZodDomainError(
          StickerDomainErrorCode["invalid-create-value"],
          result.error,
        ),
      );
    }
    return ok(new Sticker(result.data));
  }

  public toPrimitives() {
    return this.x;
  }

  public fromPrimitives(value: StickerToPrimitivesProps) {
    return new Sticker(value);
  }
}
