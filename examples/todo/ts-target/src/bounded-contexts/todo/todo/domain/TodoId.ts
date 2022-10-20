import { Domain, Either, ok } from '@bitloops/bl-boilerplate-core';

export class TodoId extends Domain.Entity<any> {
  get id(): Domain.UUIDv4 {
    return this._id;
  }

  private constructor(id?: Domain.UUIDv4) {
    super(null, id);
  }

  public static create(id?: Domain.UUIDv4): Either<TodoId, never> {
    return ok(new TodoId(id));
  }
}
