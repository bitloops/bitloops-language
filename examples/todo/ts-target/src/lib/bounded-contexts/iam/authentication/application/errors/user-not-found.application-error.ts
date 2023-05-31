import { Application } from '@bitloops/bl-boilerplate-core';
export class UserNotFoundError extends Application.Error {
  static readonly errorId: string = 'f1cd80d2-4055-47b1-8769-7dd5c5d7d1d5';
  constructor(id: string) {
    super(`User with id ${id} was not found`, UserNotFoundError.errorId);
  }
}
