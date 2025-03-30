import { z } from "zod";
import { err, ok, type Result } from "neverthrow";
import { ValueObject } from "src/domain/common/value-object";

export const UserIdSchema = z.string();
export const UserIdVOSchema = UserIdSchema.transform((v) => new UserId(v));

export type UserIdProps = z.infer<typeof UserIdSchema>;
export type UserIdToPrimitivesProps = ReturnType<
  typeof UserId.prototype.toPrimitives
>;

export type CreateUserIdProps = z.input<typeof UserIdSchema>;

export class UserId extends ValueObject<UserIdProps> {
  public static create(value: CreateUserIdProps) {
    return UserId.createUnknown(value);
  }

  public static createUnknown(value: unknown): Result<UserId, string> {
    const result = UserIdSchema.safeParse(value);
    if (!result.success) {
      return err("bad");
    }
    return ok(new UserId(result.data));
  }

  public static validate(value: unknown) {
    const result = UserIdSchema.safeParse(value);
    if (!result.success) {
      return err("bad");
    }
    return ok(null);
  }

  public toPrimitives(): string {
    return this.x;
  }

  public fromPrimitives(value: UserIdToPrimitivesProps): UserId {
    return new UserId(value);
  }
}
