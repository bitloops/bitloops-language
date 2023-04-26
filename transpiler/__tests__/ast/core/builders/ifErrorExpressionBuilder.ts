import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TDTO,
  DTOKey,
  DTOIdentifierKey,
  TExpression,
  TAnonymousFunction,
} from '../../../../src/types.js';

export class IfErrorExpressionBuilder implements IBuilder<TDTO> {
  private leftExpression: TExpression;
  private anonymousFunction: TAnonymousFunction;

  public withExpression(expr: TExpression): IfErrorExpressionBuilder {
    this.leftExpression = expr;
    return this;
  }

  public withAnonymousFunction(anonymousFunction: TAnonymousFunction): IfErrorExpressionBuilder {
    this.anonymousFunction = anonymousFunction;
    return this;
  }

  public build(): TDTO {
    const dto: TDTO = {
      [DTOKey]: {
        [DTOIdentifierKey]: this.identifierName,
        ...this.fields,
      },
    };

    return dto;
  }
}
