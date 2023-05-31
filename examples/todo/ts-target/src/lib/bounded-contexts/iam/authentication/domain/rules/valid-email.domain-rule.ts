import { Domain } from '@bitloops/bl-boilerplate-core';
import { DomainErrors } from '../errors/index';
export class ValidEmailRule implements Domain.IRule {
  constructor(private email: string) {}

  public Error: DomainErrors.InvalidEmailError;

  public isBrokenIf(): boolean {
    const re = /\S+@\S+\.\S+/;

    this.Error = new DomainErrors.InvalidEmailError(this.email);
    return re.test(this.email) === false;
  }
}
