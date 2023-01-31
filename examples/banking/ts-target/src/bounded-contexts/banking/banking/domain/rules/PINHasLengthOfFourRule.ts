import { Domain } from '@bitloops/bl-boilerplate-core';
import { DomainErrors } from '../errors';

export class PINHasLengthOfFourRule implements Domain.IRule {
  constructor(private pin: string) {}

  public Error = new DomainErrors.PINLength(this.pin);

  public isBrokenIf(): boolean {
    return this.pin.length !== 4;
  }
}
