import { IBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TBitloopsPrimaryType,
  TDomainPrivateMethod,
  TIdentifier,
  TOkErrorReturnTypeValues,
  TParameterDependencies,
  TStatements,
} from '../../../../../src/types.js';

export class PrivateMethodBuilder implements IBuilder<TDomainPrivateMethod> {
  private identifier: TIdentifier;
  private parameters: TParameterDependencies;
  private returnType: TOkErrorReturnTypeValues | TBitloopsPrimaryType;
  private statements: TStatements;

  public withIdentifier(identifier: TIdentifier): PrivateMethodBuilder {
    this.identifier = identifier;
    return this;
  }

  public withParameters(parameters: TParameterDependencies): PrivateMethodBuilder {
    this.parameters = parameters;
    return this;
  }

  public withReturnType(
    returnType: TOkErrorReturnTypeValues | TBitloopsPrimaryType,
  ): PrivateMethodBuilder {
    this.returnType = returnType;
    return this;
  }

  public withStatements(statements: TStatements): PrivateMethodBuilder {
    this.statements = statements;
    return this;
  }

  public build(): TDomainPrivateMethod {
    const privateMethod = {
      privateMethod: {
        identifier: this.identifier,
        parameters: this.parameters,
        returnType: this.returnType,
        statements: this.statements,
      },
    };

    return privateMethod;
  }
}
