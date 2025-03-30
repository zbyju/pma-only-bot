import { z } from "zod";
import { err, ok, type Result } from "neverthrow";
import { ZodDomainError } from "../errors/zod-error.domain-error";
import { Aggregate } from "../common/aggregate";
import { ServerDomainErrorCode } from "../errors/codes/aggregates/server.domain-error-codes";
import { ServerIdVOSchema } from "../value-objects/id/server-id.value-object";

export const ServerSchema = z.object({
  id: ServerIdVOSchema,
});
export const ServerAggregateSchema = ServerSchema.transform(
  (v) => new Server(v),
);

export type ServerAggregateProps = z.infer<typeof ServerSchema>;
export type ServerToPrimitivesProps = ReturnType<
  typeof Server.prototype.toPrimitives
>;

export type CreateServerProps = z.input<typeof ServerSchema>;

export class Server extends Aggregate<ServerAggregateProps> {
  public static create(value: CreateServerProps) {
    return Server.createUnknown(value);
  }

  public static createUnknown(value: unknown): Result<Server, ZodDomainError> {
    const result = ServerSchema.safeParse(value);
    if (!result.success) {
      return err(
        new ZodDomainError(
          ServerDomainErrorCode["invalid-create-value"],
          result.error,
        ),
      );
    }
    return ok(new Server(result.data));
  }

  public toPrimitives() {
    return this.x;
  }

  public fromPrimitives(value: ServerToPrimitivesProps) {
    return new Server(value);
  }
}
