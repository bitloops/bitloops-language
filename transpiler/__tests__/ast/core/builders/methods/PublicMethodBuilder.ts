import { IBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TDomainPublicMethod,
  TIdentifier,
  TOkErrorReturnType,
  TParameterDependencies,
  TStatements,
} from '../../../../../src/types.js';

export class PublicMethodBuilder implements IBuilder<TDomainPublicMethod> {
  private identifier: TIdentifier;
  private parameters: TParameterDependencies;
  private returnType: TOkErrorReturnType;
  private statements: TStatements;

  public withIdentifier(identifier: TIdentifier): PublicMethodBuilder {
    this.identifier = identifier;
    return this;
  }

  public withParameters(parameters: TParameterDependencies): PublicMethodBuilder {
    this.parameters = parameters;
    return this;
  }

  public withReturnType(returnType: TOkErrorReturnType): PublicMethodBuilder {
    this.returnType = returnType;
    return this;
  }

  public withStatements(statements: TStatements): PublicMethodBuilder {
    this.statements = statements;
    return this;
  }

  public build(): TDomainPublicMethod {
    const publicMethod = {
      publicMethod: {
        identifier: this.identifier,
        parameters: this.parameters,
        ...this.returnType,
        statements: this.statements,
      },
    };

    return publicMethod;
  }
}
