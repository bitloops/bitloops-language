import { Domain } from '@bitloops/bl-boilerplate-core';
import { DomainErrors } from '../errors';

export class AmountIsPositiveNumberRule implements Domain.IRule {
  constructor(private amount: string) {}

  public Error = new DomainErrors.InvalidAmount(this.amount);

  public isBrokenIf(): boolean {
    return /^\d+$/.test(this.amount) === false;
  }
}
