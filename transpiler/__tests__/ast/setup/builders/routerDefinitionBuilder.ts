import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import { TIdentifier, TRouterDefinition, TRouterExpression } from '../../../../src/types.js';

export class RouterDefinitionBuilder implements IBuilder<TRouterDefinition> {
  private identifierName: TIdentifier;
  private expression: TRouterExpression;

  public withIdentifier(identifierName: TIdentifier): RouterDefinitionBuilder {
    this.identifierName = identifierName;
    return this;
  }

  public withExpression(expression: TRouterExpression): RouterDefinitionBuilder {
    this.expression = expression;
    return this;
  }

  public build(): TRouterDefinition {
    const routerDefinition = {
      routerDefinition: {
        identifier: this.identifierName,
        ...this.expression,
      },
    };

    return routerDefinition;
  }
}
