import { IBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TExecute,
  TParameterList,
  TQueryHandler,
  TQueryHandlerIdentifier,
  identifierKey,
  queryHandlerKey,
} from '../../../../../src/types.js';

export class QueryHandlerDeclarationBuilder implements IBuilder<TQueryHandler> {
  private identifierName: TQueryHandlerIdentifier;
  private execute: TExecute;
  private parameters: TParameterList;

  public withIdentifier(identifierName: TQueryHandlerIdentifier): QueryHandlerDeclarationBuilder {
    this.identifierName = identifierName;
    return this;
  }

  public withExecute(execute: TExecute): QueryHandlerDeclarationBuilder {
    this.execute = execute;
    return this;
  }

  public withParameterList(parameters: TParameterList): QueryHandlerDeclarationBuilder {
    this.parameters = parameters;
    return this;
  }

  public build(): TQueryHandler {
    const queryHandler = {
      [queryHandlerKey]: {
        [identifierKey]: this.identifierName,
        execute: this.execute,
        ...this.parameters,
      },
    };

    return queryHandler;
  }
}
