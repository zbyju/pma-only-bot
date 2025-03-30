import { z } from "zod";
import { err, ok, type Result } from "neverthrow";
import { ZodDomainError } from "../../errors/zod-error.domain-error";
import { ValueObject } from "../../common/value-object";
import { GifDomainErrorCode } from "src/domain/errors/codes/value-objects/message/gif.domain-error-codes";

export const GifSchema = z.object({
  url: z.string(),
});
export const GifVOSchema = GifSchema.transform((v) => new Gif(v));

export type GifVOProps = z.infer<typeof GifSchema>;
export type GifToPrimitivesProps = ReturnType<
  typeof Gif.prototype.toPrimitives
>;

export type CreateGifProps = z.input<typeof GifSchema>;

export class Gif extends ValueObject<GifVOProps> {
  public static create(value: CreateGifProps) {
    return Gif.createUnknown(value);
  }

  public static createUnknown(value: unknown): Result<Gif, ZodDomainError> {
    const result = GifSchema.safeParse(value);
    if (!result.success) {
      return err(
        new ZodDomainError(
          GifDomainErrorCode["invalid-create-value"],
          result.error,
        ),
      );
    }
    return ok(new Gif(result.data));
  }

  public toPrimitives() {
    return this.x;
  }

  public fromPrimitives(value: GifToPrimitivesProps) {
    return new Gif(value);
  }
}
