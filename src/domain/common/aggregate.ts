import { DomainObject } from "./domain-object";

export abstract class Aggregate<T> extends DomainObject {
  constructor(public readonly x: T) {
    super();
  }
}
