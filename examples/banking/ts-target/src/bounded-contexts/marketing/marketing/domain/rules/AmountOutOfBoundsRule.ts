import { Domain } from '@bitloops/bl-boilerplate-core';
import { DomainErrors } from '../errors';

export class AmountOutOfBoundsRule implements Domain.IRule {
  constructor(private amount: number) {}

  public Error = new DomainErrors.InvalidAmount(this.amount);

  public isBrokenIf(): boolean {
    return this.amount < 0 && this.amount > 10000;
  }
}
