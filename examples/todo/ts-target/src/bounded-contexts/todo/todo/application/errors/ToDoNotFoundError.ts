import { Application, Domain } from '@bitloops/bl-boilerplate-core';

export class ToDoNotFoundError extends Application.Error {
  constructor(id: Domain.UUIDv4) {
    super(`ToDo with id ${id.toString()} was not found`, 'fedb1f53-6e89-429d-bc63-8f3adfc4b403');
  }
}
