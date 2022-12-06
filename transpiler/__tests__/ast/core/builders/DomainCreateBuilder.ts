import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TDomainCreateMethod,
  TOkErrorReturnType,
  TParameterDependency,
  TStatements,
} from '../../../../src/types.js';

export class DomainCreateBuilder implements IBuilder<TDomainCreateMethod> {
  private statements: TStatements;
  private returnType: TOkErrorReturnType;
  private parameters: TParameterDependency;

  public withStatements(statements: TStatements): DomainCreateBuilder {
    this.statements = statements;
    return this;
  }

  public withReturnType(returnType: TOkErrorReturnType): DomainCreateBuilder {
    this.returnType = returnType;
    return this;
  }

  public withParameters(parameters: TParameterDependency): DomainCreateBuilder {
    this.parameters = parameters;
    return this;
  }

  public build(): TDomainCreateMethod {
    const domainCreateMethod = {
      create: {
        ...this.parameters,
        statements: this.statements,
        ...this.returnType,
      },
    };

    return domainCreateMethod;
  }
}
