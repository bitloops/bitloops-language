import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import { TIdentifier, TUseCaseDefinition, TUseCaseExpression } from '../../../../src/types.js';

export class UseCaseDefinitionBuilder implements IBuilder<TUseCaseDefinition> {
  private identifierName: TIdentifier;
  private expression: TUseCaseExpression;

  public withIdentifier(identifierName: TIdentifier): UseCaseDefinitionBuilder {
    this.identifierName = identifierName;
    return this;
  }

  public withExpression(expression: TUseCaseExpression): UseCaseDefinitionBuilder {
    this.expression = expression;
    return this;
  }

  public build(): TUseCaseDefinition {
    const useCaseDefinition = {
      useCaseDefinition: {
        identifier: this.identifierName,
        ...this.expression,
      },
    };

    return useCaseDefinition;
  }
}
