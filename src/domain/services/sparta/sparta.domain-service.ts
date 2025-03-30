import { z } from "zod";
import { err, ok, type Result } from "neverthrow";
import { UniqueIdVOSchema } from "src/domain/common/unique-id.value-object";
import { DomainService } from "src/domain/common/domain-service";
import { ZodDomainError } from "src/domain/errors/zod-error.domain-error";
import { SpartaDomainErrorCode } from "src/domain/errors/codes/services/sparta.domain-error.codes";

export const SpartaSchema = z.object({
  id: UniqueIdVOSchema,
});
export const SpartaDomainServiceSchema = SpartaSchema.transform(
  (v) => new Sparta(v),
);

export type SpartaDomainServiceProps = z.infer<typeof SpartaSchema>;
export type SpartaToPrimitivesProps = ReturnType<
  typeof Sparta.prototype.toPrimitives
>;

export type CreateUniqueIdProps = z.input<typeof SpartaSchema>;

export class Sparta extends DomainService<SpartaDomainServiceProps> {
  public static create(value: CreateUniqueIdProps) {
    return Sparta.createUnknown(value);
  }

  public static createUnknown(value: unknown): Result<Sparta, ZodDomainError> {
    const result = SpartaSchema.safeParse(value);
    if (!result.success) {
      return err(
        new ZodDomainError(
          SpartaDomainErrorCode["invalid-create-value"],
          result.error,
        ),
      );
    }
    return ok(new Sparta(result.data));
  }

  public toPrimitives() {
    return this.x;
  }

  public fromPrimitives(value: SpartaToPrimitivesProps) {
    return new Sparta(value);
  }
}

export class SpartaDomainService {}
