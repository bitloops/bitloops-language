import { Application } from '@bitloops/bl-boilerplate-core';
export class UserNotFoundError extends Application.Error {
  static readonly errorId: string = 'dedb1f53-6e89-429d-bc63-8f3adfc4b407';
  constructor(userId: string) {
    super(`User ${userId} not found`, UserNotFoundError.errorId);
  }
}
