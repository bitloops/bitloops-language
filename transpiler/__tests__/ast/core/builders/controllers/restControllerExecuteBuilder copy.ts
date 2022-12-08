import { IBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TRESTControllerDependencies,
  TRESTControllerExecute,
  TStatements,
} from '../../../../../src/types.js';

export class RestExecuteBuilder implements IBuilder<TRESTControllerExecute> {
  private statements: TStatements;
  private dependencies: TRESTControllerDependencies;

  public withStatements(statements: TStatements): RestExecuteBuilder {
    this.statements = statements;
    return this;
  }

  public withRequestReply(requestIdentifier: string, replyIdentifier: string): RestExecuteBuilder {
    this.dependencies = [requestIdentifier, replyIdentifier];
    return this;
  }

  public build(): TRESTControllerExecute {
    return {
      statements: this.statements,
      dependencies: this.dependencies,
    };
  }
}
