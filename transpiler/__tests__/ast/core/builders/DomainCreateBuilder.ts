import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TDomainCreateMethod,
  TDomainCreateParameter,
  TOkErrorReturnType,
  TStatements,
} from '../../../../src/types.js';

export class DomainCreateBuilder implements IBuilder<TDomainCreateMethod> {
  private statements: TStatements;
  private returnType: TOkErrorReturnType;
  private parameter: TDomainCreateParameter;

  public withStatements(statements: TStatements): DomainCreateBuilder {
    this.statements = statements;
    return this;
  }

  public withReturnType(returnType: TOkErrorReturnType): DomainCreateBuilder {
    this.returnType = returnType;
    return this;
  }

  public withParameter(parameter: TDomainCreateParameter): DomainCreateBuilder {
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
