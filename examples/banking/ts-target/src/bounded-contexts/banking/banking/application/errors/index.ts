import { AccountNotFoundError } from './AccountNotFoundError';
import { CustomerByAccountIdNotFoundError } from './CustomerByAccountIdNotFoundError';
import { CustomerNotFoundError } from './CustomerNotFoundError';

export namespace ApplicationErrors {
  export class CustomerNotFound extends CustomerNotFoundError {}
  export class AccountNotFound extends AccountNotFoundError {}
  export class CustomerByAccountIdNotFound extends CustomerByAccountIdNotFoundError {}
}
