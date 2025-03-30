import { z } from "zod";
import { err, ok, type Result } from "neverthrow";
import { ZodDomainError } from "../errors/zod-error.domain-error";
import { Aggregate } from "../common/aggregate";
import { UserDomainErrorCode } from "../errors/codes/aggregates/user.domain-error-codes";
import { UserIdVOSchema } from "../value-objects/id/user-id.value-object";

export const UserSchema = z.object({
  id: UserIdVOSchema,
});
export const UserAggregateSchema = UserSchema.transform((v) => new User(v));

export type UserAggregateProps = z.infer<typeof UserSchema>;
export type UserToPrimitivesProps = ReturnType<
  typeof User.prototype.toPrimitives
>;

export type CreateUserProps = z.input<typeof UserSchema>;

export class User extends Aggregate<UserAggregateProps> {
  public static create(value: CreateUserProps) {
    return User.createUnknown(value);
  }

  public static createUnknown(value: unknown): Result<User, ZodDomainError> {
    const result = UserSchema.safeParse(value);
    if (!result.success) {
      return err(
        new ZodDomainError(
          UserDomainErrorCode["invalid-create-value"],
          result.error,
        ),
      );
    }
    return ok(new User(result.data));
  }

  public toPrimitives() {
    return this.x;
  }

  public fromPrimitives(value: UserToPrimitivesProps) {
    return new User(value);
  }
}
