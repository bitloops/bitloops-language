//TODO fix all error ids
import { Application } from '@bitloops/bl-boilerplate-core';

export class CustomerByAccountIdNotFoundError extends Application.Error {
  static errorId = 'bedb1f53-6e89-099d-bc63-8f3adfc4b401';

  constructor(accountId: string) {
    super(
      `Customer with account id ${accountId} was not found`,
      CustomerByAccountIdNotFoundError.errorId,
    );
  }
}
