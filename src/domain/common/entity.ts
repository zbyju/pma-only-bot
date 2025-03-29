import { DomainObject } from "./domain-object";
import type { UniqueId } from "./unique-id.value-object";

export type PropsWithId = object & { id: UniqueId };

export abstract class Entity<T extends PropsWithId> extends DomainObject {
  constructor(public readonly x: T) {
    super();
  }
}
