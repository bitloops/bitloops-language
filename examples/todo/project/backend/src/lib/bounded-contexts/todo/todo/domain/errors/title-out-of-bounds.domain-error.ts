import { Domain } from '@bitloops/bl-boilerplate-core';
export class TitleOutOfBoundsError extends Domain.Error {
  static readonly errorId: string = 'a12ec42c-4d31-4f7c-b68a-b68a78-b68a655';
  constructor(title: string) {
    super(`Title ${title} is out of range`, TitleOutOfBoundsError.errorId);
  }
}
