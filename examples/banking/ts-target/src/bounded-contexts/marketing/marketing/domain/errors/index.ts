import { InvalidNumberOfTransactionsError } from './InvalidNumberOfTransactionsError';

export namespace DomainErrors {
  export class InvalidNumberOfTransactions extends InvalidNumberOfTransactionsError {}
}
