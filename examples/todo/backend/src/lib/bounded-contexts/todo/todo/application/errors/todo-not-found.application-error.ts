import { Application } from '@bitloops/bl-boilerplate-core';
export class TodoNotFoundError extends Application.Error {
  static readonly errorId: string = 'fedb1f53-6e89-429d-bc63-8f3adfc4b403';
  constructor(id: string) {
    super(`Todo ${id} was not found`, TodoNotFoundError.errorId);
  }
}
