import { ValueObject } from "./value-object";
import { z } from "zod";
import { err, ok, type Result } from "neverthrow";

export const UniqueIdSchema = z.string().uuid();
export const UniqueIdVOSchema = UniqueIdSchema.transform(
  (v) => new UniqueId(v),
);

export type UniqueIdProps = z.infer<typeof UniqueIdSchema>;
export type UniqueIdToPrimitivesProps = ReturnType<
  typeof UniqueId.prototype.toPrimitives
>;

export type CreateUniqueIdProps = z.input<typeof UniqueIdSchema>;

export class UniqueId extends ValueObject<UniqueIdProps> {
  public static create(value: CreateUniqueIdProps) {
    return UniqueId.createUnknown(value);
  }

  public static createUnknown(value: unknown): Result<UniqueId, string> {
    const result = UniqueIdSchema.safeParse(value);
    if (!result.success) {
      return err("bad");
    }
    return ok(new UniqueId(result.data));
  }

  public static validate(value: unknown) {
    const result = UniqueIdSchema.safeParse(value);
    if (!result.success) {
      return err("bad");
    }
    return ok(null);
  }

  public toPrimitives(): string {
    return this.x;
  }

  public fromPrimitives(value: UniqueIdToPrimitivesProps): UniqueId {
    return new UniqueId(value);
  }
}
