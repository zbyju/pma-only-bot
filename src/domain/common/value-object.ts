import { DomainObject } from "./domain-object";

export abstract class ValueObject<T> extends DomainObject {
  constructor(public readonly x: T) {
    super();
  }

  public equals(other: ValueObject<T>): boolean {
    if (other === null || other === undefined) {
      return false;
    }

    if (this === other) {
      return true;
    }

    return JSON.stringify(this.x) === JSON.stringify(other.x);
  }
}
