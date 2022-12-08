import { IBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TGraphQLControllerDependencies,
  TGraphQLControllerExecute,
  TStatements,
} from '../../../../../src/types.js';

export class GraphQLExecuteBuilder implements IBuilder<TGraphQLControllerExecute> {
  private statements: TStatements;
  private dependencies: TGraphQLControllerDependencies;
  private returnType: string;

  public withReturnType(returnDTO: string): GraphQLExecuteBuilder {
    this.returnType = returnDTO;
    return this;
  }

  public withStatements(statements: TStatements): GraphQLExecuteBuilder {
    this.statements = statements;
    return this;
  }

  public withRequestIdentifier(requestIdentifier: string): GraphQLExecuteBuilder {
    this.dependencies = [requestIdentifier];
    return this;
  }

  public build(): TGraphQLControllerExecute {
    return {
      statements: this.statements,
      returnType: this.returnType,
      dependencies: this.dependencies,
    };
  }
}
