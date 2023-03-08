import { IBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  identifierKey,
  TQueryIdentifier,
  TExpression,
  TQuery,
  TVariables,
  queryKey,
} from '../../../../../src/types.js';

export class QueryDeclarationBuilder implements IBuilder<TQuery> {
  private identifierName: TQueryIdentifier;
  private fields: TVariables;
  private queryTopic: TExpression;

  public withIdentifier(identifierName: TQueryIdentifier): QueryDeclarationBuilder {
    this.identifierName = identifierName;
    return this;
  }

  public withVariables(fields: TVariables): QueryDeclarationBuilder {
    this.fields = fields;
    return this;
  }

  public withCommandTopic(commandTopic: TExpression): QueryDeclarationBuilder {
    this.queryTopic = commandTopic;
    return this;
  }

  public build(): TQuery {
    const query: TQuery = {
      [queryKey]: {
        [identifierKey]: this.identifierName,
        queryTopic: this.queryTopic,
        ...this.fields,
      },
    };

    return query;
  }
}
