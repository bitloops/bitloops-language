import { Domain } from '@bitloops/bl-boilerplate-core';
import { DomainErrors } from '../errors';

export class PINHasLengthOfFourRule implements Domain.IRule {
  constructor(private pin: string) {}

  public Error = new DomainErrors.InvalidCustomerPIN(this.pin);

  public isBrokenIf(): boolean {
    return /^\d+$/.test(this.pin) === false;
  }
}
