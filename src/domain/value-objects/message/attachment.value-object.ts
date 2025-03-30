import { z } from "zod";
import { err, ok, type Result } from "neverthrow";
import { ZodDomainError } from "../../errors/zod-error.domain-error";
import { ValueObject } from "../../common/value-object";
import { AttachmentDomainErrorCode } from "src/domain/errors/codes/value-objects/message/attachment.domain-error-codes";

export const AttachmentSchema = z.object({
  id: z.string(),
});
export const AttachmentVOSchema = AttachmentSchema.transform(
  (v) => new Attachment(v),
);

export type AttachmentVOProps = z.infer<typeof AttachmentSchema>;
export type AttachmentToPrimitivesProps = ReturnType<
  typeof Attachment.prototype.toPrimitives
>;

export type CreateAttachmentProps = z.input<typeof AttachmentSchema>;

export class Attachment extends ValueObject<AttachmentVOProps> {
  public static create(value: CreateAttachmentProps) {
    return Attachment.createUnknown(value);
  }

  public static createUnknown(
    value: unknown,
  ): Result<Attachment, ZodDomainError> {
    const result = AttachmentSchema.safeParse(value);
    if (!result.success) {
      return err(
        new ZodDomainError(
          AttachmentDomainErrorCode["invalid-create-value"],
          result.error,
        ),
      );
    }
    return ok(new Attachment(result.data));
  }

  public toPrimitives() {
    return this.x;
  }

  public fromPrimitives(value: AttachmentToPrimitivesProps) {
    return new Attachment(value);
  }
}
