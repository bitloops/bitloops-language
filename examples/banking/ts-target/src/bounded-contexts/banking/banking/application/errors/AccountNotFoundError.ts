import { Application } from '@bitloops/bl-boilerplate-core';

export class AccountNotFoundError extends Application.Error {
  static errorId = 'cadb1f53-6e89-429d-bc63-8f3adfc4b412';

  constructor(id: string) {
    super(`Account with id ${id} was not found`, AccountNotFoundError.errorId);
  }
}
