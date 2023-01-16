import { IBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TBitloopsPrimaryType,
  TDomainPrivateMethod,
  TDomainPrivateMethodValuesOkErrorReturnType,
  TDomainPrivateMethodValuesPrimaryReturnType,
  TIdentifier,
  TOkErrorReturnType,
  TParameterList,
  TStatements,
} from '../../../../../src/types.js';

export class PrivateMethodBuilder implements IBuilder<TDomainPrivateMethod> {
  private identifier: TIdentifier;
  private parameters: TParameterList;
  private primaryReturnType: TBitloopsPrimaryType;
  private okErrorReturnType: TOkErrorReturnType;
  private statements: TStatements;

  public withIdentifier(identifier: TIdentifier): PrivateMethodBuilder {
    this.identifier = identifier;
    return this;
  }

  public withParameters(parameters: TParameterList): PrivateMethodBuilder {
    this.parameters = parameters;
    return this;
  }

  public withPrimaryReturnType(primaryReturnType: TBitloopsPrimaryType): PrivateMethodBuilder {
    this.primaryReturnType = primaryReturnType;
    return this;
  }

  public withOkErrorReturnType(okErrorReturnType: TOkErrorReturnType): PrivateMethodBuilder {
    this.okErrorReturnType = okErrorReturnType;
    return this;
  }

  public withStatements(statements: TStatements): PrivateMethodBuilder {
    this.statements = statements;
    return this;
  }

  public build(): TDomainPrivateMethod {
    const privateMethodValues = {
      identifier: this.identifier,
      ...this.parameters,
      statements: this.statements,
    };

    if (this.primaryReturnType) {
      const privateMethodPrimary =
        privateMethodValues as TDomainPrivateMethodValuesPrimaryReturnType;
      privateMethodPrimary.type = this.primaryReturnType.type;
      return {
        privateMethod: privateMethodPrimary,
      };
    } else if (this.okErrorReturnType) {
      const privateMethodOkError =
        privateMethodValues as TDomainPrivateMethodValuesOkErrorReturnType;
      privateMethodOkError.returnType = this.okErrorReturnType.returnType;
      return {
        privateMethod: privateMethodOkError,
      };
    } else {
      throw new Error('Choose one returnType');
    }
  }
}
