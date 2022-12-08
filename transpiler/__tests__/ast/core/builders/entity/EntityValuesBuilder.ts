import { IBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TConstDeclarationValue,
  TDomainPrivateMethods,
  TDomainPublicMethods,
  TEntityCreate,
  TEntityValues,
} from '../../../../../src/types.js';

export class EntityValuesBuilder implements IBuilder<TEntityValues> {
  private constants?: TConstDeclarationValue[];
  private create: TEntityCreate;
  private publicMethods?: TDomainPublicMethods;
  private privateMethods?: TDomainPrivateMethods;

  public withConstants(constants: TConstDeclarationValue[]): EntityValuesBuilder {
    this.constants = constants;
    return this;
  }

  public withCreate(create: TEntityCreate): EntityValuesBuilder {
    this.create = create;
    return this;
  }

  public withPublicMethods(publicMethods: TDomainPublicMethods): EntityValuesBuilder {
    this.publicMethods = publicMethods;
    return this;
  }

  public withPrivateMethods(privateMethods: TDomainPrivateMethods): EntityValuesBuilder {
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
