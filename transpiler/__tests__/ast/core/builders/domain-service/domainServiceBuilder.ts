import { IBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TParameterList,
  TDomainService,
  TIdentifier,
  TPublicMethod,
  TPrivateMethod,
  identifierKey,
  domainServiceKey,
} from '../../../../../src/types.js';

export class DomainServiceBuilder implements IBuilder<TDomainService> {
  private identifierName: TIdentifier;
  private parameters: TParameterList;
  private publicMethods: TPublicMethod[];
  private privateMethods: TPrivateMethod[];

  public withIdentifier(identifierName: TIdentifier): DomainServiceBuilder {
    this.identifierName = identifierName;
    return this;
  }

  public withParameterList(parameters: TParameterList): DomainServiceBuilder {
    this.parameters = parameters;
    return this;
  }

  public withPublicMethods(publicMethods: TPublicMethod[]): DomainServiceBuilder {
    this.publicMethods = publicMethods;
    return this;
  }

  public withPrivateMethdos(privateMethods: TPrivateMethod[]): DomainServiceBuilder {
    this.privateMethods = privateMethods;
    return this;
  }

  public build(): TDomainService {
    const domainService = {
      [domainServiceKey]: {
        [identifierKey]: this.identifierName,
        ...this.parameters,
        publicMethods: this.publicMethods,
        privateMethods: this.privateMethods ?? [],
      },
    };

    return domainService;
  }
}
