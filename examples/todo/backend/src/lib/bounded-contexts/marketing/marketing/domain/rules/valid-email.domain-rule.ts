import { Domain } from '@bitloops/bl-boilerplate-core';
import { DomainErrors } from '../errors/index';
export class ValidEmailRule implements Domain.IRule {
  constructor(private email: string) {}

  public Error: DomainErrors.InvalidEmailDomainError;

  public isBrokenIf(): boolean {
    const re = /\S+@\S+\.\S+/;

    this.Error = new DomainErrors.InvalidEmailDomainError(this.email);
    return re.test(this.email) === false;
  }
}
