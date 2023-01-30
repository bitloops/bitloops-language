import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TArgumentList,
  TBoundedContextModule,
  TUseCaseExpression,
  TUseCaseIdentifier,
  UseCaseIdentifierKey,
} from '../../../../src/types.js';

export class UseCaseExpressionBuilder implements IBuilder<TUseCaseExpression> {
  private identifierName: TUseCaseIdentifier;
  private arguments: TArgumentList;
  private bcModule: TBoundedContextModule;

  public withIdentifier(identifierName: TUseCaseIdentifier): UseCaseExpressionBuilder {
    this.identifierName = identifierName;
    return this;
  }

  public withBoundedContextModule(bcModule: TBoundedContextModule): UseCaseExpressionBuilder {
    this.bcModule = bcModule;
    return this;
  }

  public withArguments(argumentList: TArgumentList): UseCaseExpressionBuilder {
    this.arguments = argumentList;
    return this;
  }

  public build(): TUseCaseExpression {
    const useCaseExpression = {
      useCaseExpression: {
        [UseCaseIdentifierKey]: this.identifierName,
        ...this.arguments,
        ...this.bcModule,
      },
    };

    return useCaseExpression;
  }
}
