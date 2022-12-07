import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TExpression,
  DomainErrorKey,
  TDomainErrors,
  TParameterDependencies,
  TIdentifier,
} from '../../../../src/types.js';

export class DomainErrorBuilder implements IBuilder<TDomainErrors> {
  private message: TExpression;
  private errorId: TExpression;
  private parameters: TParameterDependencies;
  private identifierName: TIdentifier;
  public withIdentifier(identifier: TIdentifier): DomainErrorBuilder {
    this.identifierName = identifier;
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
  public withParameters(parameters: TParameterDependencies): DomainErrorBuilder {
    this.parameters = parameters;
    return this;
  }

  public build(): TDomainErrors {
    const error = {
      [DomainErrorKey]: {
        identifier: this.identifierName,
        message: this.message,
        errorId: this.errorId,
        parameters: this.parameters,
      },
    };

    return error;
  }
}
