import { Domain } from '@bitloops/bl-boilerplate-core';

export class TitleOutOfBoundsError extends Domain.Error {
  static readonly errorId = 'INVALID_TITLE';

  constructor(title: string) {
    super(`Title ${title} is out of range`);
  }
}
