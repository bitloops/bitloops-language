import { IBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TDomainPublicMethod,
  TIdentifier,
  TOkErrorReturnType,
  TParameterList,
  TStatements,
} from '../../../../../src/types.js';

export class PublicMethodBuilder implements IBuilder<TDomainPublicMethod> {
  private identifier: TIdentifier;
  private parameters: TParameterList;
  private returnType: TOkErrorReturnType;
  private statements: TStatements;
  private staticBoolean?: boolean;

  public withIdentifier(identifier: TIdentifier): PublicMethodBuilder {
    this.identifier = identifier;
    return this;
  }

  public withParameters(parameters: TParameterList): PublicMethodBuilder {
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

  public withStatic(staticBoolean: boolean): PublicMethodBuilder {
    this.staticBoolean = staticBoolean;
    return this;
  }

  public build(): TDomainPublicMethod {
    const publicMethod = {
      publicMethod: {
        identifier: this.identifier,
        ...this.parameters,
        ...this.returnType,
        statements: this.statements,
        static: this.staticBoolean ?? false,
      },
    };

    return publicMethod;
  }
}
