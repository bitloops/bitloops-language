import { AccountNotFoundError } from './AccountNotFoundError';
import { CustomerNotFoundError } from './CustomerNotFoundError';

export namespace ApplicationErrors {
  export class CustomerNotFound extends CustomerNotFoundError {}
  export class AccountNotFound extends AccountNotFoundError {}
}
