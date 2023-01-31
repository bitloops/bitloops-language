import { Domain } from '@bitloops/bl-boilerplate-core';
import { DomainErrors } from '../errors';

export class PINIsPositiveNumberRule implements Domain.IRule {
  constructor(private pin: string) {}

  public Error = new DomainErrors.PINIsNotPositiveNumber(this.pin);

  public isBrokenIf(): boolean {
    return /^\+?(0|[1-9]\d*)$/.test(this.pin) === false;
    // return /^\d+$/.test(this.pin) === false;
  }
}
