import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import { TExpression, TDomainErrors } from '../../../../src/types.js';

export class DomainErrorBuilder implements IBuilder<TDomainErrors> {
  private message: TExpression;
  private errorId: TExpression;
  private name: string;

  public withName(name: string): DomainErrorBuilder {
    this.name = name;
    return this;
  }
  public withMessage(message: TExpression): DomainErrorBuilder {
    this.message = message;
    return this;
  }
  public withErrorId(errorId: TExpression): DomainErrorBuilder {
    this.errorId = errorId;
    return this;
  }

  public build(): TDomainErrors {
    const error = {
      [this.name]: {
        message: this.message,
        errorId: this.errorId,
      },
    };

    return error;
  }
}
