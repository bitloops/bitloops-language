import { Domain } from '@bitloops/bl-boilerplate-core';
import { DomainErrors } from '../errors/index';
export class TitleOutOfBoundsRule implements Domain.IRule {
  constructor(private title: string) {}

  public Error: DomainErrors.TitleOutOfBoundsError;

  public isBrokenIf(): boolean {
    this.Error = new DomainErrors.TitleOutOfBoundsError(this.title);
    return this.title.length > 150 || this.title.length < 4;
  }
}
