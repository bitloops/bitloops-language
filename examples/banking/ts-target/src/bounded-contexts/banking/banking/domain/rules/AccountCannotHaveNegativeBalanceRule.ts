import { Domain } from '@bitloops/bl-boilerplate-core';
import { DomainErrors } from '../errors';

export class AccountCannotHaveNegativeBalanceRule implements Domain.IRule {
  constructor(private amount: number, private balance: number) {}

  public Error = new DomainErrors.InsufficientBalance(this.balance);

  public isBrokenIf(): boolean {
    return this.amount < 0;
  }
}
