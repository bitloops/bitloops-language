import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TExpression,
  TIdentifier,
  ApplicationErrorKey,
  TApplicationError,
  TParameterList,
} from '../../../../src/types.js';

export class ApplicationErrorBuilder implements IBuilder<TApplicationError> {
  private message: TExpression;
  private errorId: TExpression;
  private parameters: TParameterList;
  private identifierName: TIdentifier;
  public withIdentifier(identifier: TIdentifier): ApplicationErrorBuilder {
    this.identifierName = identifier;
    return this;
  }
  public withMessage(message: TExpression): ApplicationErrorBuilder {
    this.message = message;
    return this;
  }
  public withErrorId(errorId: TExpression): ApplicationErrorBuilder {
    this.errorId = errorId;
    return this;
  }
  public withParameters(parameters: TParameterList): ApplicationErrorBuilder {
    this.parameters = parameters;
    return this;
  }

  public build(): TApplicationError {
    const error = {
      [ApplicationErrorKey]: {
        identifier: this.identifierName,
        message: this.message,
        errorId: this.errorId,
        ...this.parameters,
      },
    };

    return error;
  }
}
