import { Application } from '@bitloops/bl-boilerplate-core';

export class ToDoNotFoundError extends Application.Error {
  constructor(id: string) {
    super(`ToDo with id ${id} was not found`, 'fedb1f53-6e89-429d-bc63-8f3adfc4b403');
  }
}
