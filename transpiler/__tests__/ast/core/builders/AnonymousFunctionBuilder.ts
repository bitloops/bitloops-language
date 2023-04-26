import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TAnonymousFunction,
  TParameterList,
  TReturnStatement,
  TStatementsObj,
} from '../../../../src/types.js';

export class AnonymousFunctionBuilder implements IBuilder<TAnonymousFunction> {
  private parameters: TParameterList;
  private arrowFunctionBody: TReturnStatement | TStatementsObj;

  public withArrowFunctionBody(
    arrowFunctionBody: TReturnStatement | TStatementsObj,
  ): AnonymousFunctionBuilder {
    this.arrowFunctionBody = arrowFunctionBody;
    return this;
  }

  public withParameters(parameters: TParameterList): AnonymousFunctionBuilder {
    this.parameters = parameters;
    return this;
  }

  public build(): TAnonymousFunction {
    const anonymousFunction: TAnonymousFunction = {
      anonymousFunction: {
        arrowFunctionBody: this.arrowFunctionBody,
        ...this.parameters,
      },
    };

    return anonymousFunction;
  }
}
