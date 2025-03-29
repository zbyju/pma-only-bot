import type { Result } from "neverthrow";

function getClassName(that: any): string {
  const classname = that.toString();
  return classname;
}

type DomainObjectToPrimitivesProps = ReturnType<
  typeof DomainObject.prototype.toPrimitives
>;

// Abstract base class
export abstract class DomainObject {
  public static create(value: unknown): Result<DomainObject, any> {
    // biome-ignore lint: no other way
    throw new Error(`${getClassName(this)}.create has not been implemented!`);
  }

  public static validate(_: unknown): Result<null, any> {
    // biome-ignore lint: no other way
    throw new Error(`${getClassName(this)}.validate has not been implemented!`);
  }

  public abstract toPrimitives(): any;
  public abstract fromPrimitives(
    _: DomainObjectToPrimitivesProps,
  ): DomainObject;
}
