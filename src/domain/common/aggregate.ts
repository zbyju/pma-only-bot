import { Entity, type PropsWithId } from "./entity";

export abstract class Aggregate<T extends PropsWithId> extends Entity<T> {
  constructor(public readonly x: T) {
    super(x);
  }
}
