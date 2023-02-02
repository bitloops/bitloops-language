import { Domain } from '@bitloops/bl-boilerplate-core';
import { DomainErrors } from '../errors';

export class CounterIsPositiveNumberRule implements Domain.IRule {
  constructor(private counter: number) {}

  public Error = new DomainErrors.InvalidNumberOfTransactions(this.counter);

  public isBrokenIf(): boolean {
    return this.counter < 0;
  }
}
