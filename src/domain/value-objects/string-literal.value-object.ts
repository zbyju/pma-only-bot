import { z } from "zod";
import { err, ok, type Result } from "neverthrow";
import { ZodDomainError } from "../errors/zod-error.domain-error";
import { ValueObject } from "../common/value-object";
import { StringLiteralDomainErrorCode } from "../errors/codes/value-objects/string-literal.domain-error-codes";

export const StringLiteralSchema = z.string();
export const StringLiteralVOSchema = StringLiteralSchema.transform(
  (v) => new StringLiteral(v),
);

export type StringLiteralVOProps = z.infer<typeof StringLiteralSchema>;
export type StringLiteralToPrimitivesProps = ReturnType<
  typeof StringLiteral.prototype.toPrimitives
>;

export type CreateStringLiteralProps = z.input<typeof StringLiteralSchema>;

export class StringLiteral extends ValueObject<StringLiteralVOProps> {
  public static create(value: CreateStringLiteralProps) {
    return StringLiteral.createUnknown(value);
  }

  public static createUnknown(
    value: unknown,
  ): Result<StringLiteral, ZodDomainError> {
    const result = StringLiteralSchema.safeParse(value);
    if (!result.success) {
      return err(
        new ZodDomainError(
          StringLiteralDomainErrorCode["invalid-create-value"],
          result.error,
        ),
      );
    }
    return ok(new StringLiteral(result.data));
  }

  public toPrimitives() {
    return this.x;
  }

  public fromPrimitives(value: StringLiteralToPrimitivesProps) {
    return new StringLiteral(value);
  }
}
