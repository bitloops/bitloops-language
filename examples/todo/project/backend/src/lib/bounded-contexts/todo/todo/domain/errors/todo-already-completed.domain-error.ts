import { Domain } from '@bitloops/bl-boilerplate-core';
export class TodoAlreadyCompletedError extends Domain.Error {
  static readonly errorId: string = 'e09ec42c-4d31-4f7c-b68a-b68a78-b68a655';
  constructor(id: string) {
    super(`Todo ${id} is already completed`, TodoAlreadyCompletedError.errorId);
  }
}
