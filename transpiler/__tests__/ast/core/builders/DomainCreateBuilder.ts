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
  private parameter: TParameterDependency;

  public withStatements(statements: TStatements): DomainCreateBuilder {
    this.statements = statements;
    return this;
  }

  public withReturnType(returnType: TOkErrorReturnType): DomainCreateBuilder {
    this.returnType = returnType;
    return this;
  }

  public withParameter(parameter: TParameterDependency): DomainCreateBuilder {
    this.parameter = parameter;
    return this;
  }

  public build(): TDomainCreateMethod {
    const domainCreateMethod = {
      create: {
        ...this.parameter,
        statements: this.statements,
        ...this.returnType,
      },
    };

    return domainCreateMethod;
  }
}
