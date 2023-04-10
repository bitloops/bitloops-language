import { IBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  identifierKey,
  TQueryIdentifier,
  TQuery,
  TVariables,
  queryKey,
  fieldsKey,
} from '../../../../../src/types.js';

export class QueryDeclarationBuilder implements IBuilder<TQuery> {
  private identifierName: TQueryIdentifier;
  private fields?: TVariables;

  public withIdentifier(identifierName: TQueryIdentifier): QueryDeclarationBuilder {
    this.identifierName = identifierName;
    return this;
  }

  public withVariables(fields: TVariables): QueryDeclarationBuilder {
    this.fields = fields;
    return this;
  }

  public build(): TQuery {
    const query: TQuery = {
      [queryKey]: {
        [identifierKey]: this.identifierName,
      },
    };
    if (this.fields) {
      query[queryKey].fields = this.fields[fieldsKey];
    }

    return query;
  }
}
