import { Domain } from '@bitloops/bl-boilerplate-core';
import { DomainErrors } from '../errors/index';
export class CompletedTodosIsPositiveNumberRule implements Domain.IRule {
  constructor(private counter: number) {}

  public Error: DomainErrors.InvalidTodosCounterError;

  public isBrokenIf(): boolean {
    this.Error = new DomainErrors.InvalidTodosCounterError(this.counter);
    return this.counter < 0;
  }
}
