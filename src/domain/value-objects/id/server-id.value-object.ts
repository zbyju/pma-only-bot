import { z } from "zod";
import { err, ok, type Result } from "neverthrow";
import { ValueObject } from "src/domain/common/value-object";

export const ServerIdSchema = z.string();
export const ServerIdVOSchema = ServerIdSchema.transform(
  (v) => new ServerId(v),
);

export type ServerIdProps = z.infer<typeof ServerIdSchema>;
export type ServerIdToPrimitivesProps = ReturnType<
  typeof ServerId.prototype.toPrimitives
>;

export type CreateServerIdProps = z.input<typeof ServerIdSchema>;

export class ServerId extends ValueObject<ServerIdProps> {
  public static create(value: CreateServerIdProps) {
    return ServerId.createUnknown(value);
  }

  public static createUnknown(value: unknown): Result<ServerId, string> {
    const result = ServerIdSchema.safeParse(value);
    if (!result.success) {
      return err("bad");
    }
    return ok(new ServerId(result.data));
  }

  public static validate(value: unknown) {
    const result = ServerIdSchema.safeParse(value);
    if (!result.success) {
      return err("bad");
    }
    return ok(null);
  }

  public toPrimitives(): string {
    return this.x;
  }

  public fromPrimitives(value: ServerIdToPrimitivesProps): ServerId {
    return new ServerId(value);
  }
}
