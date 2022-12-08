import { IBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TConstDeclarationValue,
  TDomainPrivateMethods,
  TDomainPublicMethods,
  TEntityCreate,
  TEntityValues,
} from '../../../../../src/types.js';

export class RootEntityValuesBuilder implements IBuilder<TEntityValues> {
  private constants?: TConstDeclarationValue[];
  private create: TEntityCreate;
  private publicMethods?: TDomainPublicMethods;
  private privateMethods?: TDomainPrivateMethods;

  public withConstants(constants: TConstDeclarationValue[]): RootEntityValuesBuilder {
    this.constants = constants;
    return this;
  }

  public withCreate(create: TEntityCreate): RootEntityValuesBuilder {
    this.create = create;
    return this;
  }

  public withPublicMethods(publicMethods: TDomainPublicMethods): RootEntityValuesBuilder {
    this.publicMethods = publicMethods;
    return this;
  }

  public withPrivateMethods(privateMethods: TDomainPrivateMethods): RootEntityValuesBuilder {
    this.privateMethods = privateMethods;
    return this;
  }

  public build(): TEntityValues {
    const entityValues: TEntityValues = {
      ...this.create,
    };

    if (this.constants) entityValues.constants = this.constants;
    if (this.publicMethods) entityValues.publicMethods = this.publicMethods;
    if (this.privateMethods) entityValues.privateMethods = this.privateMethods;

    return entityValues;
  }
}
